import { Field, ID, ObjectType } from "type-graphql";
import { Types } from "mongoose";
import { pre, prop } from "@typegoose/typegoose";

@ObjectType("Recipe")
@pre<RecipeClass>("save", function() {
  this.updateDate = new Date();
})
export class RecipeClass {
  @Field(() => ID, { name: "id" })
  readonly _id!: Types.ObjectId;

  @Field()
  @prop()
  title!: string;

  @Field({ nullable: true })
  @prop()
  description?: string;

  @Field()
  @prop({ default: () => Date.now() })
  creationDate!: Date;

  @Field()
  @prop({ default: () => Date.now() })
  updateDate!: Date;

  @Field(() => [String])
  @prop({ type: () => [String] })
  ingredients!: string[];
}