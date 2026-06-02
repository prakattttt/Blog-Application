import type { Content } from "../types/content.types";

export const content: Record<string, Content> = {
  home: {
    type: "home",
    header: "Latest Posts",
    description: "Fresh perspectives from writers around the world",
  },

  trending: {
    type: "trending",
    header: "Trending Posts",
    description: "See what everyone is reading right now",
  },
  bookmarks: {
    type: "bookmarks",
    header: "Bookmarked Posts",
    description: "See what you have bookmarked",
  },
    myPosts: {
    type: "myPosts",
    header: "My Blog Posts",
    description: "See what you have posted",
  },
};

export default content;