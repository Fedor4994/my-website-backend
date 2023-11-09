import { Request, Response, NextFunction } from "express";

export const tryCatch =
  (
    controller: (
      req: Request<any, any, any, any>,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
