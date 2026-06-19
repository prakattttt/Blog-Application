import { FaTrashAlt } from "react-icons/fa";

type Props = {
  onCancel: () => void;
  handleDelete: () => void;
  loading: boolean;
  field: string;
};

const ConfirmDelete = ({ onCancel, handleDelete, loading, field }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-red-100">
            <FaTrashAlt className="text-red-600 text-2xl" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mt-4 text-gray-800">
          {`Confirm ${field} Deletion`}
        </h2>

        <p className="text-gray-500 text-center mt-2">
          {`Are you sure you want to delete this ${field}?`}
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="flex-1 py-3 bg-black text-white rounded-xl disabled:opacity-50"
          >
            {loading ? "Deleting..." : `Delete ${field}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
