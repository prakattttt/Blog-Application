import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { setBio as updateBio } from "../api/auth.api";
import { uploadProfileImage } from "../api/auth.api";
import UploadProfile from "../components/UploadProfile";

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [image, setImage] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!location.state?.fromRegister) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const id: string | undefined = location.state?.id as string | undefined;

    if (!id) {
      toast.error("Cannot get the registered user!");
      setIsSubmitting(false);
      navigate("/");
      return;
    }

    try {
      await updateBio({ id, bio });
      if (!image) {
        navigate("/login");
        return;
      }
      await uploadProfileImage(image, id);
      navigate("/login");
    } catch (error) {
      toast.error("Unable to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-black">
          Complete Your Profile
        </h1>

        <p className="text-gray-500 mt-2 text-sm">
          Add a profile picture and short bio.
        </p>

        <UploadProfile onImageSelect={setImage} />

        <div className="mt-8">
          <label className="text-md font-semibold text-gray-700">
            Bio (optional)
          </label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={5}
            className="w-full mt-2 border border-gray-300 rounded-2xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
          />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 border border-gray-300 text-gray-700 rounded-2xl py-3 font-semibold hover:bg-gray-100 active:scale-95 transition"
          >
            Maybe Later
          </button>

          <button
            onClick={handleSubmit}
            disabled={(!image && !bio.trim()) || isSubmitting}
            className="flex-1 bg-black text-white rounded-2xl py-3 font-semibold hover:scale-[1.02] active:scale-95 transition disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
