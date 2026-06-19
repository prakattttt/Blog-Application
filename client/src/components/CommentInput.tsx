type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

const CommentInput = ({ value, setValue, onSubmit }: Props) => {
  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="mt-6 flex items-center gap-3">
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          autoResize(e.target);
        }}
        placeholder="Write a comment..."
        className="flex-1 border border-gray-300 rounded-2xl p-4 text-sm leading-tight outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none overflow-hidden min-h-13"
      />

      <button
        className="px-5 py-3 rounded-2xl bg-black text-white font-semibold hover:scale-[1.02] active:scale-95 transition"
        onClick={onSubmit}
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
