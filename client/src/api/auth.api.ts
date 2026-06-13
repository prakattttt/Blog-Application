import api from "./axios";
import type { LoginBody, RegisterBody } from "../types/auth.types";

export const loginUser = async (body: LoginBody) => {
  const response = await api.post("/users/login", body);

  return response.data;
};

export const verifyPassword = async (password: string) => {
  const response = await api.post("/users/verify", {
    password
  });

  return response.data.isMatched;
};

export const registerUser = async (body: RegisterBody) => {
  const response = await api.post("/users/register", body);

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/users/logout");

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

export const setBio = async ({ id, bio }: { id: string; bio: string }) => {
  const response = await api.post(`/users/set-bio/${id}`, {
    bio,
  });

  return response.data;
};

export const uploadProfileImage = async (image: File, id: string) => {
  const formData = new FormData();

  formData.append("profileImage", image);

  const response = await api.post(`/users/set-profileImage/${id}`, formData);

  return response.data;
};
