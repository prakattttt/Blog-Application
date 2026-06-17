import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

interface UploadProfileProps {
  initialImage?: string;
  onImageSelect: (file: File | null) => void;
}

const UploadProfile = ({ initialImage, onImageSelect }: UploadProfileProps) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      onImageSelect(compressedFile);

      setPreview(URL.createObjectURL(file));
    } catch {
      toast.error("Failed to compress image");
    }
  };

  return (
    <div className="flex flex-col items-center">
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
  );
};

export default UploadProfile;
