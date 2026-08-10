export interface CongressHouseVote {
  congress: number;
  identifier: number;
  legislationNumber: string;
  legislationType: string;
  legislationUrl: string;
  result: string;
  rollCallNumber: number;
  sessionNumber: number;
  sourceDataURL: string;
  startDate: string;
  updateDate: string;
  url: string;
  voteType: string;
}

export interface CongressHouseVoteResponse {
  houseRollCallVotes: CongressHouseVote[];
}
