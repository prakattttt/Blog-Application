import type { Content } from "../types/content.types";

export const content: Record<string, Content> = {
  home: {
    header: "Latest Posts",
    description: "Fresh perspectives from writers around the world",
  },

  trending: {
    header: "Trending Posts",
    description: "See what everyone is reading right now",
  },
  bookmarks: {
    header: "Bookmarked Posts",
    description: "See what you have bookmarked",
  },
};

export default content;