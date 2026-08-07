import { db } from "../db";
import { politicianRepository } from "../repositories/politicianRepository";
import { OfficeTerm, PoliticianInsert } from "../db/schema/Types";
import { mapCongressTermToOfficeDefinition } from "../mappers/officeMapper";
import { officeRepository } from "../repositories/officeRepository";
import { politicianOfficeRepository } from "../repositories/politicianOfficeRepository";
import { mapCongressTermToPoliticianOffice } from "../mappers/politicianOfficeMapper";
import { mapCongressMemberToPolitician } from "../mappers/politicianMapper";
import { memberClient } from "../clients/memberClient";

type ImportPoliticianRequest = {
  politician: PoliticianInsert;
  terms: OfficeTerm[];
}

export const importPolitician = async (bioguideId: string) => {
  return db.transaction(async (tx) => {
    const member = await memberClient.get(bioguideId);

    const mappedPolitician = mapCongressMemberToPolitician(member.member);
    const existing = await politicianRepository.getByBioguideId(
      tx,
      mappedPolitician.bioguideId
    );
    let politician = null

    if (existing) {
      politician = await politicianRepository.update(tx, mappedPolitician.bioguideId, mappedPolitician);
    } else {
      politician = await politicianRepository.create(tx, mappedPolitician);
    }

    for (const term of member.member.terms) {
      const officeDefinition = mapCongressTermToOfficeDefinition(term);
      const office = await officeRepository.getOrCreate (tx, officeDefinition);
      const politicianOffice = mapCongressTermToPoliticianOffice(politician.id, office.id, term);
      const existingPoliticianOffice = await politicianOfficeRepository.getByDefinition(tx, politician.id, office.id, politicianOffice.startDate);

      if (!existingPoliticianOffice) {
        await politicianOfficeRepository.create(tx, politicianOffice);
      }
    }
    return politician;
  });
};