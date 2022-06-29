"use strict";
import "reflect-metadata";
import dotenv from "custom-env";
dotenv.env(process.env.NODE_ENV);

import mongoose from "mongoose";
import { serve } from "./app";
import { DEV } from "./constants";
import { ensureEnv } from "./lib/ensure-env";
import logger from "./lib/logger";

async function main() {
  ensureEnv();

  try {
    mongoose.connection.once("open", () => logger.info("> Connected to database."));
    mongoose.set("debug", DEV);
    await mongoose.connect(process.env.DATABASE_URL!);
  } catch(e) {
    logger.error(e as string);
  }

  const ws = await serve();

  ws.listen(4000, () => logger.info(`> Server listening on http://localhost:4000`));
}

main();