import profile from "../assets/profile.png";
import useAuth from "../hooks/useAuth";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";

const Profile = () => {
  const { isLoggedIn, user, loading } = useAuth();

  const [openDropdown, setOpenDropdown] = useState(false);

  if (loading) {
    return (
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  const profileImage = user?.profileImage ? user.profileImage : profile;

  return (
    <>
      {isLoggedIn ? (
        <div className="relative flex items-center justify-center">
          <div className="relative group flex items-center justify-center">
            <img
              src={profileImage}
              alt="profile"
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="w-10 h-10 md:w-10 lg:w-12 lg:h-12 rounded-full object-cover cursor-pointer hover:scale-105 transition-all duration-300"
            />

            {!openDropdown && (
              <span className="hover-info">
                <div className="mini-arrow"></div>
                Profile
              </span>
            )}
          </div>

          {openDropdown && (
            <Dropdown closeDropdown={() => setOpenDropdown(false)} />
          )}
        </div>
      ) : (
        <div className="relative group flex items-center justify-center">
          <Link
            to={"/login"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-300"
          >
            <FiUser className="text-lg md:text-xl text-black" />
          </Link>

          <span className="hover-info">
            <div className="mini-arrow"></div>
            Login
          </span>
        </div>
      )}
    </>
  );
};

export default Profile;
