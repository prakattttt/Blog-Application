import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { User } from "../models/user.models.js";

export const getAllUsers: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const limit = Number(req.query["limit"]) || 10;
    const skip = Number(req.query["skip"]) || 0;

    const users = await User.getUsers(limit, skip);

    res.status(200).json({
      success: true,
      users,
    });
  },
);
