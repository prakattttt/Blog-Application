import express from "express";
import { getAllPosts, getPosts, getSinglePost, createPost, deletePost } from "../controllers/post.controllers.js";

import type { Router } from "express";
import upload from "../middlewares/multer.js";

const router: Router = express.Router();

router.get("/", getAllPosts);

router.get("/me/:id", getPosts);

router.get("/:id", getSinglePost);

router.post("/:id", upload.single("image"), createPost);

router.delete("/:id", deletePost);

export default router;