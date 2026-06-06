import express from "express";
import { getPostComments, writeComment } from "../controllers/comment.controllers.js";

import type { Router } from "express";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/:id", getPostComments);

router.post("/:id", authenticateUser, writeComment);

export default router;