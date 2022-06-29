import { Service } from "typedi";
import { Recipe } from "../models";
import { RecipeClass } from "../models/recipe";
import { NewRecipeInput, RecipesArgs } from "../dtos/recipe";

@Service()
export class RecipeService {
  public async findById(id: string): Promise<RecipeClass | null> {
    return Recipe.findById(id);
  }


  public async findAll(
    { skip, take }: RecipesArgs,
  ): Promise<RecipeClass[]> {
    return Recipe.find()
      .skip(skip)
      .limit(take);
  }


  public async addNew(data: NewRecipeInput): Promise<RecipeClass> {
    return Recipe.create({ ...data });
  }


  public async removeById(id: string): Promise<number> {
    const res = await Recipe.deleteOne({ _id: id });
    return res.deletedCount;
  }
}