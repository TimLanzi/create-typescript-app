import { getModelForClass } from "@typegoose/typegoose";

import { UserClass } from "./user";
import { PostClass } from "./post";

export const User = getModelForClass(UserClass);
export const Post = getModelForClass(PostClass);