import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import cors from "cors";
import { TypegooseMiddleware } from "./middleware/typegoose";

import { RecipeResolver } from "./resolvers/recipe";

export async function serve() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Add any other middleware or REST routes to express app here

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    dateScalarMode: 'isoDate',
    globalMiddlewares: [TypegooseMiddleware],
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  return httpServer;
}