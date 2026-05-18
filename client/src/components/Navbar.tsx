import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import Button from "./Button";
import Profile from "./Profile";
import Menus from "./Menus";

type CreateProps = {
  handleClick: () => void;
};

const Navbar = ({ handleClick }: CreateProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 lg:px-15 py-3 shadow-md relative">
      <div className="flex items-center justify-between w-full md:w-auto">
        <span className="text-2xl md:text-3xl font-extrabold">NodeBlog</span>

        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div
        className={`
          w-full md:w-auto
          flex-col md:flex-row
          items-center
          md:gap-8
          md:flex
          ${open ? "flex" : "hidden md:flex"}
        `}
      >
        <Menus />

        <ul className="flex items-center gap-4 md:gap-5 mt-2 md:mt-0">
          <li>
            <Button handleClick={handleClick}/>
          </li>

          <li>
            <Profile />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
