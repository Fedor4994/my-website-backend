import express, { ErrorRequestHandler, Application } from "express";
import logger from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import fileUpload from "express-fileupload";

import { ErrorWithStatus } from "./types/error";
import { createAuthRouter } from "./routes/auth";
import { createPostsRouter } from "./routes/posts";
import { createProjectsRouter } from "./routes/projects";
import { OAuth2Client } from "google-auth-library";
import { createCommentsRouter } from "./routes/comments";

dotenv.config();

const app: Application = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

export const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

function addApiRoutes() {
  const router = express.Router();

  router.use("/users", createAuthRouter());
  router.use("/posts", createPostsRouter());
  router.use("/projects", createProjectsRouter());
  router.use("/comments", createCommentsRouter());

  return router;
}

app.use("/api", addApiRoutes());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(((err: ErrorWithStatus, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
}) as ErrorRequestHandler);

export default app;
