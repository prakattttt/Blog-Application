import { useState } from "react";
import dummyComments from "../dummy";

interface commentInterface {
  showComments: boolean;
  profile: string;
}

const Comments = ({ showComments, profile }: commentInterface) => {
  const [comment, setComment] = useState("");
  return (
    <>
      {showComments && (
        <div className="pt-6 pb-8 border-t border-gray-200 animate-[fadeIn_0.2s_ease]">
          <div className="flex flex-col gap-5">
            {dummyComments.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={profile}
                  alt="comment-profile"
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex-1">
                  <h3 className="font-bold text-sm text-black">{item.name}</h3>

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
    </>
  );
};

export default Comments;
