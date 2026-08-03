import { PoliticianOfficeInsert, politicianOffices } from "../db/schema/politicians/politician-Offices";
import { eq, and } from "drizzle-orm";
import { Database } from "../db/types";

const create = async (database: Database, politicianOffice: PoliticianOfficeInsert) => {
  const [created] = await database
    .insert(politicianOffices)
    .values(politicianOffice)
    .returning();
  return created;
};

const getByDefinition = async (database: Database, politicianId: string, officeId: string, startDate: string) => {
  const [existing] = await database
    .select()
    .from(politicianOffices)
    .where(
      and(
        eq(politicianOffices.politicianId, politicianId),
        eq(politicianOffices.officeId, officeId),
        eq(politicianOffices.startDate, startDate)
      )
    )
    .limit(1);
  return existing;
};

export const politicianOfficeRepository = {
  create,
  getByDefinition,
};