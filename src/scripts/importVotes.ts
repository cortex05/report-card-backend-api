import { voteClient } from "../clients/voteClient";

export const main = async () => {
  await voteClient.getHouseVotes();
  // console.log(`House votes fetched successfully: `, JSON.stringify(result, null, 2));
};

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});