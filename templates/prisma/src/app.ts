import http from "http";
import express from "express";
import cors from "cors";

export async function serve() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const ws = http.createServer(app);

  return ws;
}