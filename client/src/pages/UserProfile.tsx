import { FaCalendarAlt, FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { GetUserPostData } from "../types/users.types";
import { getSpecificPosts } from "../api/post.api";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [data, setData] = useState<GetUserPostData>({
    success: false,
    posts: [],
    userInfo: {
      name: "",
      profileImage: "",
      bio: "",
      createdAt: "",
    },
    totalPosts: 0,
    totalPages: 1,
  });

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const run = async () => {
      try {
        const response = await getSpecificPosts(id, page - 1);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    run();
  }, [id, page, navigate]);

  if (!id) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={data.userInfo.profileImage}
              alt={data.userInfo.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 transition-transform duration-300 hover:scale-105"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {data.userInfo.name}
              </h1>

              <p className="text-gray-500 mt-3 leading-relaxed max-w-2xl">
                {data.userInfo.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 transition hover:bg-gray-100">
                  <FaCalendarAlt className="text-gray-700" />

                  <div>
                    <p className="text-xs text-gray-500">Joined</p>

                    <p className="font-semibold">
                      {data.userInfo.createdAt
                        ? new Date(data.userInfo.createdAt).toDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 transition hover:bg-gray-100">
                  <FaPen className="text-gray-700" />

                  <div>
                    <p className="text-xs text-gray-500">Posts</p>
                    <p className="font-semibold">{data.totalPosts}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Posts by {data.userInfo.name}
            </h2>

            <p className="text-gray-500 mt-2">
              Explore articles published by this author.
            </p>
          </div>

          {data.posts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-200">
              <p className="text-gray-500">No posts found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-bold text-lg leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                      {post.description}
                    </p>

                    <button
                      className="mt-5 text-sm font-semibold text-black hover:underline"
                      onClick={() => navigate(`/post/${post._id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {data.totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 font-semibold">
              {page} / {data.totalPages}
            </span>

            <button
              disabled={page === data.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
