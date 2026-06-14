import { FaHome, FaBookmark, FaFileAlt } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const menus = [
  { menu: "Home", icon: FaHome, dest: "/" },
  { menu: "Trending", icon: AiOutlineRise, dest: "/trending" },
  { menu: "My Posts", icon: FaFileAlt, dest: "/myposts" },
  { menu: "Bookmarks", icon: FaBookmark, dest: "/bookmarks" },
];

const Menus = () => {
  return (
    <ul className="flex flex-col md:flex-row items-center gap-2">
      {menus.map((m) => (
        <li key={m.dest}>
          <NavLink
            to={m.dest}
            className={({ isActive }) =>
              `
              group flex items-center gap-2 px-4 py-2 rounded-full
              text-sm font-medium transition-all duration-300
              border border-transparent
              ${
                isActive
                  ? "bg-black text-white shadow-md scale-[1.02]"
                  : "text-gray-600 hover:text-black hover:bg-gray-100 hover:scale-[1.02]"
              }
              `
            }
          >
            <m.icon className="text-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
            <span>{m.menu}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
