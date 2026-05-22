import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Bookmarks from "./pages/Bookmarks";
import MyPosts from "./pages/MyPosts";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
