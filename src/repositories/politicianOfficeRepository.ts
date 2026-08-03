import { PoliticianOfficeInsert, politicianOffices } from "../db/schema/politicians/politician-Offices";
import { Database } from "../db/types";

const create = async (database: Database, politicianOffice: PoliticianOfficeInsert) => {
  const [created] = await database
    .insert(politicianOffices)
    .values(politicianOffice)
    .returning();
  return created;
};

export const politicianOfficeRepository = {
  create,
};