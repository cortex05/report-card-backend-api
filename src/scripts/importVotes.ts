import { voteClient } from "../clients/voteClient";

export const main = async () => {
  // await voteClient.getHouseVotes();
  // const result = await voteClient.getHouseRollCall(119,1,138);
  const result = await voteClient.getHouseRollCallMembers(119,1,1);

  console.log(`House votes fetched successfully: `, JSON.stringify(result, null, 2));
};

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});