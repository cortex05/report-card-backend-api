import { PoliticianOfficeInsert, politicianOffices } from "../db/schema/politicians/politician-Offices";
import { offices } from '../db/schema/politicians/offices'
import { eq, and, desc } from "drizzle-orm";
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

const getAllOnePoliticianOffices = async (database: Database, politicianId: string) => {
  const officesResponse = await database
    .select({
      id: politicianOffices.id,
      name: offices.name,
      level: offices.level,
      branch: offices.branch,
      chamber: offices.chamber,
      startDate: politicianOffices.startDate,
      endDate: politicianOffices.endDate,
      party: politicianOffices.party,
    })
    .from(politicianOffices)
    .innerJoin(
      offices,
      eq(politicianOffices.officeId, offices.id)
    )
    .where(
      eq(politicianOffices.politicianId, politicianId)
    )
    .orderBy(desc(politicianOffices.startDate));

  return officesResponse;
}

export const politicianOfficeRepository = {
  create,
  getByDefinition,
  getAllOnePoliticianOffices
};