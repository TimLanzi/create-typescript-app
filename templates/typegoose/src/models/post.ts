import { prop, Ref } from "@typegoose/typegoose";
import { UserClass } from "./user";

export class PostClass {
  @prop()
  public title!: string;

  @prop({ ref: () => UserClass })
  public author!: Ref<UserClass>;
}