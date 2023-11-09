import express from "express";
import { googleLoginController } from "../controllers/authControllers";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { googleAuthSchema } from "../schemas/userValidator";
import { tryCatch } from "../middlewares/tryCatchMiddleware";

export function createAuthRouter() {
  const router = express.Router();

  router.post(
    "/google-login",
    validationMiddleware(googleAuthSchema),
    tryCatch(googleLoginController)
  );

  return router;
}
