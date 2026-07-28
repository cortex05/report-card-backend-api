import { db } from "../index";
import { eq } from "drizzle-orm";
import { politicians } from "../schema/politicians/politicians";
import type { PoliticianInsert } from "../../importers/congress/mappers/politicianMapper";

const create = async (
  politician: PoliticianInsert
) => {
  const [created] = await db.insert(politicians).values(politician).returning();
  return {
    action: "created",
    created
  };
}

const getByBioguideId = async (bioguideId: string) => {
  const [existing] = await db
    .select()
    .from(politicians)
    .where(eq(politicians.bioguideId, bioguideId))
    .limit(1);

  return {
    action: "found",
    existing
  };
}

const update = async (
  bioguideId: string,
  politician: Partial<PoliticianInsert>
) => {
  const [updated] = await db
    .update(politicians)
    .set(politician)
    .where(eq(politicians.bioguideId, bioguideId))
    .returning();

  return {
    action: "updated",
    updated
  };
}

export const politicianRepository = {
  create,
  getByBioguideId,
  update,
};