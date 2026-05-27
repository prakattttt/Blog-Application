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
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer"
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`blog-img-${id}`}
          className="w-full h-60 object-cover"
        />
      )}

      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <img
            src={profileImg}
            alt={`profile-${id}`}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-sm">{userName}</h3>

            <p className="text-gray-500 text-xs">{timeSincePosted}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3 leading-tight">{header}</h2>

          <p className="text-gray-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <FaHeart />
              <span>{likes}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaRegCommentDots />
              <span>{comments}</span>
            </div>
          </div>

          <button
            onClick={(e) => e.stopPropagation()}
            className={`transition-colors duration-300 ${
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
