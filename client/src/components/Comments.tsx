import { useEffect, useState } from "react";
import { addPostComments, getPostComments } from "../api/comment.api";
import Loader from "./Loader";

import type { CommentItem, commentInterface } from "../types/comment.types";

const Comments = ({ showComments, postID }: commentInterface) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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
  }, [postID, refresh]);

  const handleComment = async () => {
    await addPostComments(postID, newComment);

    setNewComment("");

    setRefresh((prev) => !prev);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
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

                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex-1">
                  <h3 className="font-bold text-sm text-black">
                    {item.user.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
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
