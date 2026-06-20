import dotenv from "dotenv/config";

import mongoose, { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { User } from "../models/user.models.js";
import { Post } from "../models/post.models.js";
import { Comment } from "../models/coment.models.js";
import { Bookmark } from "../models/bookmark.models.js";
import { DB_URL } from "../config/env.js";

// ---------------- TYPES ----------------
interface SeedUser {
  _id: Types.ObjectId;
}

interface SeedPost {
  _id: Types.ObjectId;
  likes: Types.ObjectId[];
}

// ---------------- DB CONNECT ----------------
const connectDB = async (): Promise<void> => {
  if (!DB_URL || !DB_URL.startsWith("mongodb")) {
    throw new Error("Invalid DB_URL");
  }

  await mongoose.connect(DB_URL);
  console.log("MongoDB connected");
};

// ---------------- SAFE HELPERS ----------------

// matches /^[a-zA-Z\s.'-]+$/
const safeName = (): string => {
  const first = faker.person.firstName();
  const last = faker.person.lastName();

  return `${first} ${last}`
    .replace(/[^a-zA-Z\s]/g, "") // REMOVE EVERYTHING except letters & spaces
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();
};

const safePassword = (): string => "Password@123";

const safeEmail = (): string =>
  faker.internet.email().toLowerCase().replace(/\+/g, "");

// ---------------- SEED ----------------
const seed = async (): Promise<void> => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Bookmark.deleteMany({}),
    ]);

    console.log("Old data cleared");

    // ---------------- USERS ----------------
    const users: SeedUser[] = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const user = await User.create({
          name: safeName(),
          email: safeEmail(),
          password: safePassword(),
          bio: faker.person.bio(),
          profileImage: faker.image.avatar(),
        });

        return user as SeedUser;
      }),
    );

    console.log("Users created");

    // ---------------- POSTS ----------------
    const posts: SeedPost[] = await Promise.all(
      Array.from({ length: 20 }).map(async () => {
        const randomUser = users[Math.floor(Math.random() * users.length)]!;

        const post = await Post.create({
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(2),
          imageSrc: faker.image.urlPicsumPhotos(),
          author: randomUser._id,
          likes: [],
          commentsCount: 0,
        });

        return post as SeedPost;
      }),
    );

    console.log("Posts created");

    // ---------------- COMMENTS ----------------
    await Promise.all(
      Array.from({ length: 40 }).map(async () => {
        const user = users[Math.floor(Math.random() * users.length)]!;
        const post = posts[Math.floor(Math.random() * posts.length)]!;

        await Comment.create({
          text: faker.lorem.sentence(),
          user: user._id,
          post: post._id,
        });

        await Post.findByIdAndUpdate(post._id, {
          $inc: { commentsCount: 1 },
        });
      }),
    );

    console.log("Comments created");

    // ---------------- LIKES ----------------
    await Promise.all(
      posts.map(async (post) => {
        const shuffled = [...users].sort(() => 0.5 - Math.random());

        post.likes = shuffled
          .slice(0, faker.number.int({ min: 0, max: 5 }))
          .map((u) => u._id);

        await Post.findByIdAndUpdate(post._id, {
          likes: post.likes,
        });
      }),
    );

    console.log("Likes added");

    // ---------------- BOOKMARKS ----------------
    await Promise.all(
      users.map(async (user) => {
        const randomPosts = posts
          .sort(() => 0.5 - Math.random())
          .slice(0, faker.number.int({ min: 0, max: 5 }));

        await Bookmark.create({
          user: user._id,
          posts: randomPosts.map((p) => p._id),
        });
      }),
    );

    console.log("Bookmarks created");

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
