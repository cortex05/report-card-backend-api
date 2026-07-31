export interface PoliticianInsert {
  bioguideId: string;
  firstName: string;
  lastName: string;
  birthYear?: number | null;
  currentMember?: boolean;
  stateCode?: string | null;
  imageUrl?: string | null;
}

// Congress mapper interfaces
interface LegislationSummary {
  count: number;
  url: string;
}

interface Depiction {
  attribution: string;
  imageUrl: string;
}

interface LeadershipRecord {
  congress: number;
  type: string;
}

interface PartyHistoryRecord {
  partyAbbreviation: string;
  partyName: string;
  startYear: number;
}

interface PreviousNameRecord {
  directOrderName: string;
  firstName: string;
  honorificName: string;
  invertedOrderName: string;
  lastName: string;
  startDate: string;
}

interface TermRecord {
  chamber: string;
  congress: number;
  endYear: number;
  memberType: string;
  startYear: number;
  stateCode: string;
  stateName: string;
}

interface CongressMember {
  bioguideId: string;
  birthYear: string;
  cosponsoredLegislation: LegislationSummary;
  currentMember: boolean;
  depiction: Depiction;
  directOrderName: string;
  firstName: string;
  honorificName: string;
  invertedOrderName: string;
  lastName: string;
  leadership: LeadershipRecord[];
  partyHistory: PartyHistoryRecord[];
  previousNames: PreviousNameRecord[];
  sponsoredLegislation: LegislationSummary;
  state: string;
  terms: TermRecord[];
  updateDate: string;
}

interface CongressMemberRequest {
  bioguideId: string;
  contentType: string;
  format: string;
}

export interface CongressMemberResponse {
  member: CongressMember;
  request: CongressMemberRequest;
}
// END congress mapper interfaces