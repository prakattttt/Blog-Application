import { useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import SettingsPage from "../layouts/SettingsLayout";
import UploadProfile from "../components/UploadProfile";
import { uploadProfileImage } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const ChangeProfileImage = () => {
  const { user, setUser } = useAuth();

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!image || loading) return;

    try {
      setLoading(true);

      const url = await uploadProfileImage(image, user._id);

      setUser((prev) => ({
        ...prev!,
        profileImage: url,
      }));

      navigate("/settings");

      toast.success("Profile image updated!");
    } catch {
      toast.error("Failed to update profile image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsPage
      title="Profile Image"
      description="Upload a new profile picture."
    >
      <div className="flex flex-col items-center gap-6">
        <UploadProfile
          initialImage={user.profileImage}
          onImageSelect={setImage}
        />

        <button
          onClick={handleUpload}
          disabled={!image || loading}
          className="px-5 py-2.5 bg-black text-white rounded-xl font-medium disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </SettingsPage>
  );
};

export default ChangeProfileImage;
