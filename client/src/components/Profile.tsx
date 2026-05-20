import profile from "../assets/profile.jpg";
import useAuth from "../hooks/useAuth";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <img
      src={profile}
      alt="profile"
      className="w-10 h-10 md:w-10 rounded-full object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 lg:w-12 lg:h-12"
    />
  ) : (
    <Link to={"/login"} className="w-10 h-10 md:w-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-300">
      <FiUser className="text-lg md:text-xl text-black" />
    </Link>
  );
};

export default Profile;
