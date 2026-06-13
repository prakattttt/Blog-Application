import { isValidObjectId, model, Schema, type Model } from "mongoose";
import AppError from "../utils/AppError.js";
import validator from "validator";
import bcrypt from "bcryptjs";

import type { Types } from "mongoose";

import { Bookmark } from "./bookmark.models.js";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  bio?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface IUserModel extends Model<IUser> {
  getUsers(skip: number): Promise<IUser[] | null>;

  findUser(id: string): Promise<IUser | null>;

  registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<{ id: string }>;

  loginUser(
    email: string,
    password: string,
  ): Promise<{ success: boolean; id: string }>;

  verifyPassword(id: string, password: string): Promise<boolean>;

  setBio(id: string, bio: string): Promise<void>;

  deleteUser(id: string): Promise<void>;
}

const UserSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value: string) => /^[a-zA-Z\s]+$/.test(value),
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: (value: string) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
          }),
      },
    },

    bio: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,

    statics: {
      async getUsers(skip: number = 0) {
        return this.find()
          .limit(12)
          .skip(skip * 12)
          .select("-password");
      },

      async findUser(id: string) {
        return this.findById(id).select("-password");
      },

      async registerUser(name: string, email: string, password: string) {
        const existingUser = await this.findOne({ email });

        if (existingUser) {
          throw new AppError("Email already exists!", 409);
        }

        const user = await this.create({
          name,
          email,
          password,
        });

        return {
          id: user._id.toString(),
        };
      },

      async loginUser(email: string, password: string) {
        const user = await this.findOne({ email }).select("+password");

        if (user?.deletedAt) {
          throw new AppError("This account has been deleted", 403);
        }

        if (!user) {
          throw new AppError(`Cannot find the user with email ${email}`, 400);
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
          throw new AppError(`Invalid password. Please try again!`, 401);
        }

        return {
          success: true,
          id: user._id.toString(),
        };
      },

      async verifyPassword(id: string, password: string) {
        if (!isValidObjectId(id)) throw new AppError("Invalid Id", 400);

        const user = await this.findById(id).select("+password");

        if (!user) throw new AppError("User not found!", 400);

        const isMatched = await bcrypt.compare(password, user.password);

        return isMatched;
      },

      async setBio(id: string, bio: string) {
        if (!isValidObjectId(id)) throw new AppError("Invalid Id", 400);

        const user = await this.findById(id);

        if (!user) throw new AppError("User not found!", 400);

        user.bio = bio;

        await user.save();
      },

      async deleteUser(id: string) {
        if (!isValidObjectId(id)) throw new AppError("Invalid Id", 400);

        const user = await this.findById(id);

        if (!user) throw new AppError("User not found!", 400);

        await this.findByIdAndUpdate(id, {
          name: "Deleted User",
          email: `deleted_${id}@deleted.local`,
          bio: "",
          profileImage: "",
          deletedAt: new Date(),
        });

        await Bookmark.deleteMany({ user: id });
      },
    },
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = model<IUser, IUserModel>("User", UserSchema);
