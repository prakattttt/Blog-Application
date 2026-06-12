import express, { Router } from "express";
import { getAllUsers, registerUser, loginUser, logoutUser, getMe, setBio, uploadProfileImage, deleteUser } from "../controllers/user.controllers.js";
import authenticateUser from "../middlewares/authenticaton.js";
import upload from "../middlewares/multer.js";

const router: Router = express.Router();

router.get("/", getAllUsers);

router.get("/me", authenticateUser, getMe);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/set-bio/:id", setBio);

router.post("/set-profileImage/:id", upload.single("profileImage"), uploadProfileImage);

router.post("/logout", logoutUser);

router.post("/delete", authenticateUser, deleteUser);

export default router;