import http from "http";
import express from "express";
import cors from "cors";

import helloRouter from "./routes/hello";

export async function serve() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(helloRouter);

  const ws = http.createServer(app);

  return ws;
}