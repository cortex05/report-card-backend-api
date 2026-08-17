import { and, eq } from "drizzle-orm";
import { votes, VoteInsert } from "../db/schema/bills/votes";
import { Database } from "../db/types";

const create = async (database: Database, vote: VoteInsert) => {
  const [created] = await database.insert(votes).values(vote).returning();
  return created;
};

const update = async (
  database: Database,
  id: string,
  vote: Partial<VoteInsert>
) => {
  const [updated] = await database
    .update(votes)
    .set(vote)
    .where(eq(votes.id, id))
    .returning();

  return updated;
};

const getByDefinition = async (
  database: Database,
  congress: number,
  chamber: string,
  sourceId: string
) => {
  const [existing] = await database
    .select()
    .from(votes)
    .where(
      and(
        eq(votes.congress, congress),
        eq(votes.chamber, chamber),
        eq(votes.sourceId, sourceId)
      )
    )
    .limit(1);

  return existing;
};

export const voteRepository = {
  create,
  update,
  getByDefinition,
};
