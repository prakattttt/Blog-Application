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
import UserProfile from "./pages/UserProfile";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{ top: 30 }}
        toastOptions={{
          duration: 3000,
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",

            padding: "10px 16px",
            borderRadius: "12px",

            fontSize: "13px",
            fontWeight: "500",

            background: "#ffffff",
            color: "#111827",

            border: "1px solid #e5e7eb",

            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05)",

            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",

            zIndex: 9999,
          },

          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#dcfce7",
            },
            style: {
              borderLeft: "4px solid #16a34a",
            },
          },

          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fee2e2",
            },
            style: {
              borderLeft: "4px solid #dc2626",
            },
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
            <Route path="/profile/:id" element={<UserProfile />} />
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
