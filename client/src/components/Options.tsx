import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const Options = ({ onClose, onDelete, onEdit }: Props) => {
  const handleOnEdit = () => {
    onEdit();
  };

  const handleOnDelete = async () => {
    onDelete();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute right-2 top-14 bg-white shadow-lg rounded-xl border border-gray-200 w-44 z-50">
        <div className="relative group">
          <button
            onClick={handleOnEdit}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition"
          >
            <FaEdit />
            Edit Post
          </button>

          <div className="absolute -top-1 right-6 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200 group-hover:bg-gray-100" />
        </div>

        <button
          onClick={handleOnDelete}
          className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-red-50 transition"
        >
          <FaTrash />
          Delete Post
        </button>
      </div>
    </>
  );
};

export default Options;
