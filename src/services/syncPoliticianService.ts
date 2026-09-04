import { politicianRepository } from "../repositories/politicianRepository";
import { officeRepository } from "../repositories/officeRepository";
import { politicianOfficeRepository } from "../repositories/politicianOfficeRepository";
import { mapCongressMemberToPolitician } from "../mappers/politicianMapper";
import { mapCongressTermToOfficeDefinition } from "../mappers/officeMapper";
import { mapCongressTermToPoliticianOffice } from "../mappers/politicianOfficeMapper";
import { Database } from "../db/types";
import { CongressMember } from "../types/congress/member";

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

  console.log(`Syncing offices for: ${member.firstName} - ${member.lastName}`)  
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
