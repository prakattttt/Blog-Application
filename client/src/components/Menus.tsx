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
              `flex items-center gap-3 p-4 hover:cursor-pointer ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            <m.icon />
            {m.menu}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
