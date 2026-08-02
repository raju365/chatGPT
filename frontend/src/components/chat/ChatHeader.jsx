import { MoreVertical, Trash2, Pencil } from "lucide-react";
import { motion } from "motion/react";
import { useChat } from "../../context/ChatContext";

const ChatHeader = () => {
  const {
    activeChat,
    typing,
    handleRenameChat,
    handleDeleteChat,
  } = useChat();

  const renameChat = () => {
    const title = prompt("Enter new chat title", activeChat?.title);

    if (!title?.trim()) return;

    handleRenameChat(activeChat._id, title.trim());
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-6 backdrop-blur-xl">

      {/* Left */}
      <div>

        <h2 className="text-xl font-semibold truncate max-w-md">
          {activeChat?.title || "New Conversation"}
        </h2>

        <div className="mt-1 flex items-center gap-2">

          <span
            className={`h-2 w-2 rounded-full ${
              typing ? "bg-yellow-400" : "bg-green-500"
            }`}
          />

          <span className="text-sm text-zinc-400">
            {typing ? "Oriv AI is typing..." : "Oriv AI is online"}
          </span>

        </div>

      </div>

      {/* Right */}

      {activeChat && (
        <div className="flex items-center gap-2">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={renameChat}
            className="rounded-xl p-3 transition hover:bg-zinc-800"
          >
            <Pencil size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDeleteChat(activeChat._id)}
            className="rounded-xl p-3 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 size={20} />
          </motion.button>

          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl p-3 transition hover:bg-zinc-800"
          >
            <MoreVertical size={20} />
          </motion.button>

        </div>
      )}
    </header>
  );
};

export default ChatHeader;