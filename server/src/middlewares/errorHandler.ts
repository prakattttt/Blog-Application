import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { env } from "../config/env.js";
import multer from "multer";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size must be less than 4MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const error =
    err instanceof AppError
      ? err
      : new AppError(
          err instanceof Error ? err.message : "Internal Server Error",
          500,
        );

  const responseBody: Record<string, unknown> = {
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
  };

  if (env === "development") {
    responseBody["stack"] = error.stack;
  }

  return res.status(error.statusCode).json(responseBody);
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  next(new AppError("URL not found", 404));
};
