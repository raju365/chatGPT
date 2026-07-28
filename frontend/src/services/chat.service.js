import api from "../lib/axios";

export const createChat = async (title) => {
  const { data } = await api.post("/chat", {
    title,
  });

  return data;
};
export const getChats = async () => {
  const { data } = await api.get("/chat");
  return data;
};