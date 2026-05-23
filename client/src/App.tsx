import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Bookmarks from "./pages/Bookmarks";
import MyPosts from "./pages/MyPosts";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import useAuth from "./hooks/useAuth";
import UserInfo from "./pages/UserInfo";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "14px",
            padding: "14px",
            fontSize: "14px",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/myposts" element={<MyPosts />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
