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

// Roll-call detail: /house-vote/{congress}/{session}/{rollCall}
export interface HouseRollCallVoteResponse {
  houseRollCallVote: HouseRollCallVote;
  request: HouseVoteRequest;
}

interface HouseRollCallVote {
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
  votePartyTotal: VotePartyTotal[];
  voteQuestion: string;
  voteType: string;
}

interface VotePartyTotal {
  nayTotal: number;
  notVotingTotal: number;
  party: {
    name: string;
    type: string;
  };
  presentTotal: number;
  voteParty: string;
  yeaTotal: number;
}

// Member breakdown: /house-vote/{congress}/{session}/{rollCall}/members
export interface HouseRollCallVoteMemberResponse {
  houseRollCallVoteMemberVotes: HouseRollCallMemberVotes,
  request: HouseVoteRequest;
}

export interface HouseRollCallMemberVotes {
  congress: number;
  identifier: number;
  legislationNumber: string;
  legislationType: string;
  legislationUrl: string;
  result: string;
  results: HouseRollCallVoteMember[];
  rollCallNumber: number;
  sessionNumber: number;
  sourceDataURL: string;
  startDate: string;
  updateDate: string;
  voteQuestion: string;
  voteType: string;
}

export interface HouseRollCallVoteMember {
  bioguideID: string;
  firstName: string;
  lastName: string;
  voteCast: string;
  voteParty: string;
  voteState: string;
}

interface HouseVoteRequest {
  congress: string;
  contentType: string;
  format: string;
  session: string;
}
