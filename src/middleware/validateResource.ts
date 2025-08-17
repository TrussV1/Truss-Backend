import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateResource =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors });
    }
  };

export default validateResource;
