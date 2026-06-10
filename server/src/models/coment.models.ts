import { isValidObjectId, Model, model, Schema, Types } from "mongoose";
import AppError from "../utils/AppError.js";
import { Post } from "./post.models.js";

interface IComment {
  text: string;

  user: Types.ObjectId;

  post: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

interface PopulatedComment extends IComment {
  name: string;
  profileImage: string;
}

interface ICommentModel extends Model<IComment> {
  getPostComments(id: string): Promise<PopulatedComment[]>;

  addPostComment(
    user: string,
    post: string,
    comment: string,
  ): Promise<PopulatedComment[]>;

  deletePostComment(user: string, comment: string): Promise<void>;
}

const CommentSchema = new Schema<IComment, ICommentModel>(
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

    statics: {
      async getPostComments(id: string) {
        if (!isValidObjectId(id)) {
          throw new AppError("Invalid ID!", 400);
        }

        const postID = new Types.ObjectId(id);

        const comments = await this.find({ post: postID }).populate(
          "user",
          "name profileImage",
        );

        return comments;
      },

      async addPostComment(user: string, post: string, comment: string) {
        if (!isValidObjectId(user) || !isValidObjectId(post)) {
          throw new AppError("Invalid ID!", 400);
        }

        const userID = new Types.ObjectId(user);
        const postID = new Types.ObjectId(post);

        await this.create({
          text: comment.trim(),
          user: userID,
          post: postID,
        });

        const comments = await this.find({ post: postID }).populate(
          "user",
          "name profileImage",
        );

        const posts = await Post.findById(postID);
        
        if(!posts) throw new AppError("Unable to fetch posts!", 400);

        posts.commentsCount++;

        await posts.save();

        return comments;
      },

      async deletePostComment(user: string, comment: string) {
        if (!isValidObjectId(user) || !isValidObjectId(comment)) {
          throw new AppError("Invalid ID!", 400);
        }

        const deletedComment = await this.findOneAndDelete({
          _id: comment,
          user,
        });

        if (!deletedComment) {
          throw new AppError(
            "Comment not found or you don't have permission to delete it",
            404,
          );
        }
      },
    },
  },
);

export const Comment = model<IComment, ICommentModel>("Comment", CommentSchema);
