import { model, Schema, Types } from "mongoose";

interface IComment {
  text: string;

  user: Types.ObjectId;

  post: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: [true, "Comment is required!"],
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = model<IComment>("Comment", CommentSchema);
