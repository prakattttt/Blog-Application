import { useRef } from "react";
import type { CommentItem } from "../types/comment.types";
import profile from "../assets/profile.png"

type Props = {
  item: CommentItem;
  userId?: string;
  editCommentId: string;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
  setEditCommentId: React.Dispatch<React.SetStateAction<string>>;
  handleEditComment: (id: string, text: string) => void;
  handleEdit: () => void;
  handleDeleteComment: (id: string) => void;
  editLoading: boolean;
  animationDelay?: number;
};

const CommentCard = ({
  item,
  userId,
  editCommentId,
  editedText,
  setEditedText,
  setEditCommentId,
  handleEditComment,
  handleEdit,
  handleDeleteComment,
  editLoading,
  animationDelay = 0,
}: Props) => {
  const editRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div
      style={{ animationDelay: `${animationDelay}ms` }}
      className="flex gap-4 animate-fade-in-up"
    >
      <img
        src={item.user.profileImage || profile}
        alt="comment-profile"
        className="w-11 h-11 rounded-full object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="container">
        <div className="bg-gray-100 rounded-2xl px-4 py-3 flex-1 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm">
          <h3 className="font-bold text-sm text-black">{item.user.name}</h3>

          <div className="text-sm text-gray-600 mt-1 leading-relaxed">
            {editCommentId === item._id ? (
              <>
                <textarea
                  ref={editRef}
                  className="animate-scale-in border border-gray-300 rounded-2xl p-4 text-sm outline-none resize-none overflow-hidden w-full min-h-13"
                  value={editedText}
                  onChange={(e) => {
                    setEditedText(e.target.value);
                    autoResize(e.target);
                  }}
                />

                <div className="flex gap-3 mt-2">
                  <button
                    className="bg-black text-white rounded-xl px-4 py-2 text-xs"
                    onClick={handleEdit}
                    disabled={editLoading}
                  >
                    {editLoading ? "Saving..." : "Save"}
                  </button>

                  <button
                    className="border rounded-xl px-3 py-1 text-xs"
                    onClick={() => {
                      setEditCommentId("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <span>{item.text}</span>
            )}
          </div>
        </div>

        {item.user._id === userId && editCommentId !== item._id && (
          <div className="flex gap-3 ml-4 mt-2 animate-fade-in">
            <span
              className="mini-click text-blue-500 hover:scale-105 transition-all duration-200"
              onClick={() => handleEditComment(item._id, item.text)}
            >
              Edit
            </span>

            <span
              className="mini-click text-red-500 hover:scale-105 transition-all duration-200"
              onClick={() => handleDeleteComment(item._id)}
            >
              Delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
