import { voteClient } from "../clients/voteClient";
import { importHouseRollCall } from "../services/voteImportService";

export const main = async () => {
  const congressNumber = Number(process.argv[2]);
  const session = Number(process.argv[3]);
  const voteRoll = Number(process.argv[4]);

  const voteRecord = await importHouseRollCall(congressNumber, session, voteRoll)

  console.log(`House votes fetched successfully: `, JSON.stringify(voteRecord, null, 2));
};

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});