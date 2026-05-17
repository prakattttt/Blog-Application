import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { User } from "../models/user.models.js";
import AppError from "../utils/AppError.js";
import { generateAccessTokens } from "../utils/tokenGenerator.js";
import { env } from "../config/env.js";

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
    const { name, email, password } = (req.body || {}) as registerInterface;

    if (!name || !email || !password) {
      throw new AppError("Email and password is required!", 400);
    }

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

export const loginUser: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { email, password }: loginInterface = (req.body ||
      {}) as loginInterface;

    if (!email || !password) {
      throw new AppError("Email and password is required!", 400);
    }

    const result = await User.loginUser(email, password);

    if (!result.success) {
      throw new AppError("Failed to register user", 400);
    }

    res.cookie("token", generateAccessTokens({ id: result.id }), {
      httpOnly: true,
      secure: env === "development" ? false : true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
    });
  },
);
