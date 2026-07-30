import api from "../lib/axios";

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};