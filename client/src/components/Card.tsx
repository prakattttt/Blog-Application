import type { CardType } from "../types/card.types";
import { FaHeart, FaRegCommentDots, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import { toggleBookmark } from "../api/bookmark.api";
import useAuth from "../hooks/useAuth";

const Card = ({
  id,
  imageSrc,
  userName,
  timeSincePosted,
  header,
  description,
  likes,
  comments,
  isBookmarked,
  profileImg,
  animationDelay = 0,
}: CardType) => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      return;
    }

    try {
      const bookmarked = (await toggleBookmark(id)) as boolean;

      setBookmarked(bookmarked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/post/${id}`)}
      style={{ animationDelay: `${animationDelay}ms` }}
      className="group animate-fade-in-up hover-lift bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col transition-all duration-500"
    >
      {imageSrc ? (
        <div className="overflow-hidden">
          <img
            src={imageSrc}
            alt={`blog-img-${id}`}
            className="w-full h-56 object-cover group-hover:scale-[1.06] transition-transform duration-700"
          />
        </div>
      ) : (
        <div className="h-56 bg-linear-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-500">
              No Cover Image
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Read the story inside
            </div>
          </div>
        </div>
      )}

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-3">
          <img
            src={profileImg}
            className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="leading-tight">
            <h3 className="text-sm font-semibold text-gray-900">{userName}</h3>
            <p className="text-xs text-gray-500">{timeSincePosted}</p>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 transition-all duration-300 group-hover:tracking-[0.2px]">
            {header}
          </h2>

          <div className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-5 text-gray-500 text-sm">
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 hover:text-red-500 transition-all duration-300 hover:scale-110"
            >
              <FaHeart />
              <span>{likes}</span>
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 transition-all duration-300 hover:scale-110 hover:text-black"
            >
              <FaRegCommentDots />
              <span>{comments}</span>
            </button>
          </div>

          <button
            onClick={handleBookmark}
            className={`transition-all duration-300 hover:scale-125 ${
              bookmarked ? "text-black animate-pop" : "text-gray-400"
            }`}
          >
            <FaBookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
