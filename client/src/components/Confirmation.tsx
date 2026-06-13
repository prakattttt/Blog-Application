import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { deleteUser } from "../api/user.api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

interface Props {
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Confirmation = ({ setShowConfirm }: Props) => {
  const { setIsLoggedIn, setUser } = useAuth();

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");


  useEffect(() => {
    const randomCode = Math.floor(
      10000000 + Math.random() * 90000000,
    ).toString();
    setCode(randomCode);
  }, []);

  const canDelete = input === code;

  const handleDeletion = async () => {
    try {
      const message = await deleteUser();

      setUser(null);
      setIsLoggedIn(false);

      toast.success(message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-red-100 p-8">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-red-100">
            <FaExclamationTriangle className="text-3xl text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mt-4 text-gray-800">
          Delete Account Permanently?
        </h1>

        <p className="text-center text-gray-500 mt-2">
          This action is irreversible. Once deleted, all your data will be lost
          forever.
        </p>

        <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700 font-medium">
            The following will be permanently deleted:
          </p>

          <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
            <li>Your profile</li>
            <li>Posts & comments</li>
            <li>Saved bookmarks</li>
            <li>Account settings</li>
          </ul>
        </div>

        <div className="mt-6 py-4 rounded-xl bg-gray-50 border text-center">
          <span className="font-mono text-2xl tracking-widest font-bold text-red-600">
            {code}
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Type the code above to confirm deletion:
        </p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter verification code"
          className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </button>

          <button
            disabled={!canDelete}
            className={`flex-1 py-3 rounded-xl transition font-medium ${canDelete ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-300 text-white cursor-not-allowed"}`}
            onClick={handleDeletion}
          >
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
