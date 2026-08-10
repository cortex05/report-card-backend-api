import { CongressBillSponsor } from "../types/congress/bill";
import { BillSponsorInsert } from "../db/schema/bills/bill-Sponsors";

export const mapCongressSponsorToBillInsert = (
  billId: string,
  politicianId: string,
  sponsor: CongressBillSponsor
): BillSponsorInsert => {
  return {
    billId,
    politicianId,
    role: "primary_sponsor",
    source: "congress.gov",
    dateAdded: null,
  };
};
