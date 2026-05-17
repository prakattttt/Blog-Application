import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { env } from "../config/env.js";

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const error =
    err instanceof AppError
      ? err
      : new AppError(err.message || "Internal Server Error", 500);

  const responseBody: Record<string, unknown> = {
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
  };

  if (env === "development") {
    responseBody["stack"] = error.stack;
  }

  res.status(error.statusCode).json(responseBody);
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError("URL not found", 404));
};
