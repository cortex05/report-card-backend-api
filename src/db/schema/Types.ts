export interface PoliticianInsert {
  bioguideId: string;
  firstName: string;
  lastName: string;
  birthYear?: number | null;
  currentMember?: boolean;
  stateCode?: string | null;
  imageUrl?: string | null;
}

export interface OfficeTerm {
  chamber: string;
  congress: number;
  endYear: number;
  memberType: string;
  startYear: number;
  stateCode: string;
  stateName: string;
}

export interface OfficeDefinition {
  name: string;
  level: string;
  branch: string;
  chamber?: string | null;
}