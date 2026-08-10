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

const getBillActions = async (
  congress: number,
  billType: string,
  billNumber: number
): Promise<any> => {
  const response = await congressClient.get<any>(
    `/bill/${congress}/${billType}/${billNumber}/actions`
  );
  return response.actions;
}; 

export const billClient = {
  getBill,
  getBillActions,
};