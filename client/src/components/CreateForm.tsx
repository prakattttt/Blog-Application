import { useState } from "react";
import { createPost } from "../api/post.api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import useWrite from "../hooks/useWrite";

type CreateProps = {
  handleClick: () => void;
};

const CreateForm = ({ handleClick }: CreateProps) => {
  const { user } = useAuth();
  const { triggerRefresh } = useWrite();
  const [content, setContent] = useState({ title: "", description: "" });
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 4,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      setImage(compressedFile);
    } catch (error) {
      toast.error("Failed to compress image");
    }
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) return;

    try {
      const formData = new FormData();

      formData.append("title", content.title);
      formData.append("description", content.description);

      if (image) {
        formData.append("image", image);
      }

      const message = await createPost(formData, user._id);

      triggerRefresh();

      handleClick();

      toast.success(message);

      setContent({
        title: "",
        description: "",
      });

      setImage(null);
    } catch (error) {
      toast.error("Failed to create post");
      handleClick();
      console.error("Failed to create post:", error);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="Blogimage"
          className="text-sm md:text-base font-semibold text-gray-700"
        >
          Upload Cover Image
        </label>

        <input
          type="file"
          id="Blogimage"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none text-sm md:text-base transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/20 file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:cursor-pointer file:transition-all file:duration-300 hover:file:scale-[1.025]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm md:text-base font-semibold text-gray-700"
        >
          Blog Title
        </label>

        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your blog title"
          onChange={handleContentChange}
          value={content.title}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/20 text-sm md:text-base"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="content"
          className="text-sm md:text-base font-semibold text-gray-700"
        >
          Content
        </label>

        <textarea
          id="content"
          rows={6}
          name="description"
          placeholder="Share your thoughts..."
          onChange={handleContentChange}
          value={content.description}
          className="border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/20 text-sm md:text-base leading-relaxed"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-3">
        <button type="submit" className="btn-1">
          Publish Post
        </button>

        <button type="button" className="btn-2" onClick={handleClick}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
