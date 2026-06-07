import api from "./axios";

export const getPostComments = async (postId: string) => {
  const response = await api.get(`/comments/${postId}`);

  if (response.data.success) {
    return response.data.comments;
  }
};

export const addPostComments = async (postId: string, comment: string) => {
  const response = await api.post(`/comments/write/${postId}`, { comment });

  if (response.data.success) {
    return response.data.comments;
  }
};

export const deletePostComments = async (commentId: string) => {
  const response = await api.delete(`/comments/write/${commentId}`);

  if (response.data.success) {
    return response.data.message;
  }
};
