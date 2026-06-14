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

  const profileImage = user?.profileImage || profile;
  const name = user?.name.split(" ")[0];

  return (
    <>
      {isLoggedIn ? (
        <div className="relative flex flex-col items-center w-14 translate-x-1">
          <img
            src={profileImage}
            alt="profile"
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition-all duration-300"
          />

          <span className="mt-1 w-full text-center text-[13px] text-gray-600 truncate leading-none">
            {name}
          </span>

          {!openDropdown && (
            <span className="hover-info">
              <div className="mini-arrow"></div>
              Profile
            </span>
          )}
          {openDropdown && (
            <Dropdown closeDropdown={() => setOpenDropdown(false)} />
          )}
        </div>
      ) : (
        <div className="relative group flex items-center justify-center">
          <Link
            to={"/login"}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-300"
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
