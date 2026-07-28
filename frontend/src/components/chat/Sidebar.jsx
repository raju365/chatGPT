import { Plus, MessageSquare, Settings, LogOut, Search } from "lucide-react";
import { motion } from "motion/react";
import OrivIcon from "../../assets/oriv-icon.svg";
import { useChat } from "../../context/ChatContext";

const Sidebar = () => {
  const { chats, activeChat, setActiveChat, handleCreateChat, loading } =
    useChat();

  return (
    <aside className="hidden w-80 flex-col border-r border-zinc-800 bg-zinc-900/60 backdrop-blur-xl lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-zinc-800 p-6">
        <img
          src={OrivIcon}
          alt="Oriv AI"
          className="h-11 w-11 rounded-xl bg-violet-600 p-2"
        />

        <div>
          <h2 className="text-xl font-bold">Oriv AI</h2>
          <p className="text-sm text-zinc-400">AI Assistant</p>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCreateChat}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={20} />
          {loading ? "Creating..." : "New Chat"}
        </motion.button>
      </div>

      {/* Search */}
      <div className="px-5">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <Search size={18} className="text-zinc-500" />

          <input
            type="text"
            placeholder="Search chats..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="mt-5 flex-1 overflow-y-auto px-4">
        {chats.length === 0 ? (
          <p className="px-4 py-2 text-sm text-zinc-500">No chats yet</p>
        ) : (
          chats.map((chat) => (
            <motion.button
              key={chat.id || chat._id}
              onClick={() => setActiveChat(chat)}
              whileHover={{ x: 5 }}
              className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                activeChat?.id === chat.id
                  ? "bg-violet-600"
                  : "hover:bg-zinc-800"
              }`}
            >
              <MessageSquare size={18} />

              <span className="truncate">{chat.title}</span>
            </motion.button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-4">
        <button className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-zinc-800">
          <Settings size={18} />
          Settings
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
