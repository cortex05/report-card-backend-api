import { and, eq } from "drizzle-orm";
import { BillSponsorInsert, billSponsors } from "../db/schema/bills/bill-Sponsors";
import { Database } from "../db/types";

const create = async (database: Database, billSponsor: BillSponsorInsert) => {
  const [created] = await database
    .insert(billSponsors)
    .values(billSponsor)
    .returning();
  return created;
};

const getByDefinition = async (
  database: Database,
  billId: string,
  politicianId: string,
  role: string
) => {
  const [existing] = await database
    .select()
    .from(billSponsors)
    .where(
      and(
        eq(billSponsors.billId, billId),
        eq(billSponsors.politicianId, politicianId),
        eq(billSponsors.role, role)
      )
    )
    .limit(1);
  return existing;
};

export const billSponsorRepository = {
  create,
  getByDefinition,
};
