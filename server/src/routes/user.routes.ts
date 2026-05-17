import express, { Router } from "express";
import { getAllUsers, registerUser, loginUser  } from "../controllers/user.controllers.js";

const router: Router = express.Router();

router.get("/users", getAllUsers);

router.post("/register", registerUser)

router.post("/login", loginUser)

// router.post("/logout", logoutUser)

export default router;