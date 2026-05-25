import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { Post } from "../models/post.models.js";
import AppError from "../utils/AppError.js";

export const getAllPosts: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const skip: number = Number(req.query["skip"]) || 0;

    const posts = await Post.getPosts(skip);

    res.status(200).json({
      success: true,
      posts,
    });
  },
);

export const getPosts: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id: string = req.params["id"] as string;

    const posts = await Post.getPostsByAuthor(id);

    res.status(200).json({
      success: true,
      posts,
    });
  },
);

export const createPost: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const author: string = req.params["id"] as string;

    const { title, description, imageSrc } = req.body || {};

    if (!title && !description) {
      throw new AppError("No title or description!", 400);
    }

    const post = await Post.createPost({
      title,
      description,
      imageSrc,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post,
    });
  },
);
