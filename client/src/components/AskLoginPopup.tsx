import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLogIn } from "react-icons/fi";

interface PopupProps {
    toggle: () => void
}

const AskLoginPopup = ({ toggle }: PopupProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-gray-500 mt-2 text-sm md:text-base mb-5">
        Please login to create a blog post.
      </p>

      <div className="flex items-center gap-3">
        <button
          className="btn-2 flex items-center justify-center gap-1"
          onClick={toggle}
        >
          <FiArrowLeft className="text-[18px]" />
          <span>Back</span>
        </button>

        <button
          className="btn-1 flex items-center justify-center gap-2"
          onClick={() => navigate("/login")}
        >
          <FiLogIn className="text-[18px]" />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default AskLoginPopup;
