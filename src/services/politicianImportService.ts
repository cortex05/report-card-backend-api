import { db } from "../db";
import { politicianRepository } from "../repositories/politicianRepository";
import { mapCongressTermToOfficeDefinition } from "../mappers/officeMapper";
import { officeRepository } from "../repositories/officeRepository";
import { politicianOfficeRepository } from "../repositories/politicianOfficeRepository";
import { mapCongressTermToPoliticianOffice } from "../mappers/politicianOfficeMapper";
import { mapCongressMemberToPolitician } from "../mappers/politicianMapper";
import { memberClient } from "../clients/memberClient";
import { Database } from "../db/types";
import { CongressMember } from "../types/congress/member";

export const importPolitician = async (bioguideId: string) => {
  const member = await memberClient.get(bioguideId);
  
  return await db.transaction(async (tx) => {
    return syncPolitician(tx, member.member);
  });
};

export const syncPolitician = async (
  tx: Database,
  member: CongressMember
) => {
  const mappedPolitician = mapCongressMemberToPolitician(member);

  const existing = await politicianRepository.getByBioguideId(
    tx,
    mappedPolitician.bioguideId
  );

  const politician = existing
    ? await politicianRepository.update(
        tx,
        mappedPolitician.bioguideId,
        mappedPolitician
      )
    : await politicianRepository.create(tx, mappedPolitician);

  for (const term of member.terms) {
    const officeDefinition = mapCongressTermToOfficeDefinition(term);
    const office = await officeRepository.getOrCreate(tx, officeDefinition);

    const politicianOffice = mapCongressTermToPoliticianOffice(
      politician.id,
      office.id,
      term
    );

    const existingPoliticianOffice =
      await politicianOfficeRepository.getByDefinition(
        tx,
        politician.id,
        office.id,
        politicianOffice.startDate
      );

    if (!existingPoliticianOffice) {
      await politicianOfficeRepository.create(tx, politicianOffice);
    }
  }

  return politician;
};