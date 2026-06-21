import type { GetPostData } from "../types/posts.types";

interface UserInfo {
  name: string;
  profileImage: string;
  bio: string;
  createdAt: string;
}

export interface GetUserPostData extends GetPostData {
  userInfo: UserInfo;
  totalPosts: number;
}