import { getMemberByBioguideId } from "../importers/congress/congressClient";
import { mapCongressMemberToPolitician } from "../importers/congress/mappers/politicianMapper";
import { politicianRepository } from "../db/repositories/politicianRepository";

// converts API data into database model

export const main = async () => {
  const bioguideId = process.argv[2];
  if (!bioguideId) {
    console.error("Please provide a bioguide ID as an argument.");
    process.exit(1);
  }

  console.log("Fetching politician...");

  const member = await getMemberByBioguideId(bioguideId);

  const politician = mapCongressMemberToPolitician(member);

  const existingPolitician = await politicianRepository.getByBioguideId(
    politician.bioguideId
  );

  const importedPolitician = existingPolitician
    ? await politicianRepository.update(politician.bioguideId, politician)
    : await politicianRepository.create(politician);

  const action = existingPolitician ? "updated" : "created";

  console.log(`Politician ${action} successfully: `, importedPolitician);
  // console.log("Mapped politician:");
  // console.dir(politician, { depth: null });

  // console.dir(member, { depth: null });
}

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});