import { Service } from "typedi";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { RecipeClass } from "../models/recipe";
import { RecipeService } from "../services/recipe";
import { RecipesArgs, NewRecipeInput } from "../dtos/recipe";

@Service()
@Resolver(RecipeClass)
export class RecipeResolver {
  constructor(
    private recipeService: RecipeService,
  ) {}

  @Query(() => RecipeClass)
  async recipe(@Arg("id") id: string) {
    const recipe = await this.recipeService.findById(id);
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    return recipe;
  }

  @Query(() => [RecipeClass])
  recipes(@Args() data: RecipesArgs) {
    return this.recipeService.findAll(data);
  }

  @Mutation(() => RecipeClass)
  addRecipe(
    @Arg("input") input: NewRecipeInput,
  ): Promise<RecipeClass> {
    return this.recipeService.addNew(input);
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Arg("id") id: string) {
    try {
      await this.recipeService.removeById(id);
      return true;
    } catch {
      return false;
    }
  }
}