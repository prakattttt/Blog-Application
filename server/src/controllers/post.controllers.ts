import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { Post } from "../models/post.models.js";
import AppError from "../utils/AppError.js";
import fs from "fs/promises";
import cloudinary from "../utils/Cloudinary.js";
import type { AuthRequest } from "../middlewares/authenticaton.js";

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

export const getSinglePost: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const id: string = req.params["id"] as string;

    const posts = await Post.getSinglePost(id);

    res.status(200).json({
      success: true,
      posts,
    });
  },
);

export const createPost: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const author: string = req.params["id"] as string;
    const file = req.file;

    let imageSrc = "";

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "blog-posts",
        resource_type: "image",
      });

      imageSrc = result.secure_url || "";

      await fs.unlink(file.path);
    }

    const { title, description } = req.body || {};

    if (!title || !description) {
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

export const toggleLike: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    if (!req.user) throw new AppError("User not found!", 404);
    const author: string = req.user?.id;

    const postId: string = req.params["id"] as string;

    const isLiked = await Post.toggleLike(author, postId);

    res.status(200).json({
      success: true,
      isLiked
    });
  },
);

export const deletePost: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const author: string = req.params["id"] as string;

    await Post.deletePost(author);

    res.status(204).json({
      success: true,
      message: "Post deleted successfully!",
    });
  },
);
