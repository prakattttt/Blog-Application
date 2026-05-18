import { SlNote } from "react-icons/sl";

type CreateProps = {
  handleClick: () => void;
};

const Button = ({ handleClick }: CreateProps) => {
  return (
    <button
      className="bg-black text-white rounded-xl py-2 px-4 md:px-5 flex items-center gap-2 text-sm md:text-base hover:cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      <SlNote />

      <span>Write</span>
    </button>
  );
};

export default Button;
