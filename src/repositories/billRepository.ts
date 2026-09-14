import { and, count, eq, desc } from "drizzle-orm";
import { bills, BillInsert } from "../db/schema/bills/bills";
import { Database } from "../db/types";
import { billSponsors } from "../db/schema/bills/bill-Sponsors";

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

// For frontend
const getPoliticianBillSponsorships = async (
  database: Database,
  politicianId: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const [{ total }] = await database
    .select({ total: count() })
    .from(bills)
    .innerJoin(
      billSponsors,
      eq(billSponsors.billId, bills.id)
    )
    .where(eq(billSponsors.politicianId, politicianId));

  const sponsorships = await database
    .select({
      id: bills.id,
      congress: bills.congress,
      billType: bills.billType,
      billNumber: bills.billNumber,
      title: bills.title,
      introducedDate: bills.introducedDate,
      status: bills.status,
      originChamber: bills.originChamber,
      summary: bills.summary,
      policyArea: bills.policyArea,
    })
    .from(bills)
    .innerJoin(
      billSponsors,
      eq(billSponsors.billId, bills.id)
    )
    .where(eq(billSponsors.politicianId, politicianId))
    .orderBy(desc(bills.introducedDate), desc(bills.id))
    .limit(limit)
    .offset(offset);

  return {
    sponsorships,
    total
  }
};

export const billRepository = {
  create,
  update,
  getById,
  getByIdentifier,
  getPoliticianBillSponsorships
};

// const getBySourceId = async (database: Database, sourceId: string) => {
//   const [existing] = await database
//     .select()
//     .from(bills)
//     .where(eq(bills.sourceId, sourceId))
//     .limit(1);

//   return existing;
// };