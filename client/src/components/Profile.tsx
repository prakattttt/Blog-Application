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

  const name = user?.name?.trim()?.split(" ")?.[0] || "Guest";

  return (
    <>
      {isLoggedIn ? (
        <div className="relative flex flex-col items-center w-20">
          <img
            src={profileImage}
            alt="profile"
            onClick={() => setOpenDropdown((prev) => !prev)}
            className="w-9 h-9 rounded-full object-cover cursor-pointer hover:scale-105 transition"
          />

          <span className="text-xs text-gray-600 leading-none mt-0.5">
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
        <div className="relative flex flex-col items-center w-20">
          <Link
            to="/login"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition"
          >
            <FiUser className="text-lg" />
          </Link>

          <span className="text-xs text-gray-600 leading-none mt-0.5">
            Login
          </span>
        </div>
      )}
    </>
  );
};

export default Profile;
