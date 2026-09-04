import { db } from "../db";
import { memberClient } from "../clients/memberClient";
import { syncPolitician } from "./syncPoliticianService";

export const importPolitician = async (bioguideId: string) => {
  const member = await memberClient.get(bioguideId);

  return await db.transaction(async (tx) => {
    return syncPolitician(tx, member.member);
  });
};
