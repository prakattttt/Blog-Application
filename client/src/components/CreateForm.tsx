type CreateProps = {
  handleClick: () => void;
};

const CreateForm = ({ handleClick }: CreateProps) => {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="Blogimage"
          className="text-sm md:text-base font-semibold text-gray-700"
        >
          Cover Image URL
        </label>

        <input
          type="text"
          id="Blogimage"
          placeholder="https://image-url.png"
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/20 text-sm md:text-base"
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
          placeholder="Enter your blog title"
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
          placeholder="Share your thoughts..."
          className="border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black/20 text-sm md:text-base leading-relaxed"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-3">
        <button
          type="submit"
          className="bg-black text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] cursor-pointer"
        >
          Publish Post
        </button>

        <button
          type="button"
          className="border border-gray-300 rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:bg-gray-100 active:scale-[0.98] cursor-pointer"
          onClick={handleClick}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
