import { FaHome } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const menus = [
    {
        menu: "Home",
        icon: <FaHome />,
        dest: "/"
    },
     {
        menu: "Trending",
        icon: <AiOutlineRise />,
        dest: "/trending"
    },
     {
        menu: "Bookmarks",
        icon: <FaBookmark />,
        dest: "/bookmarks"
    },

]

const Menus = () => {
  return (
    <ul className="flex text-xl gap-8 ml-10">
        {menus.map(m => (
            <li className="flex items-center gap-3"><Link to={m.dest} /> 
            {m.icon} {m.menu}</li>
        ))}
    </ul>
  );
};

export default Menus;
