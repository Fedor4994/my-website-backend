import { Post } from "../db/postModel";
import { PostData } from "../types/post";

export const getAllPosts = async () => {
  const total = (await Post.find({})).length;

  const posts = await Post.find({});

  return { posts, total };
};

export const getPostById = async (postId: string) => {
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    return false;
  }

  return post;
};

export const addPost = async ({ text, title, date }: PostData) => {
  const newPost = new Post({
    text,
    title,
    date,
  });

  const post = await newPost.save();

  return post;
};

export const editPostById = async ({
  postId,
  newPost: { date, text, title },
}: {
  postId: string;
  newPost: PostData;
}) => {
  const updatedReview = await Post.findOneAndUpdate(
    { _id: postId },
    {
      text,
      title,
      date,
    },
    { new: true }
  );

  if (!updatedReview) {
    return false;
  }

  return updatedReview;
};
