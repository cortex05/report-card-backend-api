import { congressClient } from "./congressClient";
import { CongressBill, CongressBillAction, CongressBillResponse } from "../types/congress/bill";

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
): Promise<CongressBillAction[]> => {
  const response = await congressClient.get<{actions: CongressBillAction[]}>(
    `/bill/${congress}/${billType}/${billNumber}/actions`
  );
  return response.actions; 
}; 

export const billClient = {
  getBill,
  getBillActions,
};