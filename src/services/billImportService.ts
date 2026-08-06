import { db } from "../db";
import { billClient } from "../clients/billClient";
import { mapCongressBillToInsert } from "../mappers/billMapper";
import { billRepository } from "../repositories/billRepository";

export const importBill = async (
  congress: number,
  billType: string,
  billNumber: number
) => {
  const congressBill = await billClient.getBill(congress, billType, billNumber);
  const bill = mapCongressBillToInsert(congressBill);

  return db.transaction(async (tx) => {
    const existing = await billRepository.getByIdentifier(
      tx,
      bill.congress,
      bill.billType,
      bill.billNumber
    );

    if (existing) {
      const updatedBill = { 
        ...bill, 
        lastSyncedAt: new Date() 
      };
      return billRepository.update(tx, existing.id, updatedBill);
    }

    return billRepository.create(tx, bill);
  });
};
