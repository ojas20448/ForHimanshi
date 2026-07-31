import { load } from "@cashfreepayments/cashfree-js";

let cashfree: any;

export async function initializeCashfree() {
  if (!cashfree) {
    let mode: "sandbox" | "production" = "production";
    try {
      const response = await fetch("/api/health");
      if (response.ok) {
        const data = await response.json();
        if (data.cashfree?.environment === "SANDBOX") {
          mode = "sandbox";
        }
      }
    } catch (err) {
      console.warn("Could not fetch cashfree environment, defaulting to production", err);
    }

    cashfree = await load({
      mode,
    });
  }
  return cashfree;
}
