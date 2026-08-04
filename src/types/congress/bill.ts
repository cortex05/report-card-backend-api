export interface CongressBill {
  congress: number;
  type: string;
  number: string;
  title: string;
  originDate: string;
  originChamberDate: string;
  latestAction?: {
    actionDate: string;
    text: string;
  }
  updateDate: string;
  updateDateIncludingText: string;
  url: string;
}