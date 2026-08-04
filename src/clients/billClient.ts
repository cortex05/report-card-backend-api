import { congressClient } from "./congressClient";
import { CongressBill } from "../types/congress/bill";

const getBill = async (
  congress: number,
  billType: string,
  billNumber: string
): Promise<CongressBill> => {
  
  return congressClient.get<CongressBill>(
    `/bill/${congress}/${billType}/${billNumber}`
  );
};

export const billClient = {
  getBill,
};