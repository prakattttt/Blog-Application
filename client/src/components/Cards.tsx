import { formatDistanceToNow } from "date-fns";
import profile from "../assets/profile.png";
import Card from "./Card";
import Loader from "./Loader";
import type { CardsProps } from "../types/posts.types";

const Cards = ({ posts, loading }: CardsProps) => {
  if (loading) {
    return <Loader />;
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
          isBookmarked={false}
        />
      ))}
    </div>
  );
};

export default Cards;
