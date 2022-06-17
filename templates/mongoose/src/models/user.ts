import { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});