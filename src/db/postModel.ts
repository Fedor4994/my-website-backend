import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const Post = mongoose.model("posts", postsSchema);
