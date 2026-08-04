import { and, eq } from "drizzle-orm";
import { bills, BillInsert } from "../db/schema/bills/bills";
import { Database } from "../db/types";

const create = async (database: Database, bill: BillInsert) => {
  const [created] = await database.insert(bills).values(bill).returning();
  return created;
};

const update = async (
  database: Database,
  id: string,
  bill: Partial<BillInsert>
) => {
  const [updated] = await database
    .update(bills)
    .set({
      ...bill,
      lastSyncedAt: new Date(),
    })
    .where(eq(bills.id, id))
    .returning();

  return updated;
};

const getById = async (database: Database, id: string) => {
  const [existing] = await database
    .select()
    .from(bills)
    .where(eq(bills.id, id))
    .limit(1);

  return existing;
}

// const getBySourceId = async (database: Database, sourceId: string) => {
//   const [existing] = await database
//     .select()
//     .from(bills)
//     .where(eq(bills.sourceId, sourceId))
//     .limit(1);

//   return existing;
// };

const getByIdentifier = async (
  database: Database,
  congress: number,
  billType: string,
  billNumber: number
) => {
  const [existing] = await database
    .select()
    .from(bills)
    .where(
      and(
        eq(bills.congress, congress),
        eq(bills.billType, billType),
        eq(bills.billNumber, billNumber)
      )
    )
    .limit(1);

  return existing;
};

export const billRepository = {
  create,
  update,
  getById,
  getByIdentifier,
};
