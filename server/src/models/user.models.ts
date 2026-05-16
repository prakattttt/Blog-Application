import { model, Schema, type Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserModel extends Model<IUser> {
  getUsers(skip: number): Promise<IUser[]>;
}

const UserSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isAlphanumeric(value),
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
        return this.find().limit(12).skip(skip * 12).select("-password");
      },
    },
  },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = model<IUser, IUserModel>("User", UserSchema);
