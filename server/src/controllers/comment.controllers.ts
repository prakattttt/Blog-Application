import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { Comment } from "../models/coment.models.js";
import AppError from "../utils/AppError.js";
import type { AuthRequest } from "../middlewares/authenticaton.js";

export const getPostComments: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id = req.params["id"] as string;

    const comments = await Comment.getPostComments(id);

    res.status(200).json({
      success: true,
      comments,
    });
  },
);

export const writeComment: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const user = req.user?.id as string;

    const post = req.params["id"] as string;

    const { comment } = req.body;

    if (!comment?.trim()) {
      throw new AppError("Comment is required", 400);
    }

    const comments = await Comment.addPostComment(user, post, comment);

    res.status(200).json({
      success: true,
      comments,
    });
  },
);
