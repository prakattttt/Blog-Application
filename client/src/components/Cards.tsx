import { formatDistanceToNow } from "date-fns";
import profile from "../assets/profile.png";
import Card from "./Card";
import Loader from "./Loader";
import type { CardsProps } from "../types/posts.types";
import { useState, useEffect } from "react";
import { getIsBookmarked } from "../api/bookmark.api";

const Cards = ({ posts, loading }: CardsProps) => {
  const [bookmarkedStatus, setBookmarkedStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    posts?.forEach(async (post) => {
      const isBookmarked = await getIsBookmarked(post._id);
      setBookmarkedStatus((prev) => ({
        ...prev,
        [post._id]: isBookmarked,
      }));
    });
  }, [posts]);

  if (loading) {
    return <Loader />;
  }

  if (!posts) {
    return (
      <div className="text-center py-20 text-gray-500">No posts available.</div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-20 text-gray-500">No posts available.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 cursor-pointer">
      {posts.map((post) => (
        <Card
          key={post._id}
          id={post._id}
          imageSrc={post.imageSrc}
          userName={post.author.name}
          profileImg={post.author.profileImage || profile}
          header={post.title}
          description={post.description}
          likes={post.likes.length}
          comments={post.commentsCount}
          timeSincePosted={formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
          isBookmarked={bookmarkedStatus[post._id]}
        />
      ))}
    </div>
  );
};

export default Cards;
