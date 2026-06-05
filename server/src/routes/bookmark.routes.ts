import express from "express";
import { toggleBookMark, getBookmarkedPosts, getIsBookmarked } from "../controllers/bookmark.controllers.js";

import type { Router } from "express";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/", authenticateUser, getBookmarkedPosts);

router.get("/:id", authenticateUser, getIsBookmarked);

router.post("/toggle/:id", authenticateUser, toggleBookMark);

export default router;