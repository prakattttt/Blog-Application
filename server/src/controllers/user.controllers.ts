import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { User } from "../models/user.models.js";
import AppError from "../utils/AppError.js";
import { generateAccessTokens } from "../utils/tokenGenerator.js";

export interface registerInterface {
  name: string;
  email: string;
  password: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

export const getAllUsers: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip: number = Number(req.query["skip"]) || 0;

    const users = await User.getUsers(skip);

    res.status(200).json({
      success: true,
      users,
    });
  },
);

export const registerUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body as registerInterface;

    const result = await User.registerUser(name, email, password);

    if (!result.success) {
      throw new AppError("Failed to register user", 400);
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  },
);
