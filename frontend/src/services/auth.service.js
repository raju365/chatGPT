import api from "../lib/axios";

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};
export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};
export async function resetPassword(token, password) {
  const { data } = await api.post(`/auth/reset-password/${token}`, {
    password,
  });

  return data;
}