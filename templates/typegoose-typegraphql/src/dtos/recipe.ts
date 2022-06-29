import { ArgsType, Field, InputType, Int } from "type-graphql";
import { ArrayMaxSize, Length, Max, MaxLength, Min } from "class-validator";

@ArgsType()
export class RecipesArgs {
  @Field(() => Int)
  @Min(0)
  skip: number = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}


@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title!: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  @ArrayMaxSize(30)
  ingredients!: string[];
}