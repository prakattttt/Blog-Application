import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { User } from "../models/user.models.js";
import AppError from "../utils/AppError.js";
import { generateAccessTokens } from "../utils/tokenGenerator.js";
import type { AuthRequest } from "../middlewares/authenticaton.js";
import { env } from "../config/env.js";
import cloudinary from "../utils/Cloudinary.js";
import fs from "fs/promises";

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

export const setBio: RequestHandler = expressAsyncHandler(async (req, res) => {
  const id = req.params["id"] as string;

  const { bio } = req.body || "";

  await User.setBio(id, bio);

  res.status(200).json({ success: true });
});

export const getMe: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    if (!req.user) {
      throw new AppError("Unauthorized!", 401);
    }

    const user = await User.findUser(req.user.id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    res.status(200).json({
      success: true,
      user,
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

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      id: result.id,
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

export const uploadProfileImage: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const file = req.file;

    const id = req.params["id"];

    if (!file) {
      throw new AppError("No image uploaded!", 400);
    }

    if (!id) {
      throw new AppError("User ID now found!!", 400);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "blog-users",
      resource_type: "image"
    });

    await User.findByIdAndUpdate(id, {
      profileImage: result.secure_url,
    });

    await fs.unlink(file.path);

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
  },
);

export const logoutUser: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: env !== "development",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully!",
    });
  },
);

export const deleteUser: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const user = req.user?.id as string;

    res.clearCookie("token", {
      httpOnly: true,
      secure: env !== "development",
      sameSite: "lax",
    });

    await User.deleteUser(user);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  },
);
