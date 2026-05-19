import expressAsyncHandler from "express-async-handler";
import type { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import { secretAToken } from "../config/env.js";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

const authenticateUser: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, _res, next) => {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    const token = req.cookies?.["token"] || bearerToken;

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    try {
      const decoded = jwt.verify(token, secretAToken) as JwtPayload;

      if (!decoded.id) {
        throw new AppError("Invalid token payload", 401);
      }

      req.user = decoded;

      next();
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
  },
);

export default authenticateUser;
