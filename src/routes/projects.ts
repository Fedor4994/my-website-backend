import express from "express";

import { tryCatch } from "../middlewares/tryCatchMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { addProjectSchema } from "../schemas/projectValidation";
import {
  addProjectController,
  getAllProjectsController,
  getProjectByIdController,
} from "../controllers/projectsControllers";

export function createProjectsRouter() {
  const router = express.Router();

  router.get("/", tryCatch(getAllProjectsController));
  router.post(
    "/",
    validationMiddleware(addProjectSchema),
    tryCatch(addProjectController)
  );
  router.get("/:id", tryCatch(getProjectByIdController));

  return router;
}
