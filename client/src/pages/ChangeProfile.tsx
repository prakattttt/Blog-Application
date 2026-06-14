import { useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import SettingsPage from "../layouts/SettingsLayout";
import UploadProfile from "../components/UploadProfile";
import { uploadProfileImage } from "../api/auth.api";

const ChangeProfileImage = () => {
  const { user } = useAuth();

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleUpload = async () => {
    if (!image || loading) return;

    try {
      setLoading(true);

      await uploadProfileImage(image, user._id);

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
