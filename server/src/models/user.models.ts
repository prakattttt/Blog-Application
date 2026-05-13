import { model, Schema } from "mongoose";
import validator from "validator";

interface IUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
  type: String,
  required: [true, "Name is required!"],
  trim: true,
  validate: {
    validator: (value: string) =>
      validator.isAlphanumeric(value),
    message: "Please provide a valid username!",
  },
},

email: {
  type: String,
  required: [true, "Email is required!"],
  unique: true,
  lowercase: true,
  trim: true,
  validate: {
    validator: (value: string) =>
      validator.isEmail(value),
    message: "Please provide a valid email address!",
  },
},

    password: {
      type: String,
      required: [true, "Password is required!"],
      select: false, 
      validate: {
        validator: (value: string) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
          }),
        message:
          "Password must contain uppercase, lowercase, number, and min 8 characters",
      },
    },

    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

export const User = model<IUser>("User", UserSchema);