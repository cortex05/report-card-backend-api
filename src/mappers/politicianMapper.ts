import { PoliticianInsert } from "../db/schema/Types";
import { CongressMember } from "../types/congress/member";
import { CongressBillSponsor } from "../types/congress/bill";
import { HouseRollCallVoteMember } from "../types/congress/vote";

export const mapCongressMemberToPolitician = (member: CongressMember): PoliticianInsert => {
  const birthYear = Number.parseInt(member.birthYear, 10);
  const latestTerm = member.terms.length > 0 ? member.terms[member.terms.length - 1] : undefined;

  return {
    bioguideId: member.bioguideId,
    firstName: member.firstName,
    lastName: member.lastName,
    birthYear: Number.isNaN(birthYear) ? null : birthYear,
    currentMember: member.currentMember,
    stateCode: latestTerm?.stateCode ?? null,
    imageUrl: member.depiction.imageUrl || null,
  };
}

export const mapCongressSponsorToPolitician = (sponsor: CongressBillSponsor): PoliticianInsert => {
  return {
    bioguideId: sponsor.bioguideId,
    firstName: sponsor.firstName,
    lastName: sponsor.lastName,
    stateCode: sponsor.state ?? null,
  };
}

// Minimal politician built from a roll-call member payload, used to
// get-or-create a stub before linking a vote record.
export const mapHouseRollCallMemberToPolitician = (member: HouseRollCallVoteMember): PoliticianInsert => {
  return {
    bioguideId: member.bioguideID,
    firstName: member.firstName,
    lastName: member.lastName,
    stateCode: member.voteState ?? null,
  };
}