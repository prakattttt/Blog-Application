import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import Button from "./Button";
import Profile from "./Profile";
import Menus from "./Menus";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-gray-200/70 bg-white/85 shadow-sm"
          : "border-transparent bg-white/60 shadow-none"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 md:px-10 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-1">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-[1.03] inline-block">
              NodeBlog
            </span>
            <span className="w-2 h-2 rounded-full bg-black mt-1 ml-0.5 transition-transform duration-500 group-hover:rotate-180 group-hover:bg-gray-600" />
          </Link>

          <div className="hidden xl:flex items-center gap-10">
            <Menus />

            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <Button />
              <Profile />
            </div>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="xl:hidden text-3xl text-gray-800 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`inline-flex transition-transform duration-300 ${
                open ? "rotate-90" : "rotate-0"
              }`}
            >
              {open ? <FiX /> : <FiMenu />}
            </span>
          </button>
        </div>

        {open && (
          <div className="xl:hidden mt-4 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-lg p-4 animate-scale-in origin-top">
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
