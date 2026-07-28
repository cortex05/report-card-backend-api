import { getMemberByBioguideId } from "../importers/congress/congressClient";
import { mapCongressMemberToPolitician } from "../importers/congress/mappers/politicianMapper";

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

  console.log("Mapped politician:");
  console.dir(politician, { depth: null });

  console.dir(member, { depth: null });
}

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});