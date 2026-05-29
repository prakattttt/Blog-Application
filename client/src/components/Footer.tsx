import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const menus = [
  {
    menu: "Home",
    dest: "/",
  },
  {
    menu: "Trending",
    dest: "/trending",
  },
  {
    menu: "My Posts",
    dest: "/myposts",
  },
  {
    menu: "Bookmarks",
    dest: "/bookmarks",
  },
];

const links = [
  {
    to: "/github",
    icon: FaGithub,
  },
  {
    to: "/twitter",
    icon: FaTwitter,
  },
  {
    to: "/instagram",
    icon: FaInstagram,
  },
  {
    to: "/facebook",
    icon: FaFacebook,
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-black">
              NodeBlog
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-gray-500 max-w-sm">
              A modern blogging platform to share ideas, stories, and knowledge
              with the world.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              Navigation
            </h2>

            <ul className="mt-5 flex flex-col gap-3 text-sm text-gray-500">
              {menus.map((menu) => (
                <li>
                  <Link to={menu.dest} className="hover:text-black transition">
                    {menu.menu}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              Connect
            </h2>

            <div className="mt-5 flex items-center gap-4">
              {links.map((link) => (
                <Link
                  to={link.to}
                  className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  <link.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NodeBlog. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm text-gray-500">
            <Link to="/" className="hover:text-black transition">
              Privacy
            </Link>

            <Link to="/" className="hover:text-black transition">
              Terms
            </Link>

            <Link to="/" className="hover:text-black transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
