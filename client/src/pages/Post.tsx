import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegCommentDots, FaRegBookmark } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

import profile from "../assets/profile.jpg";
import postImg from "../assets/profile.jpg";

import dummyComments from "../dummy";

const Post = () => {
  const [expanded, setExpanded] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <img
                src={profile}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />

              <div>
                <h2 className="font-bold text-black text-sm md:text-base">
                  John Doe
                </h2>

                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>

          <img
            src={postImg}
            alt="post"
            className="w-full max-h-120 object-cover"
          />

          <div className="p-6">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight text-black">
                Building a Modern MERN Stack Blog Application
              </h1>

              <div className="mt-4">
                <p
                  className={`text-gray-600 leading-relaxed text-[15px] ${
                    !expanded && "line-clamp-5"
                  }`}
                >
                  In this blog, we explore how to build a modern full-stack blog
                  application using MongoDB, Express.js, React, Node.js, and
                  TypeScript. We will also integrate authentication, image
                  upload, responsive UI design, protected routes, scalable
                  backend architecture, JWT authentication, reusable React
                  components, protected APIs, cloud image storage, bookmarking,
                  commenting systems, and modern UI/UX practices for
                  production-ready applications that scale efficiently in
                  real-world environments.
                </p>

                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-2 text-sm font-semibold text-black hover:underline cursor-pointer"
                >
                  {expanded ? "Show Less" : "Expand More"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
                  <FaRegHeart className="text-2xl" />
                  <span className="font-medium">324</span>
                </button>

                <button
                  onClick={() => setShowComments((prev) => !prev)}
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition"
                >
                  <FaRegCommentDots className="text-2xl" />
                  <span className="font-medium">18</span>
                </button>
              </div>

              <button className="text-gray-700 hover:text-black transition">
                <FaRegBookmark className="text-2xl" />
              </button>
            </div>

            {showComments && (
              <div className="mt-6 pt-6 border-t border-gray-200 animate-[fadeIn_0.2s_ease]">
                <div className="flex flex-col gap-5">
                  {dummyComments.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={profile}
                        alt="comment-profile"
                        className="w-11 h-11 rounded-full object-cover"
                      />

                      <div className="bg-gray-100 rounded-2xl px-4 py-3 flex-1">
                        <h3 className="font-bold text-sm text-black">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
                  />

                  <button className="px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:scale-[1.02] active:scale-95 transition">
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center flex justify-center items-center">
          <Link
            to="/"
            className="text-md text-gray-600 hover:text-black transition flex items-center gap-1"
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
