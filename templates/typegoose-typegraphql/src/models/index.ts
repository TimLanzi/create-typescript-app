import { getModelForClass } from "@typegoose/typegoose";

import { RecipeClass } from "./recipe";

export const Recipe = getModelForClass(RecipeClass);