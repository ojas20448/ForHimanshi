import serverless from "serverless-http";
import { initializeApp } from "../../server/app";

let serverlessHandler: any;

async function getHandler() {
  if (!serverlessHandler) {
    const app = await initializeApp();
    serverlessHandler = serverless(app);
  }
  return serverlessHandler;
}

export async function handler(event: any, context: any) {
  const fn = await getHandler();
  return fn(event, context);
}
