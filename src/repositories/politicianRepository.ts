import { db } from "../db/index";
import { eq } from "drizzle-orm";
import { politicians } from "../db/schema/politicians/politicians";
import { PoliticianInsert } from "../db/schema/Types";
import { Database } from "../db/types";

const create = async (
  database: Database,
  politician: PoliticianInsert
) => {
  const [created] = await database.insert(politicians).values(politician).returning();
  return created;
}

const getByBioguideId = async (database: Database, bioguideId: string) => {
  const [existing] = await database
    .select()
    .from(politicians)
    .where(eq(politicians.bioguideId, bioguideId))
    .limit(1);

  return existing
}

const update = async (
  database: Database,
  bioguideId: string,
  politician: Partial<PoliticianInsert>
) => {
  const [updated] = await database
    .update(politicians)
    .set(politician)
    .where(eq(politicians.bioguideId, bioguideId))
    .returning();

  return updated;
}

export const politicianRepository = {
  create,
  getByBioguideId,
  update,
};