import { prop, Ref } from "@typegoose/typegoose";
import { PostClass } from "./post";

export class UserClass {
  @prop({ required: true })
  public name!: string;

  @prop({ ref: () => PostClass })
  public posts!: Ref<PostClass>[];
}