import { OfficeDefinition, OfficeTerm } from "../db/schema/Types";

export const mapCongressTermToOfficeDefinition = (congressTerm: OfficeTerm): OfficeDefinition => {
  return {
    name: congressTerm.memberType,
    level: "Federal",
    branch: "Legislative",
    chamber: congressTerm.chamber ?? null,
  };
};