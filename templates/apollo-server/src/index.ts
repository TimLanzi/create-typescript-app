"use strict";
import dotenv from "custom-env";
import { serve } from "./app";
dotenv.env(process.env.NODE_ENV);

import { ensureEnv } from "./lib/ensure-env";
import logger from "./lib/logger";

async function main() {
  ensureEnv();

  const server = await serve();

  server.listen().then(({ url }) => {
    logger.info(`> Server listening on ${url}`);
  });
}

main();