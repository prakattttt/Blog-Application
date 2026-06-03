import express from "express";
import { toggleBookMark } from "../controllers/bookmark.controllers.js";

import type { Router } from "express";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/bookmarks",  authenticateUser, toggleBookMark);

router.post("/bookmarks/toggle/:id",  authenticateUser, toggleBookMark);

export default router;