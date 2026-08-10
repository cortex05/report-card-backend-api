export interface CongressBill {
  congress: number;
  number: string;
  type: string;
  title: string;
  latestAction?: {
    text: string;
    actionDate: string;
  };
  introducedDate?: string;
  originChamber: string;
  policyArea?: {
    name: string;
  };
  sponsors: CongressBillSponsor[];
}

export interface CongressBillSponsor {
  bioguideId: string;
  firstName: string;
  fullName: string;
  isByRequest: string;
  lastName: string;
  party: string;
  state: string;
  url: string;
}

export interface CongressBillResponse {
  bill: CongressBill;
  request: CongressBillRequest;
}

interface CongressBillRequest {
  congress: string;
  billType: string;
  billNumber: string;
  contentType: string;
  format: string;
};