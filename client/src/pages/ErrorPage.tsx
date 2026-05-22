import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-black">404</h1>

        <p className="mt-4 text-xl font-semibold text-gray-800">
          Page not found
        </p>

        <p className="mt-2 text-sm text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:scale-105 active:scale-95 transition"
          >
            <FiArrowLeft />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            <FiHome />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
