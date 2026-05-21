import CreateForm from "./CreateForm";
import useWrite from "../hooks/useWrite";
import useAuth from "../hooks/useAuth";
import { FiArrowLeft, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { toggle } = useWrite();

  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease]">
        <div className="p-6 md:p-8">
          {isLoggedIn ? (
            <>
              <div className="mb-5">
                <h2 className="text-2xl md:text-4xl font-extrabold text-black">
                  Create New Blog Post
                </h2>

                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  Share your thoughts, ideas, and stories with the world.
                </p>
              </div>

              <hr className="border-gray-200 mb-5" />

              <CreateForm handleClick={toggle} />
            </>
          ) : (
            <div>
              <p className="text-gray-500 mt-2 text-sm md:text-base mb-5">
                Please login to create a blog post.
              </p>

              <div className="flex items-center gap-3">
                <button className="btn-2 flex items-center justify-center gap-1" onClick={toggle}>
                  <FiArrowLeft className="text-[18px]" />
                  <span>Back</span>
                </button>

                <button className="btn-1 flex items-center justify-center gap-2" onClick={() => navigate("/login")}>
                  <FiLogIn className="text-[18px]" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
