import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Create from "../components/Create";
import Footer from "../components/Footer";

import useWrite from "../hooks/useWrite";
import { WriteProvider } from "../contexts/WriteContext";

const LayoutContent = () => {
  const { isOpen } = useWrite();

  return (
    <>
      <Navbar />

      {isOpen && <Create />}

      <Outlet />
      <Footer />
    </>
  );
};

const MainLayout = () => {
  return (
    <WriteProvider>
      <LayoutContent />
    </WriteProvider>
  );
};

export default MainLayout;
