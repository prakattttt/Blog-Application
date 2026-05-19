import { useContext } from "react";
import { WriteContext } from "../contexts/WriteContext";

const useWrite = () => {
  const write = useContext(WriteContext);

  if(!write) {
    throw new Error("useWrite must be used inside WriteProvider");
  }

  return write;
};

export default useWrite;
