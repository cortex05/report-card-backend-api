import { db } from "../db";
import { voteClient } from "../clients/voteClient";
import { importBill } from "./billImportService";
import { mapHouseRollCallToVoteInsert } from "../mappers/voteMapper";
import { mapHouseRollCallMemberToVoteRecord } from "../mappers/voteRecordMapper";
import { mapHouseRollCallMemberToPolitician } from "../mappers/politicianMapper";
import { voteRepository } from "../repositories/voteRepository";
import { voteRecordRepository } from "../repositories/voteRecordRepository";
import { politicianRepository } from "../repositories/politicianRepository";
import { HouseRollCallVoteMemberResponse, HouseRollCallVoteResponse } from "../types/congress/vote";
import { Database } from "../db/types";

export const importHouseRollCall = async (
  congress: number,
  session: number,
  rollCallNumber: number,
  billId: string) => {
    const rollCallResponse = await voteClient.getHouseRollCall(congress, session, rollCallNumber);
    const membersResponse = await voteClient.getHouseRollCallMembers(congress, session, rollCallNumber);

    return db.transaction(async (tx) => {
      return syncHouseRollCall(tx, rollCallResponse, membersResponse, billId)
    })

}

export const syncHouseRollCall = async (
  tx: Database,
  rollCallResponse: HouseRollCallVoteResponse,
  membersResponse: HouseRollCallVoteMemberResponse,
  billId: string
) => {

  const voteInsert = mapHouseRollCallToVoteInsert(billId, rollCallResponse);

  const existingVote = await voteRepository.getByDefinition(
    tx,
    voteInsert.congress,
    voteInsert.chamber,
    voteInsert.sourceId! // always set by the mapper
  );

  const vote = existingVote
    ? await voteRepository.update(tx, existingVote.id, voteInsert)
    : await voteRepository.create(tx, voteInsert);

  for (const member of membersResponse.houseRollCallVoteMemberVotes.results) {
    const existingPolitician = await politicianRepository.getByBioguideId(tx, member.bioguideID);
    const politician = existingPolitician ?? await politicianRepository.create(
      tx,
      mapHouseRollCallMemberToPolitician(member)
    );

    const voteRecord = mapHouseRollCallMemberToVoteRecord(vote.id, politician.id, member);
    const existingRecord = await voteRecordRepository.getByDefinition(tx, vote.id, politician.id);

    if (existingRecord) {
      await voteRecordRepository.update(tx, existingRecord.id, voteRecord);
    } else {
      await voteRecordRepository.create(tx, voteRecord);
    }

    
  }

  return vote;

};
