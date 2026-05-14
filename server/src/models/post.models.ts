import { model, Schema, Types } from "mongoose";

interface IPost {
  title: string;
  description: string;
  imageSrc?: string;

  author: Types.ObjectId;

  likes: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required!"],
      trim: true,
    },

    imageSrc: {
      type: String,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>("Post", PostSchema);
