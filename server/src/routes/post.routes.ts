import express from "express";
import { getAllPosts, getPosts, createPost } from "../controllers/post.controllers.js";

import type { Router } from "express";

const router: Router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPosts);

router.post("/:id", createPost);

export default router;