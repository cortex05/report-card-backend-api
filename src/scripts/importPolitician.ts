import { getMemberByBioguideId } from "../clients/congressClient";
import { mapCongressMemberToPolitician } from "../mappers/politicianMapper";
import { importPolitician } from "../services/politicianImportService";

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

  const importedPolitician = await importPolitician({politician, terms: member.member.terms});

  console.log(`Politician imported successfully: `, importedPolitician);
}

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});