import { FaRegCommentDots } from "react-icons/fa";
import CommentInput from "./CommentInput";

type Props = {
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleComment: () => void;
};

const EmptyComments = ({ newComment, setNewComment, handleComment }: Props) => {
  return (
    <div className="p-4 border-t border-gray-200 animate-[fadeIn_0.2s_ease]">
      <div className="flex flex-col items-center justify-center py-5 text-center">
        <div className="w-13 h-13 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FaRegCommentDots className="text-2xl text-gray-400" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">No comments yet</h3>

        <p className="mt-1 text-sm text-gray-500">
          Be the first to share your thoughts.
        </p>
      </div>

      <CommentInput
        value={newComment}
        setValue={setNewComment}
        onSubmit={handleComment}
      />
    </div>
  );
};

export default EmptyComments;
