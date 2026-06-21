import express from "express";
import { getAllPosts, getPosts, getSinglePost, createPost, deletePost, toggleLike, getTrendingPosts, editPost, getSpecificPosts } from "../controllers/post.controllers.js";

import type { Router } from "express";
import upload from "../middlewares/multer.js";
import authenticateUser from "../middlewares/authenticaton.js";
import optionalAuth from "../middlewares/optionalAuth.js";

const router: Router = express.Router();

router.get("/", optionalAuth, getAllPosts);

router.get("/trending", optionalAuth, getTrendingPosts);

router.get("/me", authenticateUser, getPosts);

router.get("/:id", getSinglePost);

router.get("/user/:id", getSpecificPosts);

router.post("/:id", upload.single("image"), createPost);

router.patch("/like/:id", authenticateUser, toggleLike);

router.patch("/:id", authenticateUser, upload.single("image"), editPost);

router.delete("/:id", authenticateUser, deletePost);

export default router;