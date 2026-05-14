import express from "express";
import { getAllUsers  } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", getAllUsers);

// router.post("/register", registerUser)

// router.post("/login", loginUser)

// router.post("/logout", logoutUser)

