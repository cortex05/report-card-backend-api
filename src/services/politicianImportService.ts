import { db } from "../db";
import { politicianRepository } from "../repositories/politicianRepository";
import { PoliticianInsert } from "../db/schema/Types";

export const importPolitician = async (politician: PoliticianInsert) => {
  return db.transaction(async (tx) => {
    const existing = await politicianRepository.getByBioguideId(
      tx,
      politician.bioguideId
    );

    if (existing) {
      return politicianRepository.update(tx, politician.bioguideId, politician);
    }

    return politicianRepository.create(tx, politician);
  });
};