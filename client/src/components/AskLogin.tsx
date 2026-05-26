import { FiLock, FiLogIn, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const AskLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
          <FiLock className="text-3xl text-black" />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-black">
          Login Required
        </h1>

        <p className="mt-3 text-gray-500 leading-relaxed">
          You need to login first to access this page and manage your posts.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-2xl py-3 font-semibold text-gray-700 hover:bg-gray-100 active:scale-95 transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <Link
            to="/login"
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-2xl py-3 font-semibold hover:scale-[1.02] active:scale-95 transition"
          >
            <FiLogIn />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskLogin;
