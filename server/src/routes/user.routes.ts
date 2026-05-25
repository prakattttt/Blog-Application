import express, { Router } from "express";
import { getAllUsers, registerUser, loginUser, logoutUser, getMe, setBio } from "../controllers/user.controllers.js";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/", getAllUsers);

router.get("/me", authenticateUser, getMe);

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/set-bio/:id", setBio)

router.post("/logout", logoutUser)

export default router;