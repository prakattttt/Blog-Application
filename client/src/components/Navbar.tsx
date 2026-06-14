import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import Button from "./Button";
import Profile from "./Profile";
import Menus from "./Menus";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
            NodeBlog
          </span>

          <div className="hidden xl:flex items-center gap-10">
            <Menus />

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <Button />
              <Profile />
            </div>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="xl:hidden text-3xl text-gray-800 hover:scale-105 transition-transform"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {open && (
          <div className="xl:hidden mt-4 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-lg p-4 animate-[fadeIn_0.2s_ease]">
            <Menus />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-gray-100">
              <Button />
              <Profile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
