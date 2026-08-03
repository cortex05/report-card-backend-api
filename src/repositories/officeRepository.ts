import { offices } from "../db/schema/politicians/offices";
import { eq, and } from "drizzle-orm";
import { Database } from "../db/types";
import { OfficeDefinition } from "../db/schema/Types";

const getByDefinition = async (database: Database, definition: OfficeDefinition) => {
  const conditions = [
    eq(offices.name, definition.name),
    eq(offices.level, definition.level),
    eq(offices.branch, definition.branch),
  ];

  if (definition.chamber !== null) {
    conditions.push(eq(offices.chamber, definition.chamber));
  }

  const [existing] = await database
    .select()
    .from(offices)
    .where(
      and(...conditions)
    )
    .limit(1);

  return existing;
};

const create = async (database: Database, definition: OfficeDefinition) => {
  const [created] = await database.insert(offices).values(definition).returning();
  return created;
}

const getOrCreate = async (database: Database, definition: OfficeDefinition) => {
  const existing = await getByDefinition(database, definition);

  if (existing) {
    return existing;
  }

  return create(database, definition);
}

export const officeRepository = {
  getByDefinition,
  create,
  getOrCreate,
};