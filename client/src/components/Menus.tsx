import { FaHome, FaBookmark } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import type { Menu } from "../types/menu.types";

const menus: Menu[] = [
  {
    menu: "Home",
    icon: FaHome,
    dest: "/",
  },
  {
    menu: "Trending",
    icon: AiOutlineRise,
    dest: "/trending",
  },
  {
    menu: "Bookmarks",
    icon: FaBookmark,
    dest: "/bookmarks",
  },
];

const Menus = () => {
  return (
    <ul className="flex flex-col md:flex-row items-center gap-1 md:gap-6">
      {menus.map((m) => (
        <li key={m.dest} className="relative group">
          <NavLink
            to={m.dest}
            className={({ isActive }) =>
              `
              flex items-center gap-2 px-4 py-2 rounded-xl
              transition-all duration-300
              text-sm md:text-base font-medium
              ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }
              `
            }
          >
            <m.icon className="text-sm transition-transform duration-300 group-hover:scale-110" />

            <span>{m.menu}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
