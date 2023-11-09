import { Comment } from "../db/commentModel";
import { FullComment } from "../types/comment";

export const getAllCommentsForPost = async (postId: string) => {
  const comments = await Comment.find({ postId });
  return comments;
};

export const addComment = async ({
  text,
  userId,
  postId,
  username,
  avatar,
}: FullComment) => {
  if (!postId) {
    return false;
  }

  const comment = new Comment({
    text,
    postId,
    userId,
    username,
    avatar,
  });

  const result = await comment.save();

  return result;
};
