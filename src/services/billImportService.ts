import { db } from "../db";
import { billClient } from "../clients/billClient";
import { mapCongressBillToInsert, mapRecordedVotesFromBillActions } from "../mappers/billMapper";
import { mapCongressSponsorToPolitician } from "../mappers/politicianMapper";
import { mapCongressSponsorToBillInsert } from "../mappers/billSponsorMapper";
import { billRepository } from "../repositories/billRepository";
import { politicianRepository } from "../repositories/politicianRepository";
import { billSponsorRepository } from "../repositories/billSponsorRepository";
import { CongressBill } from "../types/congress/bill";
import { Database } from "../db/types";

export const importBill = async (
  congress: number,
  billType: string,
  billNumber: number
) => {
  const congressBill = await billClient.getBill(
    congress,
    billType,
    billNumber
  );

  const actions = await billClient.getBillActions(congress, billType, billNumber)
  const recordedVotes = mapRecordedVotesFromBillActions(actions);

  console.log("Recorded votes: ", recordedVotes)

  return db.transaction(async (tx) => {
    return syncBill(tx, congressBill);
  });
};

export const syncBill = async (
  tx: Database,
  congressBill: CongressBill
) => {
  const bill = mapCongressBillToInsert(congressBill);

  const existing = await billRepository.getByIdentifier(
    tx,
    bill.congress,
    bill.billType,
    bill.billNumber
  );

  const persistedBill = existing
    ? await billRepository.update(tx, existing.id, { ...bill, lastSyncedAt: new Date() })
    : await billRepository.create(tx, bill);
  

  for (const sponsor of congressBill.sponsors) {
    const existingPolitician = await politicianRepository.getByBioguideId(tx, sponsor.bioguideId);
    const politician = existingPolitician ?? await politicianRepository.create(
      tx,
      mapCongressSponsorToPolitician(sponsor)
    );

    const billSponsor = mapCongressSponsorToBillInsert(persistedBill.id, politician.id, sponsor);
    const existingSponsor = await billSponsorRepository.getByDefinition(
      tx,
      billSponsor.billId,
      billSponsor.politicianId,
      billSponsor.role
    );

    if (!existingSponsor) {
      await billSponsorRepository.create(tx, billSponsor);
    }
  }

  return persistedBill;
}