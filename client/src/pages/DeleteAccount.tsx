import toast from "react-hot-toast";
import { deleteUser } from "../api/user.api";
import SettingsPage from "../layouts/SettingsLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isAxiosError } from "axios";

const DeleteAccount = () => {
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleDeletion = async () => {
    try {
      const message = await deleteUser(password);
      navigate("/login");
      toast.success(message);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <SettingsPage
      title="Delete Account"
      description="This action cannot be undone."
    >
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-5">
        <h3 className="font-semibold text-red-600">Permanent Deletion</h3>

        <p className="text-sm text-red-500 mt-2">
          Deleting your account will permanently remove your profile, posts,
          comments, likes, and bookmarks.
        </p>
      </div>

      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="input"
      />

      <button
        className="mt-5 w-full py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700"
        onClick={handleDeletion}
      >
        Delete My Account
      </button>
    </SettingsPage>
  );
};

export default DeleteAccount;
