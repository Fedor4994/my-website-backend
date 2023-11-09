import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    source_link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Project = mongoose.model("projects", projectSchema);
