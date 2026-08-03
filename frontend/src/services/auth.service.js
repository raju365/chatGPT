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
export async function updateProfile(firstName, lastName) {
  const { data } = await api.patch("/auth/profile", {
    firstName,
    lastName,
  });

  return data;
}
export async function changePassword(currentPassword, newPassword) {
  const { data } = await api.patch("/auth/change-password", {
    currentPassword,
    newPassword,
  });

  return data;
}
