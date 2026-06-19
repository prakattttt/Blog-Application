import { useEffect, useRef, useState } from "react";
import { addPostComments, getPostComments } from "../api/comment.api";
import { FaRegCommentDots } from "react-icons/fa";
import Loader from "./Loader";
import toast from "react-hot-toast";

import type { CommentItem, commentInterface } from "../types/comment.types";
import useAuth from "../hooks/useAuth";
import ConfirmDelete from "./ConfirmDelete";

const Comments = ({
  showComments,
  postID,
  onCommentAdded,
}: commentInterface) => {
  const { isLoggedIn, user } = useAuth();

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [editedText, setEditedText] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState("");

  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const editRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const run = async () => {
      try {
        const fetchedComments = await getPostComments(postID);
        setComments(fetchedComments);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [postID]);

  const handleComment = async () => {
    if (!newComment.trim()) return;

    if (!isLoggedIn) {
      toast.error("Please login to add a comment!");
      setNewComment("");
      return;
    }

    try {
      const createdComment = await addPostComments(postID, newComment);

      onCommentAdded();
      setComments(createdComment);
      setNewComment("");

      // reset textarea height after posting
      if (commentRef.current) {
        commentRef.current.style.height = "52px";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = (id: string, text: string) => {
    setEditCommentId(id);
    setEditedText(text);

    // wait until textarea renders
    setTimeout(() => {
      if (editRef.current) {
        autoResize(editRef.current);
      }
    }, 0);
  };

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  const handleDeleteComment = (id: string) => {
    setDeleteCommentId(id);
  };

  if (loading) {
    return <Loader />;
  }

  if (comments.length === 0 && showComments) {
    return (
      <div className="p-4 border-t border-gray-200 animate-[fadeIn_0.2s_ease]">
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <div className="w-13 h-13 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FaRegCommentDots className="text-2xl text-gray-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No comments yet
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Be the first to share your thoughts.
          </p>
        </div>

        <div className="container">
          <div className="mt-6 flex items-center gap-3">
            <textarea
              ref={commentRef}
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                autoResize(e.target);
              }}
              placeholder="Write a comment..."
              className="border rounded-xl p-4 outline-none transition-all duration-300 border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 resize-none overflow-hidden min-h-13 w-full"
            />

            <button
              className="px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:scale-[1.02] active:scale-95 transition"
              onClick={handleComment}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {deleteCommentId && (
        <ConfirmDelete
          onCancel={() => setDeleteCommentId("")}
          handleDelete={handleDelete}
          loading={false}
          field="Comment"
        />
      )}
      {showComments && (
        <div className="pt-6 pb-8 border-t border-gray-200 animate-[fadeIn_0.2s_ease]">
          <div className="flex flex-col gap-5">
            {comments.map((item) => (
              <div key={item._id} className="flex gap-4">
                <img
                  src={item.user.profileImage}
                  alt="comment-profile"
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div className="container">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 flex-1">
                    <h3 className="font-bold text-sm text-black">
                      {item.user.name}
                    </h3>

                    <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {editCommentId === item._id ? (
                        <>
                          <textarea
                            ref={editRef}
                            className="border border-gray-300 rounded-2xl p-4 text-sm leading-tight outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none overflow-hidden w-full min-h-13"
                            value={editedText}
                            onChange={(e) => {
                              setEditedText(e.target.value);
                              autoResize(e.target);
                            }}
                          />

                          <div className="flex gap-3 mt-2">
                            <button
                              className="bg-black text-white rounded-xl px-4 py-2 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-xs"
                              onClick={handleEdit}
                            >
                              Save
                            </button>

                            <button
                              className="border border-gray-300 rounded-xl px-3 py-1 font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-gray-200 active:scale-[0.98] cursor-pointer text-xs"
                              onClick={() => setEditCommentId("")}
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

                  {item.user._id === user?._id &&
                    editCommentId !== item._id && (
                      <div className="flex gap-3 ml-4 mt-1">
                        <span
                          className="mini-click text-blue-500 hover:text-blue-600"
                          onClick={() => handleEditComment(item._id, item.text)}
                        >
                          Edit
                        </span>

                        <span
                          className="mini-click text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteComment(item._id)}
                        >
                          Delete
                        </span>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <textarea
              ref={commentRef}
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                autoResize(e.target);
              }}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-2xl p-4 text-sm leading-tight outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none overflow-hidden min-h-13"
            />

            <button
              className="px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:scale-[1.02] active:scale-95 transition"
              onClick={handleComment}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
