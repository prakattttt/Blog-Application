import Button from "./Button";
import Profile from "./Profile";
import Menus from "./Menus";

const Navbar = () => {
  return (
    <nav className="navbar flex justify-between px-15 items-center shadow-md">
      <div className="flex items-center">
        <span className="text-3xl font-extrabold mr-5">NodeBlog</span>
        <Menus />
      </div>

      <ul className="flex items-center gap-5">
        <li>
          <Button />
        </li>
        <li>
          <Profile />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
