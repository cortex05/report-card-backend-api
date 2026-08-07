// import { billClient } from "../clients/billClient";
import { importBill } from "../services/billImportService";

export const main = async () => {
  console.log("Importing bill...");

  // const bill = await billClient.getBill(119, "hr", 1);

  // console.log(`Bill fetched successfully: `, JSON.stringify(bill, null, 2));
  const bill = await importBill(119, "hr", 1);

  console.log(`Bill fetched successfully: `, JSON.stringify(bill, null, 2));
};

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});