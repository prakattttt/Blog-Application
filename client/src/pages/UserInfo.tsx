import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { setBio as updateBio } from "../api/auth.api";
import { uploadProfileImage } from "../api/auth.api";

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [bio, setBio] = useState("");

  if (!location.state?.fromRegister) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size greater than 4MB");
      return;
    }

    setImage(file);

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
  };

  const handleSubmit = async () => {
    const id: string | undefined = location.state?.id as string | undefined;

    if (!id) {
      toast.error("Cannot get the registered user!");
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

        <div className="mt-8 flex flex-col items-center">
          <label className="relative group cursor-pointer">
            <input type="file" accept="image/*" hidden onChange={handleImage} />

            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 transition group-hover:opacity-80"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 transition group-hover:bg-gray-200">
                <FiUpload className="text-3xl text-gray-500" />
              </div>
            )}
          </label>

          <p className="text-sm text-gray-500 mt-3">Upload profile image</p>
        </div>

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
            disabled={!image && !bio.trim()}
            className="flex-1 bg-black text-white rounded-2xl py-3 font-semibold hover:scale-[1.02] active:scale-95 transition disabled:opacity-80 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
