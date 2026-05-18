import express, { Router } from "express";
import { getAllUsers, registerUser, loginUser, logoutUser  } from "../controllers/user.controllers.js";
import authenticateUser from "../middlewares/authenticaton.js";

const router: Router = express.Router();

router.get("/users", authenticateUser, getAllUsers);

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

export default router;