import { model, Schema, type Model } from "mongoose";
import AppError from "../utils/AppError.js";
import validator from "validator";
import bcrypt from "bcryptjs";

import type { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserModel extends Model<IUser> {
  getUsers(skip: number): Promise<IUser[]>;
  registerUser(
    name: string,
    email: string,
    pasword: string,
  ): Promise<{ success: boolean; id: string }>;
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

      async registerUser(name: string, email: string, password: string) {
        const existingUser = await this.findOne({ email });

        if (existingUser) {
          throw new AppError("Email already exists!", 409);
        }

        const registeredUser = await this.create({
          name,
          email,
          password,
        });

        return {
          success: true,
          id: registeredUser._id,
        };
      },
    },
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = model<IUser, IUserModel>("User", UserSchema);
