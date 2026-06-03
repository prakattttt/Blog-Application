import expressAsyncHandler from "express-async-handler";

import type { RequestHandler } from "express";
import type { AuthRequest } from "../middlewares/authenticaton.js";
import { Bookmark } from "../models/bookmark.models.js";

export const getBookmarkedPosts: RequestHandler = expressAsyncHandler(
  async (req: AuthRequest, res) => {
    const user: string = req.user?.id as string;

    const skip: number = Number(req.query["skip"]) || 0;

    const bookmarks = await Bookmark.getBookmarks(user, skip);

    const bookmarkNumber = await Bookmark.countDocuments({
      author: user,
    });

    res.status(200).json({
      success: true,
      bookmarks,
      totalPages: Math.ceil(bookmarkNumber / 12),
    });
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
