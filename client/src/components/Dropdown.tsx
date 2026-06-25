import { FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

type DropdownProps = {
  closeDropdown: () => void;
};

const Dropdown = ({ closeDropdown }: DropdownProps) => {
  const { setIsLoggedIn, setUser, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    try {
      closeDropdown();
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      toast.success("Logout successfull");
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error("Logout failed");
      }
    }
  }

  return (
    <div className="absolute top-15 -left-42 md:right-0 md:translate-x-0 w-60 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl shadow-black/10 p-2 z-100 animate-[fadeIn_0.2s_ease]">
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
      <Link
        to={`profile/${user?._id}`}
        onClick={closeDropdown}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
      >
        <FiUser className="text-xl" />
        User Profile
      </Link>

      <Link
        to="/settings"
        onClick={closeDropdown}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
      >
        <FiSettings className="text-lg" />
        Account Settings
      </Link>

      <button
        onClick={handleLogOut}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
