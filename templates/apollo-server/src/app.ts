import { ApolloServer } from "apollo-server";
import { typeDefs } from "./type-defs";
import { resolvers } from "./resolvers";

export async function serve() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
  });

  return server;
}