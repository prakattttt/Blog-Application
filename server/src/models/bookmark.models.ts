import { isValidObjectId, Model, model, Schema, Types } from "mongoose";
import AppError from "../utils/AppError.js";

interface IBookmark {
  user: Types.ObjectId;

  post: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

interface IBookmarkModel extends Model<IBookmark> {
  toggleBookmark(author: string, post: string): Promise<boolean>;

  getBookmarks(author: string, skip?: number): Promise<IBookmark | null>;
}

const BookmarkSchema = new Schema<IBookmark, IBookmarkModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,

    statics: {
      async toggleBookmark(author: string, post: string) {
        if (!isValidObjectId(author) || !isValidObjectId(post)) {
          throw new AppError("Invalid ID!", 400);
        }

        let bookmark = await this.findOne({ user: author });

        if (!bookmark) {
          bookmark = await this.create({
            user: author,
            post: [],
          });
        }

        const postId = new Types.ObjectId(post);

        const isBookmarked = bookmark.post.some((id) => id.equals(postId));

        if (isBookmarked) {
          bookmark.post = bookmark.post.filter((id) => !id.equals(postId));

          await bookmark.save();

          return false;
        }

        bookmark.post.push(postId);

        await bookmark.save();

        return true;
      },

      async getBookmarks(author: string, skip: number = 0) {
        if (!isValidObjectId(author)) {
          throw new AppError("Invalid ID!", 400);
        }

        const bookmark = await this.findOne({ user: author }).populate({
          path: "post",
          options: {
            skip,
            limit: 12,
            sort: {
              createdAt: -1,
            },
          },
        });

        return bookmark;
      },
    },
  },
);

export const Bookmark = model<IBookmark, IBookmarkModel>(
  "Bookmark",
  BookmarkSchema,
);
