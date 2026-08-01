import { MessageSquare } from "lucide-react";
import { motion } from "motion/react";

const ChatHistoryItem = ({ chat, activeChat, setActiveChat }) => {
  return (
    <motion.button
      whileHover={{ x: 5 }}
      onClick={() => setActiveChat(chat)}
      className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
        activeChat?._id === chat._id
          ? "bg-violet-600"
          : "hover:bg-zinc-800"
      }`}
    >
      <MessageSquare size={18} />

      <span className="truncate flex-1 text-left">
        {chat.title}
      </span>
    </motion.button>
  );
};

export default ChatHistoryItem;