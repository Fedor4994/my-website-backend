import { Response, NextFunction } from "express";
import { googleLogin } from "../services/authService";
import { RequestWithBody } from "../types/request";
import { RequestError } from "../helpers/RequestError";

export const googleLoginController = async (
  req: RequestWithBody<{ token: string }>,
  res: Response,
  next: NextFunction
) => {
  const data = await googleLogin(req.body);
  if (!data) {
    throw RequestError(401, "Google account is wrong");
  }

  res.json(data);
};
