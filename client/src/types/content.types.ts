export interface Content {
  type: "home" | "myPosts" | "bookmarks" | "trending",
  header: string;
  description: string;
}
