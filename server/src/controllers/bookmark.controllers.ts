import expressAsyncHandler from "express-async-handler";

import type { RequestHandler } from "express";
import type { AuthRequest } from "../middlewares/authenticaton.js";
import { Bookmark } from "../models/bookmark.models.js";

export const getBookmarkedPosts: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const user = req.user?.id as string;
    const skip = Number(req.query["skip"]) || 0;

    const bookmarks = await Bookmark.getBookmarks(user, skip);

    const totalPosts = bookmarks?.posts.length ?? 0;

    res.status(200).json({
      success: true,
      posts: bookmarks?.posts ?? [],
      totalPages: Math.ceil(totalPosts / 12),
    });
  },
);

export const getIsBookmarked: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const user = req.user?.id as string;

    const post = req.params["id"] as string;

    const isBookmarked = await Bookmark.checkBookmark(user, post);

    res.status(200).json({
      success: true,
      isBookmarked
    })
  },
);

export const toggleBookMark: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const user: string = req.user?.id as string;

    const post: string = req.params["id"] as string;

    const bookmarked: boolean = await Bookmark.toggleBookmark(user, post);

    res.status(200).json({
      success: true,
      bookmarked,
    });
  },
);
