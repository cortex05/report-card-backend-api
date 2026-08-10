import { billClient } from "./billClient";

const getHouseVotes = async () => {

    const bill = await billClient.getBillActions(119, "hr", 1);

    console.log(`Bill actions fetched successfully: `, JSON.stringify(bill, null, 2));

    
  // const response = await congressClient.get<CongressHouseVoteResponse>(
  //   `/house-vote/${congress}`
  // );

  // return response.houseRollCallVotes;
};

export const voteClient = {
  getHouseVotes,
};
