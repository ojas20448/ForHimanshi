import { load } from "@cashfreepayments/cashfree-js";

let cashfree: any;

export async function initializeCashfree() {
  if (!cashfree) {
    cashfree = await load({
      mode: "production",
    });
  }
  return cashfree;
}
