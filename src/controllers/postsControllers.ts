import { Response, NextFunction } from "express";
import { RequestError } from "../helpers/RequestError";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/request";
import { PostData } from "../types/post";
import {
  addPost,
  editPostById,
  getAllPosts,
  getPostById,
} from "../services/postsService";
import mongoose from "mongoose";

export const getAllPostsController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const data = await getAllPosts();
  const { posts, total } = data;

  res.status(200).json({ posts, total });
};

export const getPostByIdController = async (
  req: RequestWithParams<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw RequestError(404, "Not found");
  }

  const post = await getPostById(req.params.id);

  if (!post) {
    throw RequestError(404, "Not found");
  }

  res.json(post);
};

export const addPostController = async (
  req: RequestWithBody<PostData>,
  res: Response,
  next: NextFunction
) => {
  const { text, date, title } = req.body;

  const post = await addPost({
    text,
    title,
    date,
  });

  if (!post) {
    throw RequestError(400, "Cannot create a post");
  }

  res.status(201).json(post);
};

export const editPostByIdController = async (
  req: RequestWithParamsAndBody<{ id: string }, PostData>,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw RequestError(404, "Not found");
  }

  const post = await editPostById({ postId: req.params.id, newPost: req.body });

  if (!post) {
    throw RequestError(404, "Not found");
  }

  res.json(post);
};
