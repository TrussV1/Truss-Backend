// server/src/logger.ts
import winston from "winston";
import { Request, Response, NextFunction } from "express";

// Configure Winston Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Extend Express Response interface to include 'on' method
declare module "express" {
  interface Response {
    on(event: string, callback: () => void): this;
  }
}

// Middleware to log requests
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms`
    );
  });
  next();
};

export { logger, requestLogger };
