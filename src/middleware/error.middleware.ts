import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ error: "Route not found" });
};

export const methodNotAllowedHandler = (req: Request, res: Response): void => {
  res.status(405).json({ error: "Method not allowed" });
};