import express from "express";
import { getPostComments, writeComment, deleteComment } from "../controllers/comment.controllers.js";

import type { Router } from "express";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/:id", getPostComments);

router.post("/write/:id", authenticateUser, writeComment);

router.delete("/delete/:id", authenticateUser, deleteComment);

export default router;