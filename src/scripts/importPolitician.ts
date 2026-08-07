import { memberClient } from "../clients/memberClient";
import { mapCongressMemberToPolitician } from "../mappers/politicianMapper";
import { importPolitician } from "../services/politicianImportService";
// import { CongressMember } from "../types/congress/member";

// converts API data into database model

export const main = async () => {
  const bioguideId = process.argv[2];
  if (!bioguideId) {
    console.error("Please provide a bioguide ID as an argument.");
    process.exit(1);
  }

  console.log("Fetching politician...");
  // console.log(`Politician fetched successfully: `, JSON.stringify(member.member, null, 2));

  const importedPolitician = await importPolitician(bioguideId);

  console.log(`Politician imported successfully: `, importedPolitician);
}

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});