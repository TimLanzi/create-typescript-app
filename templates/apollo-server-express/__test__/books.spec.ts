import http from "http";
import request from "supertest";
import { serve } from "../src/app";

describe('example tests', () => {
  let ws: http.Server;

  beforeAll(async() => {
    ws = await serve()
  });


  it("gets books", async() => {
    const res = await request(ws)
      .post("/graphql")
      .send({
        query: `
          query ExampleQuery {
            books {
              title
            }
          }        
        `
      })
      .expect(200);

    expect(res.body.data?.books.length).toBe(2);
  });
});