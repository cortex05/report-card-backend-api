import { db } from "../../db";
import { politicianRepository } from "../../repositories/politicianRepository";
import dotenv from "dotenv";

dotenv.config();

const SAMPLE_ID = process.env.SAMPLE_POLITICIAN_ID;

if (!SAMPLE_ID) {
  throw new Error("Missing environment variable: SAMPLE_POLITICIAN_ID");
}

const getSamplePolitician = async () => {
  return politicianRepository.getById(db, SAMPLE_ID);
};

export const politicianReadService = {
  getSamplePolitician,
};