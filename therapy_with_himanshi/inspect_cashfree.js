import { Cashfree } from "cashfree-pg";
const cf = new Cashfree("SANDBOX", "MY_CLIENT_ID", "MY_CLIENT_SECRET");
console.log("Instance properties after init:", Object.keys(cf));
console.log("PGCreateOrder length:", cf.PGCreateOrder.length);
console.log("PGOrderFetchPayments length:", cf.PGOrderFetchPayments.length);
console.log("XApiVersion value:", cf.XApiVersion);
