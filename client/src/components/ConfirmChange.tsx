import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { verifyPassword } from "../api/auth.api";
import toast from "react-hot-toast";
import { changeName } from "../api/user.api";
import useAuth from "../hooks/useAuth";

type Props = {
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const ConfirmChange = ({ setShowConfirm, name, setName }: Props) => {
  const { setUser } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!password.trim()) return;

    setLoading(true);

    try {
      const isVerified = await verifyPassword(password);

      if (!isVerified) {
        toast.error("Invalid Password! Please try again.");
        return;
      }

      const message = await changeName(name);

      setUser((prev: any) => ({
        ...prev,
        name: name,
      }));

      setName("");

      setShowConfirm(false);

      toast.success(message);
      
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-blue-100">
            <FaLock className="text-blue-600 text-2xl" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mt-4 text-gray-800">
          Confirm Changes
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Enter your password to save profile changes.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="input mt-4"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleConfirm}
            className="flex-1 py-3 bg-black text-white rounded-xl disabled:opacity-50"
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmChange;
