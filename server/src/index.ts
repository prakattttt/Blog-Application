import dotenv from "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDb from "./config/db.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

import morgan from "morgan"

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/users", userRouter);

app.use("/api/posts", postRouter);

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();
