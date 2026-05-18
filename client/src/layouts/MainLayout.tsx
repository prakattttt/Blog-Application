import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Create from "../components/Create";
import { useState } from "react";

const MainLayout = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);

  function onCreateClick() {
    setIsCreate((prev) => !prev);
  }

  return (
    <>
      <Navbar handleClick={onCreateClick}/>
      {isCreate && <Create handleClick={onCreateClick}/>}
      <Outlet />
    </>
  );
};

export default MainLayout;
