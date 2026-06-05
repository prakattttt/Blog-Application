import api from "./axios";

export const toggleBookmark = async (postId: string) => {
  const response = await api.post(`/bookmarks/toggle/${postId}`);

  if (response.data.success) {
    return response.data.bookmarked as boolean;
  }

  return false;
};

export const getBookmarkedPosts = async (skip: number = 0) => {
  const response = await api.get(`/bookmarks?skip=${skip}`);

  if (response.data.success) {
    return response.data;
  }
};

export const getIsBookmarked = async (id: string) => {
  const response = await api.get(`/bookmarks/${id}`);

  if (response.data.success) {
    return response.data.isBookmarked;
  }
};
