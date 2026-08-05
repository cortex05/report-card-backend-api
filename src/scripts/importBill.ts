import { billClient } from "../clients/billClient";

export const main = async () => {
  console.log("Fetching bill...");
  const bill = await billClient.getBill(118, "s", 1);
  console.log(`Bill fetched successfully: `, JSON.stringify(bill, null, 2));
};

main().catch((error) => {
  console.error("Import failed:");
  console.error(error);
  process.exit(1);
});