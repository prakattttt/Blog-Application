import api from "./axios";

export const deleteUser = async () => {
  const response = await api.delete("/users/delete");

  if (response.data.success) {
    return response.data.message;
  }
};
