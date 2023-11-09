import { Response, NextFunction } from "express";
import { RequestWithParams, RequestWithParamsAndBody } from "../types/request";
import { addComment, getAllCommentsForPost } from "../services/commentsService";
import { RequestError } from "../helpers/RequestError";
import { CommentData } from "../types/comment";
import { getUserById } from "../services/authService";

export const getAllCommentsForPostController = async (
  req: RequestWithParams<{ postId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const comments = await getAllCommentsForPost(postId);

  res.json(comments);
};

export const addCommentForPostController = async (
  req: RequestWithParamsAndBody<{ postId: string }, CommentData>,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const { text, userId } = req.body;

  const currentUser = await getUserById(userId);

  if (!currentUser) {
    throw RequestError(404, "User not found");
  }

  const data = await addComment({
    text,
    postId,
    userId,
    username: currentUser.name,
    avatar: currentUser.picture,
  });

  if (!data) {
    throw RequestError(400, "You cannot add a comment");
  }

  res.status(201).json(data);
};
