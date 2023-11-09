import express from "express";
import {
  addCommentForPostController,
  getAllCommentsForPostController,
} from "../controllers/commentsControllers";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { tryCatch } from "../middlewares/tryCatchMiddleware";
import { addCommentForPostSchema } from "../schemas/commentValidator";

export function createCommentsRouter() {
  const router = express.Router();

  router.get("/:postId", tryCatch(getAllCommentsForPostController));

  router.post(
    "/:postId",
    validationMiddleware(addCommentForPostSchema),
    tryCatch(addCommentForPostController)
  );

  return router;
}
