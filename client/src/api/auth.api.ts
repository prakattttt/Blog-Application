import api from "./axios";
import type { LoginBody, RegisterBody } from "../types/auth.types";

export const loginUser = async (body: LoginBody) => {
  const response = await api.post("/login", body);

  return response.data;
};

export const registerUser = async (body: RegisterBody) => {
  const response = await api.post("/register", body);

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/logout");

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

export const setBio = async ({ id, bio }: { id: string; bio: string }) => {
  const response = await api.post(`/set-bio/${id}`, {
    bio,
  });

  return response.data;
};
