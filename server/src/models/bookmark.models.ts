import { model, Schema, Types } from "mongoose";

interface IBookmark {
  user: Types.ObjectId;

  post: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
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

export const Bookmark = model<IBookmark>("Bookmark", BookmarkSchema);
