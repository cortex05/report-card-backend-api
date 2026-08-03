import { PoliticianOfficeInsert } from "../db/schema";
import { OfficeTerm } from "../db/schema/Types";

export const mapCongressTermToPoliticianOffice = (politicianId: string, officeId: string, term: OfficeTerm): PoliticianOfficeInsert => {
  return {
    politicianId,
    officeId,
    startDate: `${term.startYear}-01-03`,
    endDate: term.endYear ? `${term.endYear}-01-03` : null,
    party: null,
    source: "congress.gov",
    sourceId: `${term.congress}`,
  }
}