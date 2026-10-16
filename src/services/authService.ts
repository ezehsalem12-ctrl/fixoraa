
import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "provider";
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "provider";
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/user/register",
    userData
  );

  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/user/login",
    credentials
  );

  return response.data;
};

export const getMe = async () => {
  const response = await api.get<{ user: User }>("/user/me");

  return response.data;
};

export const logoutUser = async () => {
  try {
    await api.post("/user/logout");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};