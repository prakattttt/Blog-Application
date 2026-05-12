import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Bookmarks from "./pages/Bookmarks";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
