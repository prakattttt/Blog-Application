import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { User } from "../models/user.models.js";
import { generateAccessTokens } from "../utils/tokenGenerator.js";

export interface registerInterface {
  name: string,
  email: string,
  password: string
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
  async(req, res) => {
    const { name, email, password }: registerInterface = (req.body || {}) as registerInterface;

    const registerUser: { success: boolean, id: string } = await User.registerUser(name, email, password);

    if(registerUser.success) {
      const token: string = generateAccessTokens({ id: registerUser.id })
      res.status(200).json({ token, success: true })
    }
  }
)