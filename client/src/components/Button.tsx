import { SlNote } from "react-icons/sl";
import useWrite from "../hooks/useWrite";

const Button = () => {
  const { toggle } = useWrite();

  return (
    <button
      className="bg-black text-white rounded-xl py-2 px-3 flex items-center gap-2 text-sm lg:text-base hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 lg:px-5"
      onClick={toggle}
    >
      <SlNote />

      <span>Write</span>
    </button>
  );
};

export default Button;
