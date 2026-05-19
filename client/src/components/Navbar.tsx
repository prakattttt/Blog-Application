import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import Button from "./Button";
import Profile from "./Profile";
import Menus from "./Menus";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl md:text-[26px] font-black tracking-tight cursor-pointer">
            NodeBlog
          </span>

          <div className="hidden md:flex items-center gap-8">
            <Menus />

            <ul className="flex items-center gap-2 lg:gap-4">
              <li>
                <Button />
              </li>

              <li>
                <Profile />
              </li>
            </ul>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden text-3xl text-black"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-6 flex flex-col items-center gap-4 pb-4 animate-[fadeIn_0.2s_ease]">
            <Menus />

            <div className="flex items-center gap-2">
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
