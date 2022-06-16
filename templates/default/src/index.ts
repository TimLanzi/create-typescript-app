"use strict";

import { serve } from "./app";
import { ensureEnv } from "./lib/ensure-env";

require("custom-env").env(process.env.NODE_ENV);

async function main() {
  ensureEnv();

  const ws = await serve();

  ws.listen(4000, () => console.log(`> Server listening on http://localhost:4000`));
}

main();