import api from "./axios";

export const getAllPosts = async (page: number = 0) => {
  const response = await api.get(`/posts?skip=${page}`);

  if (response.data.success) {
    return response.data;
  }
};

export const getTrendingPosts = async (page: number = 0) => {
  const response = await api.get(`/posts/trending?skip=${page}`);

  if (response.data.success) {
    return response.data;
  }
};

export const getAuthorPosts = async (page: number = 0) => {
  const response = await api.get(`/posts/me?skip=${page}`);

  if (response.data.success) {
    return response.data;
  }
};

export const getSinglePost = async (id: string) => {
  const response = await api.get(`/posts/${id}`);

  if (response.data.success) {
    return response.data.posts;
  }
};

export const createPost = async (body: FormData, id: string) => {
  const response = await api.post(`/posts/${id}`, body);

  if (response.data.success) {
    return response.data.message;
  }
};

export const editPost = async (body: FormData, id: string) => {
  const response = await api.patch(`/posts/${id}`, body);

  if (response.data.success) {
    return response.data.message;
  }
};

export const toggleLike = async (id: string) => {
  const response = await api.patch(`/posts/like/${id}`);

  if (response.data.success) {
    return response.data.isLiked as boolean;
  }
};

export const deletePost = async (id: string) => {
  const response = await api.delete(`/posts/${id}`);

  if (response.data.success) {
    return response.data.message;
  }
};
