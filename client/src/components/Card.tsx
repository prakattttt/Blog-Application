import type { CardType } from "../types/card.types";
import { FaHeart, FaRegCommentDots, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
}: CardType) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/post/${id}`)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {imageSrc ? (
        <div className="overflow-hidden">
          <img
            src={imageSrc}
            alt={`blog-img-${id}`}
            className="w-full h-56 object-cover group-hover:scale-[1.03] transition-transform duration-500"
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
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <h3 className="text-sm font-semibold text-gray-900">{userName}</h3>
            <p className="text-xs text-gray-500">{timeSincePosted}</p>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-black">
            {header}
          </h2>

          <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-5 text-gray-500 text-sm">
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 hover:text-red-500 transition"
            >
              <FaHeart />
              <span>{likes}</span>
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 hover:text-black transition"
            >
              <FaRegCommentDots />
              <span>{comments}</span>
            </button>
          </div>

          <button
            onClick={(e) => e.stopPropagation()}
            className={`transition ${
              isBookmarked ? "text-black" : "text-gray-400 hover:text-black"
            }`}
          >
            <FaBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
