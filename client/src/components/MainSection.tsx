import { useEffect, useState } from "react";
import type { Content } from "../types/content.types";
import Pagination from "@mui/material/Pagination";
import Cards from "./Cards";
import { getAllPosts, getAuthorPosts, getTrendingPosts } from "../api/post.api";
import type { GetPostData } from "../types/posts.types";
import useWrite from "../hooks/useWrite";
import { getBookmarkedPosts } from "../api/bookmark.api";

const MainSection = ({ type, header, description }: Content) => {
  const [page, setPage] = useState(1);

  const { refreshPosts } = useWrite();

  const [data, setData] = useState<GetPostData>({
    success: false,
    posts: [],
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        let response;

        switch (type) {
          case "myPosts":
            response = await getAuthorPosts(page - 1);
            break;
          case "bookmarks":
            response = await getBookmarkedPosts(page - 1);
            break;
          case "trending":
            response = await getTrendingPosts(page - 1);
            break;
          default:
            response = await getAllPosts(page - 1);
        }

        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, type, refreshPosts]);

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight">{header}</h1>

        <p className="text-md text-gray-500 mt-3 whitespace-pre-wrap">
          {description}
        </p>
      </div>

      <Cards posts={data.posts} loading={loading} />

      <div className="flex justify-center mt-16">
        <Pagination
          count={data.totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "12px",
              color: "#111827",
              borderColor: "#e5e7eb",
              fontWeight: 600,
              transition: "all 0.25s ease",
            },
            "& .MuiPaginationItem-root:hover": {
              transform: "translateY(-2px)",
              backgroundColor: "#f3f4f6",
              borderColor: "#d1d5db",
            },
            "& .Mui-selected": {
              backgroundColor: "#000 !important",
              color: "#fff !important",
            },
          }}
        />
      </div>
    </section>
  );
};

export default MainSection;
