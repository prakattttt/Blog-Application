import { useState } from "react";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { changePassword } from "../api/user.api";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  newPassword: string;
};

const ConfirmPasswordChange = ({ setShowConfirm, newPassword }: Props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    setLoading(true);

    try {
      const message = await changePassword(newPassword);

      toast.success(message);
      navigate("/settings");
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error.message || "Something went wrong");
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
            <FaLock className="text-red-600 text-2xl" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mt-4 text-gray-800">
          Confirm Password Change
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Are you sure you want to change your password?
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
            onClick={handleChangePassword}
            className="flex-1 py-3 bg-black text-white rounded-xl disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordChange;
