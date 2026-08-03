import { db } from "../db";
import { politicianRepository } from "../repositories/politicianRepository";
import { OfficeTerm, PoliticianInsert } from "../db/schema/Types";
import { mapCongressTermToOfficeDefinition } from "../mappers/officeMapper";
import { officeRepository } from "../repositories/officeRepository";
import { politicianOfficeRepository } from "../repositories/politicianOfficeRepository";
import { mapCongressTermToPoliticianOffice } from "../mappers/politicianOfficeMapper";

type ImportPoliticianRequest = {
  politician: PoliticianInsert;
  terms: OfficeTerm[];
}

export const importPolitician = async (request: ImportPoliticianRequest) => {
  return db.transaction(async (tx) => {
    const existing = await politicianRepository.getByBioguideId(
      tx,
      request.politician.bioguideId
    );
    let politician = null

    if (existing) {
      politician = await politicianRepository.update(tx, request.politician.bioguideId, request.politician);
    } else {
      politician = await politicianRepository.create(tx, request.politician);
    }

    for (const term of request.terms) {
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