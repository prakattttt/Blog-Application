import { Bookmark } from "./bookmark.models.js";
import { model, Schema, type Model, Types, isValidObjectId } from "mongoose";
import AppError from "../utils/AppError.js";

interface IPost {
  title: string;
  description: string;
  imageSrc?: string;

  author: Types.ObjectId;

  likes: Types.ObjectId[];

  commentsCount: number;

  createdAt?: Date;
  updatedAt?: Date;
}

interface ReturnedPosts extends IPost {
  isBookmarked: boolean;
}

interface PostBody {
  title: string;
  description: string;
  imageSrc?: string;
  author: string;
}

interface IPostModel extends Model<IPost> {
  createPost(post: PostBody): Promise<{ postId: string; creatorId: string }>;

  getPosts(skip: number, userId: string): Promise<ReturnedPosts[]>;

  getSinglePost(id: string): Promise<IPost>;

  getPostsByAuthor(id: string, skip: number): Promise<ReturnedPosts[]>;

  toggleLike(author: string, postId: string): Promise<boolean>;

  deletePost(id: string): Promise<void>;
}

const PostSchema = new Schema<IPost, IPostModel>(
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

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,

    statics: {
      async createPost(post: PostBody) {
        if (!isValidObjectId(post.author)) {
          throw new AppError("Invalid author ID!", 400);
        }

        const createdPost = await this.create({
          ...post,
          author: new Types.ObjectId(post.author),
        });

        return {
          postId: createdPost._id.toString(),
          creatorId: createdPost.author.toString(),
        };
      },

      async getPosts(skip: number, userId?: string) {
        const posts = await this.find()
          .populate("author", "name profileImage")
          .limit(12)
          .skip(skip * 12)
          .sort({ createdAt: -1 })
          .lean();

        if (!userId) {
          return posts.map((post) => ({
            ...post,
            isBookmarked: false,
          }));
        }

        const bookmark = await Bookmark.findOne({ user: userId })
          .select("posts")
          .lean();

        const bookmarkedPosts = new Set(
          bookmark?.posts.map((id) => id.toString()) || [],
        );

        return posts.map((post) => ({
          ...post,
          isBookmarked: bookmarkedPosts.has(post._id.toString()),
        }));
      },

      async getSinglePost(id: string) {
        if (!isValidObjectId(id)) {
          throw new AppError("Invalid ID!", 400);
        }

        return this.findById(id).populate("author", "name profileImage");
      },

      async getPostsByAuthor(id: string, skip: number) {
        if (!isValidObjectId(id)) {
          throw new AppError("Invalid ID!", 400);
        }

        const posts = await this.find({ author: id })
          .populate("author", "name profileImage")
          .limit(12)
          .skip(skip * 12)
          .sort({ createdAt: -1 })
          .lean();

        if (!id) {
          return posts.map((post) => ({
            ...post,
            isBookmarked: false,
          }));
        }

        const bookmark = await Bookmark.findOne({ user: id })
          .select("posts")
          .lean();

        const bookmarkedPosts = new Set(
          bookmark?.posts.map((id) => id.toString()) || [],
        );

        return posts.map((post) => ({
          ...post,
          isBookmarked: bookmarkedPosts.has(post._id.toString()),
        }));
      },

      async toggleLike(author: string, postId: string) {
        if (!isValidObjectId(author) || !isValidObjectId(postId)) {
          throw new AppError("Invalid ID!", 400);
        }

        const authorId = new Types.ObjectId(author);

        const post = await this.findById(postId);

        if (!post) {
          throw new AppError("Post not found!", 404);
        }

        const alreadyLiked = post.likes.some((user) => user.equals(authorId));

        if (alreadyLiked) {
          post.likes = post.likes.filter((user) => !user.equals(authorId));

          await post.save();

          return false;
        }

        post.likes.push(authorId);

        await post.save();

        return true;
      },

      async deletePost(id: string) {
        if (!isValidObjectId(id)) {
          throw new AppError("Invalid ID!", 400);
        }

        await this.findByIdAndDelete(id);
      },
    },
  },
);

export const Post = model<IPost, IPostModel>("Post", PostSchema);
