import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        error: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };
};

export const validateQuery = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      res.status(400).json({
        error: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };
};
