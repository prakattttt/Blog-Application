import dotenv from "dotenv/config";

import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import connectToDb from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

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
