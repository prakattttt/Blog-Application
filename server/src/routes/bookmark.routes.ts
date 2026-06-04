import express from "express";
import { toggleBookMark, getBookmarkedPosts } from "../controllers/bookmark.controllers.js";

import type { Router } from "express";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/", authenticateUser, getBookmarkedPosts);

router.post("/toggle/:id", authenticateUser, toggleBookMark);

export default router;