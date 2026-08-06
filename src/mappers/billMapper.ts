import { CongressBill } from "../types/congress/bill";
import { BillInsert } from "../db/schema/bills/bills";

export const mapCongressBillToInsert = (bill: CongressBill): BillInsert => {
  const billType = bill.type.toLowerCase();
  const billNumber = Number.parseInt(bill.number, 10);

  if (Number.isNaN(billNumber)) {
    throw new Error(`Invalid bill number: ${bill.number}`);
  }

  return {
    congress: bill.congress,
    billType,
    billNumber,

    title: bill.title,

    introducedDate: bill.introducedDate ?? null,

    status: bill.latestAction?.text ?? null,

    originChamber: bill.originChamber ?? null,

    policyArea: bill.policyArea?.name ?? null,

    summary: null,
  };
};
