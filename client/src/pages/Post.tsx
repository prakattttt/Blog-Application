import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaHeart, FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

import { getSinglePost } from "../api/post.api";
import Loader from "../components/Loader";
import profile from "../assets/profile.png";
import type { PostCard } from "../types/posts.types";

import Comments from "../components/Comments";

const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    async function run() {
      try {
        if (!id) return;

        const data = await getSinglePost(id);

        setPost(data);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div
            className={`flex items-center gap-4 px-6 ${post.imageSrc ? "py-5" : "py-3"}`}
          >
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
              <p
                className={`text-gray-600 leading-relaxed text-[15px] ${
                  !expanded && "line-clamp-5"
                }`}
              >
                {post.description}
              </p>

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
                <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
                  <FaHeart className="text-2xl" />
                  <span>{post.likes.length}</span>
                </button>

                <button 
                onClick={() => setShowComments(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-black transition">
                  <FaRegCommentDots className="text-2xl" />
                  <span>{post.commentsCount}</span>
                </button>
              </div>

              <button className="text-gray-700 hover:text-black transition">
                <FaRegBookmark className="text-2xl" />
              </button>
            </div>
            <Comments showComments={showComments} profile={profile}/>
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
