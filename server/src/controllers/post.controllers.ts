import expressAsyncHandler from "express-async-handler";
import type { RequestHandler } from "express";
import { Post } from "../models/post.models.js";
import AppError from "../utils/AppError.js";
import fs from "fs/promises";
import cloudinary from "../utils/Cloudinary.js";
import type { AuthRequest } from "../middlewares/authenticaton.js";

export const getAllPosts: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const skip: number = Number(req.query["skip"]) || 0;

    const userId: string = req.user?.id || "";

    const posts = await Post.getPosts(skip, userId);

    const postNo: number = await Post.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      totalPages: Math.ceil(postNo / 12),
    });
  },
);

export const getTrendingPosts: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const skip: number = Number(req.query["skip"]) || 0;

    const userId: string = req.user?.id || "";

    const posts = await Post.getTrendingPosts(skip, userId);

    const postNo: number = await Post.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      totalPages: Math.ceil(postNo / 12),
    });
  },
);

export const getPosts: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const id: string = req.user?.id as string;

    const skip: number = Number(req.query["skip"]) || 0;

    const posts = await Post.getPostsByAuthor(id, skip);

    const postNumber = await Post.countDocuments({ author: id });

    res.status(200).json({
      success: true,
      posts,
      totalPages: Math.ceil(postNumber / 12),
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

export const getSpecificPosts: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const id: string = req.params["id"] as string;

    const skip: number = Number(req.query["skip"]) || 0;

    const posts = await Post.getPostsByAuthor(id, skip);

    const postNumber = await Post.countDocuments({ author: id });

    res.status(200).json({
      success: true,
      posts,
      totalPages: Math.ceil(postNumber / 12),
    });
  },
);

export const createPost: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const author: string = req.params["id"] as string;
    const file = req.file;

    let imageSrc = "";
    let imageId = "";

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "blog-posts",
        resource_type: "image",
      });

      imageSrc = result.secure_url;
      imageId = result.public_id;

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
      imageId,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post,
    });
  },
);

export const editPost: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    const postId = req.params["id"] as string;

    const file = req.file;
    const { title, description } = req.body;

    if (!userId) throw new AppError("User not found!", 404);

    const post = await Post.findById(postId);
    if (!post) throw new AppError("Post not found!", 404);

    if (post.author.toString() !== userId) {
      throw new AppError("Unauthorized!", 403);
    }

    let updatedImage = post.imageSrc || "";
    let updatedImageId = post.imageId || "";

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "blog-posts",
        resource_type: "image",
      });

      if (post.imageId) {
        await cloudinary.uploader.destroy(post.imageId);
      }

      updatedImage = result.secure_url;
      updatedImageId = result.public_id;

      await fs.unlink(file.path);
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.imageSrc = updatedImage;
    post.imageId = updatedImageId;

    await post.save();

    const updatedPost = await Post.findById(post._id).populate(
      "author",
      "name profileImage",
    );

    res.status(200).json({
      success: true,
      message: "Post successfully edited",
      post: updatedPost,
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
      isLiked,
    });
  },
);

export const deletePost: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError("User not found!", 404);
    }

    const postId: string = req.params["id"] as string;

    const post = await Post.findById(postId);
    const imgId = post?.imageId;

    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.deletePost(postId, userId);

    res.status(204).json({
      success: true,
      message: "Post deleted successfully!",
    });
  },
);
