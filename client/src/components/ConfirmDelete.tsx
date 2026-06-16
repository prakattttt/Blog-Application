import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { deletePost } from "../api/post.api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmDelete = ({ setShowConfirm }: Props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  if (!id) {
    return;
  }

  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(id);
      toast.success("Post deleted successfully.");
      navigate("/");

    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }

    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-red-100">
            <FaTrashAlt className="text-red-600 text-2xl" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mt-4 text-gray-800">
          Confirm Post Deletion
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Are you sure you want to delete this post?
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 py-3 bg-black text-white rounded-xl disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
