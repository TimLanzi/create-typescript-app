import { Router } from "express";

const router = Router();

router.get("/hello", (_req, res) => {
  res.send("Hello, there!");
});

router.post("/hello", (req, res) => {
  res.send(`Hello, ${req.body.name}!`);
});

export default router;