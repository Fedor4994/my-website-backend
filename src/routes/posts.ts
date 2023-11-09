import express from "express";

import {
  addPostController,
  editPostByIdController,
  getAllPostsController,
  getPostByIdController,
} from "../controllers/postsControllers";
import { tryCatch } from "../middlewares/tryCatchMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { addPostSchema } from "../schemas/postValidator";

export function createPostsRouter() {
  const router = express.Router();

  router.get("/", tryCatch(getAllPostsController));
  router.post(
    "/",
    validationMiddleware(addPostSchema),
    tryCatch(addPostController)
  );
  router.put(
    "/:id",
    validationMiddleware(addPostSchema),
    tryCatch(editPostByIdController)
  );
  router.get("/:id", tryCatch(getPostByIdController));

  return router;
}
