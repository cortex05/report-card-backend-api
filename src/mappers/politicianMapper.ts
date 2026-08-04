import { PoliticianInsert } from "../db/schema/Types";
import { CongressMember } from "../types/congress/member";

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