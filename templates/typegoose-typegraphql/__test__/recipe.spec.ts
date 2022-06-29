import http from "http";
import request from "supertest";
import { serve } from "../src/app";

describe('example tests', () => {
  let ws: http.Server;

  beforeAll(async() => {
    ws = await serve()
  });


  it("creates a recipe", async() => {
    const res = await request(ws)
      .post("/graphql")
      .send({
        query: `
          mutation CreateRecipe($input: NewRecipeInput!) {
            addRecipe(input: $input) {
              id
              title
            }
          }        
        `,
        variables: {
          input: {
            title: "Tacos",
            ingredients: ["Meat", "Seasoning", "Cheese", "Salsa"],
          },
        },
      })
      .expect(200);

    expect(res.body.data.addRecipe.title).toBe("Tacos");
  });


  it("gets a recipe by id", async() => {
    let res = await request(ws)
      .post("/graphql")
      .send({
        query: `
          mutation CreateRecipe($input: NewRecipeInput!) {
            addRecipe(input: $input) {
              id
              title
            }
          }        
        `,
        variables: {
          input: {
            title: "Tacos",
            ingredients: ["Meat", "Seasoning", "Cheese", "Salsa"],
          },
        },
      })
      .expect(200);

    const recipe = res.body.data.addRecipe;

    res = await request(ws)
      .post("/graphql")
      .send({
        query: `
          query GetRecipeById($id: String!) {
            recipe(id: $id) {
              id
              title
            }
          }        
        `,
        variables: {
          id: recipe.id,
        },
      })
      .expect(200);

    expect(res.body.data.recipe.title).toBe(recipe.title);
  });


  it("removes a recipe", async() => {
    let res = await request(ws)
      .post("/graphql")
      .send({
        query: `
          mutation CreateRecipe($input: NewRecipeInput!) {
            addRecipe(input: $input) {
              id
              title
            }
          }        
        `,
        variables: {
          input: {
            title: "Tacos",
            ingredients: ["Meat", "Seasoning", "Cheese", "Salsa"],
          },
        },
      })
      .expect(200);

    const recipe = res.body.data.addRecipe;

    res = await request(ws)
      .post("/graphql")
      .send({
        query: `
          mutation RemoveRecipe($id: String!) {
            removeRecipe(id: $id)
          }        
        `,
        variables: {
          id: recipe.id,
        },
      })
      .expect(200);

    expect(res.body.data.removeRecipe).toBe(true);
  });
});