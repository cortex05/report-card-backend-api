import { billClient } from "../clients/billClient";
import { mapRecordedVotesFromBillActions } from "../mappers/billMapper";

const main = async () => {
  // Example call to test the billClient
  const actions = await billClient.getBillActions(119, "hr", 1);

  const recordedVotes = mapRecordedVotesFromBillActions(actions)
  // console.log(`Bill fetched successfully: `, JSON.stringify(actions, null, 2));
  console.log(`Recorded votes: `, JSON.stringify(recordedVotes, null, 2));  
};

main();