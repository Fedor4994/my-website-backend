import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    next();
  };
