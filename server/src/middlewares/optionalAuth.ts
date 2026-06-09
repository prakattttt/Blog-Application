import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { secretAToken } from "../config/env.js";
import type { AuthRequest } from "./authenticaton.js";

interface JwtPayload {
  id: string;
}

const optionalAuth: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, _res, next) => {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    const token = req.cookies?.["token"] || bearerToken;

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, secretAToken) as JwtPayload;

      if (decoded.id) {
        req.user = decoded;
      }
    } catch {
      return next();
    }

    next();
  },
);

export default optionalAuth;