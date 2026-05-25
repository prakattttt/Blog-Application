import express from "express";
import { getAllPosts, getPosts, createPost, deletePost } from "../controllers/post.controllers.js";

import type { Router } from "express";

const router: Router = express.Router();

router.get("/", getAllPosts);

router.get("/me/:id", getPosts);

router.post("/:id", createPost);

router.delete("/:id", deletePost);

export default router;