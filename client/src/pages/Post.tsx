import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import { getSinglePost } from "../api/post.api";
import Loader from "../components/Loader";
import profile from "../assets/profile.png";
import useAuth from "../hooks/useAuth";
import type { PostCard } from "../types/posts.types";
import { toggleLike } from "../api/post.api";
import ReactMarkdown from "react-markdown";

import Comments from "../components/Comments";
import { getIsBookmarked, toggleBookmark } from "../api/bookmark.api";
import toast from "react-hot-toast";
import Options from "../components/Options";

const Post = () => {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();

  const [post, setPost] = useState<PostCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [options, setOptions] = useState(false);

  const myPost = user?._id.toString() === post?.author._id.toString();

  useEffect(() => {
    async function run() {
      try {
        if (!id) return;

        const data = await getSinglePost(id);

        if (user) {
          const bookmark = await getIsBookmarked(id);
          setIsBookmarked(bookmark);
        }

        setPost(data);

        if (user?._id) {
          setIsLiked(data.likes.includes(user._id));
        }
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [id, user]);

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const toggleOptions = async () => {
    setOptions((prev) => !prev);
  };

  const handleLike = async () => {
    if (!id || !post) return;

    try {
      const liked = (await toggleLike(id)) as boolean;

      setIsLiked(liked);

      setPost((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          likes: liked
            ? [...prev.likes, user!._id]
            : prev.likes.filter((likeId) => likeId !== user!._id),
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async () => {
    if (!id || !post) return;

    if (!isLoggedIn) {
      toast.error("Please login to bookmark the post!");
      return;
    }

    try {
      const bookmarked = (await toggleBookmark(id)) as boolean;

      setIsBookmarked(bookmarked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4 px-6 py-3">
              <img
                src={post.author.profileImage || profile}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />

              <div>
                <h2 className="font-bold text-black">{post.author.name}</h2>

                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {myPost && (
              <PiDotsThreeOutlineFill
                size={24}
                className="mx-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOptions();
                }}
              />
            )}
            {options && (
              <Options
                onClose={() => setOptions(false)}
              />
            )}
          </div>

          {post.imageSrc && (
            <img
              src={post.imageSrc}
              alt="post"
              className="w-full max-h-125 object-cover"
            />
          )}

          <div className={`${post.imageSrc ? "p-6" : "px-6"}`}>
            <h1 className="text-3xl font-extrabold leading-tight text-black">
              {post.title}
            </h1>

            <div className="mt-4">
              <div
                className={`text-gray-800 prose max-w-none whitespace-pre-wrap ${
                  !expanded && "line-clamp-5"
                }`}
              >
                <ReactMarkdown>{post.description}</ReactMarkdown>
              </div>

              {post.description.length > 250 && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-2 text-sm font-semibold text-black hover:underline"
                >
                  {expanded ? "Show Less" : "Expand More"}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between py-6 mt-6 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition ${
                    isLiked
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  {isLiked ? (
                    <FaHeart className="text-2xl" />
                  ) : (
                    <FaRegHeart className="text-2xl" />
                  )}
                  <span>{post.likes.length}</span>
                </button>

                <button
                  onClick={() => setShowComments(true)}
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition"
                >
                  <FaRegComment className="text-2xl" />
                  <span>{post.commentsCount}</span>
                </button>
              </div>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 ${
                  isBookmarked ? "text-black" : "text-gray-700 hover:text-black"
                }`}
              >
                {isBookmarked ? (
                  <FaBookmark className="text-2xl" />
                ) : (
                  <FaRegBookmark className="text-2xl" />
                )}
              </button>
            </div>
            <Comments
              showComments={showComments}
              postID={id ?? ""}
              onCommentAdded={() =>
                setPost((prev) =>
                  prev
                    ? { ...prev, commentsCount: prev.commentsCount + 1 }
                    : prev,
                )
              }
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-black transition flex items-center gap-1"
          >
            <FiArrowLeft size={20} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
