import api from "./axios";
import type { LoginBody, RegisterBody } from "../types/auth.types"

export const loginUser = async (body: LoginBody) => {
  const response = await api.post("/users/login", body);

  return response.data;
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
