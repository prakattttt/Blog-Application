import api from "./axios";

export const deleteUser = async () => {
  const response = await api.delete("/users/delete");

  if (response.data.success) {
    return response.data.message;
  }
};

export const changeName = async (name: string) => {
  const response = await api.patch("/users/change-name", {
    name,
  });

  if (response.data.success) {
    return response.data.message;
  }
};

export const changePassword = async (password: string) => {
  const response = await api.patch("/users/change-password", {
    password,
  });

  if (response.data.success) {
    return response.data.message;
  }
};
