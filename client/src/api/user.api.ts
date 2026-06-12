import api from "./axios";

export const deleteUser = async (password: string) => {
  const response = await api.delete("/users/delete", {
    data: { password },
  });

  if (response.data.success) {
    return response.data.message;
  }
};
