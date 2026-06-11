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
import Post from "./pages/Post";
import AccountSettings from "./pages/AccountSettings";
import ChangeName from "./pages/ChangeName";
import ChangePassword from "./pages/ChangePassword";
import ChangeBio from "./pages/ChangeBio";
import ChangeProfileImage from "./pages/ChangeProfile";
import DeleteAccount from "./pages/DeleteAccount";
import ScrollToTop from "./components/scrollToTop";

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
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/post/:id" element={<Post />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/settings" element={<AccountSettings />}>
            <Route path="name" element={<ChangeName />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="bio" element={<ChangeBio />} />
            <Route path="profile-image" element={<ChangeProfileImage />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
