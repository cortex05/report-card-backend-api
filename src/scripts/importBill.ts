// import { billClient } from "../clients/billClient";
import { billClient } from "../clients/billClient";
import { importBill } from "../services/billImportService";

export const main = async () => {
  const congressNumber = parseInt(process.argv[2]);
  const billType = process.argv[3];
  const billNumber = parseInt(process.argv[4]);

  if (!congressNumber) {
    console.error("Please provide a congress number as an argument.");
    process.exit(1);
  }
  if (!billType) {
    console.error("Please provide a bill type as an argument.");
    process.exit(1);
  }
  if (!billNumber) {
    console.error("Please provide a bill number as an argument.");
    process.exit(1);
  }
  console.log("Importing bill...");

  const bill = await importBill(congressNumber, billType, billNumber);

  // const bill = await billClient.getBill(119, "hr", 1);

  // console.log(`Bill fetched successfully: `, JSON.stringify(bill, null, 2));
  // const bill = await importBill(Number(congressNumber), billType, Number(billNumber));

  console.log(`Bill fetched successfully: `, JSON.stringify(bill, null, 2));
};

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});