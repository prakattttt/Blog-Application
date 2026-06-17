import { useState, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
// import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

type Props = {
  image: string;
  title: string;
  description: string;
  onClose: () => void;
};

const EditPost = ({ image, title, description, onClose }: Props) => {
  const [postTitle, setPostTitle] = useState(title);
  const [postDescription, setPostDescription] = useState(description);
  const [preview, setPreview] = useState(image);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
    //   const compressedFile = await imageCompression(file, {
    //     maxSizeMB: 4,
    //     maxWidthOrHeight: 1920,
    //     useWebWorker: true,
    //   });
      setPreview(URL.createObjectURL(file));
    } catch {
      toast.error("Failed to compress image");
    }
  };

  const handleSubmit = () => {
    console.log("Edit button clicked!");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-gray-200 shadow-2xl">
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Post</h2>

              <p className="text-sm text-gray-500 mt-1">
                Update your post details
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="relative">
              <div className="w-full h-52 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="absolute bottom-3 right-3 cursor-pointer">
                <div className="bg-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2 popup">
                  <FaImage className="text-gray-700" />

                  <span className="text-sm font-medium text-gray-700">
                    Change
                  </span>
                </div>

                <input type="file" hidden onChange={handleImageChange} />
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>

              <input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Post title"
                className="input"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={5}
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                placeholder="Write something..."
                className="input resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={onClose} className="btn-2">
                Cancel
              </button>

              <button onClick={handleSubmit} className="btn-1">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
