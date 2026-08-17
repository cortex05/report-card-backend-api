import { HouseRollCallVoteResponse } from "../types/congress/vote";
import { VoteInsert } from "../db/schema/bills/votes";

export const mapHouseRollCallToVoteInsert = (
  billId: string,
  response: HouseRollCallVoteResponse
): VoteInsert => {
  const vote = response.houseRollCallVote;

  return {
    billId,
    congress: vote.congress,
    chamber: "House",
    voteDate: vote.startDate ? vote.startDate.slice(0, 10) : null,
    question: vote.voteQuestion,
    result: vote.result,
    sourceId: vote.identifier.toString(),
  };
};
