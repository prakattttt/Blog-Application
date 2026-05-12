import { FaHome } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
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
    <ul className="flex text-xl gap-8 ml-10">
      {menus.map((m) => (
        <li key={m.dest}>
          <NavLink
            to={m.dest}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-5 py-3
              transition-all duration-500 ease-out
              hover:scale-105 hover:shadow-md
              ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }
              `
            }
          >
            <m.icon className="transition-transform duration-300 group-hover:rotate-6" />
            {m.menu}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
