import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useChat } from "../../context/ChatContext";

const ChatHistoryItem = ({ chat, activeChat, setActiveChat }) => {
  const { handleRenameChat, handleDeleteChat } = useChat();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const saveRename = async () => {
    if (!title.trim()) {
      setTitle(chat.title);
      setEditing(false);
      return;
    }

    await handleRenameChat(chat._id, title.trim());

    setEditing(false);
  };

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className={`group mb-2 flex items-center rounded-xl transition ${
        activeChat?._id === chat._id ? "bg-violet-600" : "hover:bg-zinc-800"
      }`}
    >
      <button
        onClick={() => setActiveChat(chat)}
        className="flex flex-1 items-center gap-3 px-4 py-3 text-left"
      >
        <MessageSquare size={18} />

        {editing ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveRename();
            }}
            className="w-full bg-transparent outline-none"
          />
        ) : (
          <span className="truncate">{chat.title}</span>
        )}
      </button>

      {/* Menu */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="mr-2 rounded-md p-1 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 bg-zinc-900 text-white border border-zinc-800"
        >
          <DropdownMenuItem
            onClick={() => setEditing(true)}
            className="cursor-pointer"
          >
            <Pencil size={16} />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDeleteChat(chat._id)}
            className="cursor-pointer text-red-500"
          >
            <Trash2 size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default ChatHistoryItem;
