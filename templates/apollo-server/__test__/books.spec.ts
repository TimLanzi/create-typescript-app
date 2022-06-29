import { ApolloServer } from "apollo-server";
import { serve } from "../src/app";

describe('example tests', () => {
  let ws: ApolloServer;

  beforeAll(async() => {
    ws = await serve()
  });


  it("gets books", async() => {
    const res = await ws.executeOperation({
      query: `
        query ExampleQuery {
          books {
            title
          }
        }        
      `
    });

    expect(res.data?.books.length).toBe(2);
  });
});