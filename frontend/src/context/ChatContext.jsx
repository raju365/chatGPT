import { createContext, useContext, useState } from "react";
import socket from "../lib/socket";
import { createChat, getChats, getMessages,renameChat } from "../services/chat.service";

import { useEffect } from "react";
import { toast } from "sonner";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const [activeChat, setActiveChat] = useState(null);

  const [chats, setChats] = useState([]);

  const [loading, setLoading] = useState(false);

  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket Connected:");
    });

    socket.on("ai-response", (data) => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: data.content,
        },
      ]);
    });
    socket.on("chat-title-updated", ({ chatId, title }) => {
      setChats((prev) =>
        prev.map((chat) => (chat._id === chatId ? { ...chat, title } : chat)),
      );

      setActiveChat((prev) =>
        prev && prev._id === chatId ? { ...prev, title } : prev,
      );
    });

    socket.on("ai-error", (err) => {
      setTyping(false);
      console.error(err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("ai-response");
      socket.off("ai-error");
      socket.off("chat-title-updated");
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    async function fetchChats() {
      try {
        const data = await getChats();

        setChats(data.chats);

        // if chats exists then active fist chat
        if (data.chats.length > 0) {
          setActiveChat(data.chats[0]);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    fetchChats();
  }, []);

  useEffect(() => {
    if (!activeChat) return;

    async function loadMessages() {
      try {
        const data = await getMessages(activeChat._id);

        setMessages(data.messages);
      } catch (error) {
        console.error(error);
      }
    }

    loadMessages();
  }, [activeChat]);

  const handleCreateChat = async () => {
    try {
      setLoading(true);

      const data = await createChat("New Chat");
    
      setChats((prev) => [...prev, data.chat]);
      setActiveChat(data.chat);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const sendMessage = (content) => {
    if (!activeChat) {
      console.warn("No active chat selected");
      return;
    }

    // User message UI me turant show hoga
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content,
      },
    ]);

    setTyping(true);

    socket.emit("ai-message", {
      chat: activeChat._id,
      content,
    });
  };
  const handleRenameChat = async (chatId, title) => {
  try {
    const data = await renameChat(chatId, title);

    setChats((prev) =>
      prev.map((chat) =>
        chat._id === chatId ? data.chat : chat
      )
    );

    if (activeChat?._id === chatId) {
      setActiveChat(data.chat);
    }

    toast.success("Chat renamed");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to rename chat"
    );
  }
};
  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,

        chats,
        setChats,

        activeChat,
        setActiveChat,

        loading,
        setLoading,

        typing,
        setTyping,

        handleCreateChat,
        sendMessage,
        handleRenameChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);


  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }

  return context;
};
