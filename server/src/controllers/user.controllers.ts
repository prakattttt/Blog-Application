import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { User } from "../models/user.models.js";

export const getAllUsers: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip = Number(req.query["skip"]) || 0;

    const users = await User.getUsers(skip);

    res.status(200).json({
      success: true,
      users,
    });
  },
);
