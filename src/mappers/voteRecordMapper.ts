import { HouseRollCallVoteMember } from "../types/congress/vote";
import { VoteRecordInsert } from "../db/schema/bills/vote-Record";

const voteCastMap: Record<string, VoteRecordInsert["vote"]> = {
  "Aye": "yea",
  "Yea": "yea",
  "Nay": "nay",
  "No": "nay",
  "Present": "present",
  "Not Voting": "not_voting",
};

export const mapHouseRollCallMemberToVoteRecord = (
  voteId: string,
  politicianId: string,
  member: HouseRollCallVoteMember
): VoteRecordInsert => {
  const vote = voteCastMap[member.voteCast];

  if (!vote) {
    throw new Error(`Invalid vote cast: ${member.voteCast}`);
  }

  return {
    voteId,
    politicianId,
    vote,
  };
};