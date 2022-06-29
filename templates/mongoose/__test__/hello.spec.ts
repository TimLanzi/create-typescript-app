import http from "http";
import request from "supertest";
import { serve } from "../src/app";

describe('example tests', () => {
  let ws: http.Server;

  beforeAll(async() => {
    ws = await serve()
  });


  it("says hello", async() => {
    const res = await request(ws)
      .get("/hello")
      .expect(200);

    expect(res.text).toBe("Hello, there!");
  });

  it("says hello with a name", async() => {
    const res = await request(ws)
      .post("/hello")
      .send({ name: "John" })
      .expect(200);

    expect(res.text).toBe("Hello, John!");
  });
});