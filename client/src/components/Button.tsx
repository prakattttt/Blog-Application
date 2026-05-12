import { SlNote } from "react-icons/sl";

const Button = () => {
  return (
    <button className="bg-black text-white rounded-lg py-2 px-4 flex items-center gap-2 hover:cursor-pointer popup">
      <SlNote />
      Write
    </button>
  );
};

export default Button;
