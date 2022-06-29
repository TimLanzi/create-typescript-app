"use strict";
import dotenv from "custom-env";
dotenv.env(process.env.NODE_ENV);

import { serve } from "./app";
import { ensureEnv } from "./lib/ensure-env";
import logger from "./lib/logger";

async function main() {
  ensureEnv();

  const ws = await serve();

  ws.listen(4000, () => logger.info(`> Server listening on http://localhost:4000`));
}

main();