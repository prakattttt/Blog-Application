import { formatDistanceToNow } from "date-fns";
import profile from "../assets/profile.png";
import Card from "./Card";
import Loader from "./Loader";
import type { CardsProps } from "../types/posts.types";

const Cards = ({ posts, loading }: CardsProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 cursor-pointer animate-fade-in">
      {posts.map((post, idx) => (
        <Card
          key={post._id}
          animationDelay={idx * 80}
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
          isBookmarked={post.isBookmarked}
        />
      ))}
    </div>
  );
};

export default Cards;
