import { SlNote } from "react-icons/sl";

const Button = () => {
  return (
    <button className="bg-black text-white rounded-xl py-2 px-4 md:px-5 flex items-center gap-2 text-sm md:text-base hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300">
      <SlNote />

      <span>Write</span>
    </button>
  );
};

export default Button;
