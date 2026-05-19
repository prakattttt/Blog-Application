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
    <ul className="flex flex-col items-center gap-2 text-lg ml-10">
      {menus.map((m) => (
        <li key={m.dest} className="relative group text-base lg:text-lg">
          <NavLink
            to={m.dest}
            className={({ isActive }) =>
              `
              flex items-center gap-3 py-2
              transition-all duration-500 ease-out
              ${
                isActive
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }
              `
            }
          >
            <m.icon className="transition-transform duration-500 group-hover:rotate-6" />
            {m.menu}
          </NavLink>

          <span
            className="
              absolute left-0 -bottom-1 h-0.5 w-0
              bg-black
              transition-all duration-500
              group-hover:w-full
            "
          />
        </li>
      ))}
    </ul>
  );
};

export default Menus;
