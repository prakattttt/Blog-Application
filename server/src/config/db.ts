import mongoose from "mongoose";
import { DB_URL } from "./env.js";

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database!");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected!");
});

const connectToDb = async () => {
  try {
    if (!DB_URL) {
      throw new Error("DB connection string is missing!");
    }
    await mongoose.connect(DB_URL);
  } catch (err) {
    console.error("Unable to connect to database:", err);
    process.exit(1);
  }
};

export default connectToDb;
