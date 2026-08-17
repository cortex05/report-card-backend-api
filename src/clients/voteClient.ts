import { HouseRollCallVoteMemberResponse, HouseRollCallVoteResponse } from "../types/congress/vote";
import { billClient } from "./billClient";
import { congressClient } from "./congressClient";

const getHouseVotes = async () => {
  const bill = await billClient.getBillActions(119, "hr", 1);

  console.log(`Bill actions fetched successfully: `, JSON.stringify(bill, null, 2));
  // const response = await congressClient.get<CongressHouseVoteResponse>(
  //   `/house-vote/${congress}`
  // );

  // return response.houseRollCallVotes;
};

const getHouseRollCall = async (
  congress: number,
  session: number,
  rollCallNumber: number
): Promise<HouseRollCallVoteResponse> => {
  const response = await congressClient.get<any>(
    `/house-vote/${congress}/${session}/${rollCallNumber}`
  );
  return response;
}; 

const getHouseRollCallMembers = async (
  congress: number,
  session: number,
  rollCallNumber: number
): Promise<HouseRollCallVoteMemberResponse> => {
  const response = await congressClient.get<any>(
    `/house-vote/${congress}/${session}/${rollCallNumber}/members`
  );
  return response;
}; 

export const voteClient = {
  getHouseVotes,
  getHouseRollCall,
  getHouseRollCallMembers,
};
