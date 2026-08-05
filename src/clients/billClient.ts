import { congressClient } from "./congressClient";
import { CongressBill, CongressBillResponse } from "../types/congress/bill";

const getBill = async (
  congress: number,
  billType: string,
  billNumber: number
): Promise<CongressBill> => {
  
  const response = await congressClient.get<CongressBillResponse>(
    `/bill/${congress}/${billType}/${billNumber}`
  );

  return response.bill;
};

export const billClient = {
  getBill,
};