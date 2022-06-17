import { model } from "mongoose";

import { UserSchema } from "./user";
import { PostSchema } from "./post";

export const User = model("User", UserSchema);
export const Post = model("Post", PostSchema);