import { CongressBill, CongressBillAction } from "../types/congress/bill";
import { BillInsert } from "../db/schema/bills/bills";
import { RecordedVoteReference } from "../types/congress/vote";

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

export const mapRecordedVotesFromBillActions = (
  actions: CongressBillAction[]
): RecordedVoteReference[] => {
  const recordedVotes = actions.flatMap((action) => {
    return action.recordedVotes ?? [];
  });

  const uniqueVotes = new Map<string, RecordedVoteReference>();

  for (const vote of recordedVotes) {
    const key = `${vote.congress}-${vote.chamber}-${vote.sessionNumber}-${vote.rollNumber}`;

    if (!uniqueVotes.has(key)) {
      uniqueVotes.set(key, {
        chamber: vote.chamber,
        congress: vote.congress,
        sessionNumber: vote.sessionNumber,
        rollNumber: vote.rollNumber,
        date: vote.date,
        url: vote.url,
      });
    }
  }
  return Array.from(uniqueVotes.values());
};