import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "./Sidebar";
import {
  Menu,
  MoreVertical,
  Trash2,
  Pencil,
  House,
  Plus,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "motion/react";
import { useChat } from "../../context/ChatContext";
import { Link, useNavigate } from "react-router-dom";
import OrivIcon from "../../assets/oriv-icon.svg";
const ChatHeader = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    activeChat,
    typing,
    handleRenameChat,
    handleDeleteChat,
    handleCreateChat,
  } = useChat();

  const renameChat = () => {
    const title = prompt("Enter new chat title", activeChat?.title);

    if (!title?.trim()) return;

    handleRenameChat(activeChat._id, title.trim());
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur-xl">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar */}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <div className="cursor-pointer rounded-xl p-2 transition hover:bg-zinc-800 lg:hidden">
              <Menu size={22} />
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 border-zinc-800 p-0">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
        <Link
          to="/"
          className="hidden md:flex items-center gap-3 hover:opacity-80"
        >
          <img
            src={OrivIcon}
            className="h-10 w-10 rounded-xl bg-violet-600 p-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            alt="Oriv AI"
          />

          <div>
            <h2 className="font-bold">Oriv AI</h2>
            <p className="hidden text-xs text-zinc-400 sm:block">Home</p>
          </div>
        </Link>

        <div className="hidden h-8 w-px bg-zinc-700 lg:block"></div>

        <div className="flex-1  min-w-0">
          <h2 className="truncate text-lg font-semibold sm:text-lg">
            {activeChat?.title || "New Conversation"}
          </h2>

          <div className="mt-1 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                typing ? "bg-yellow-400" : "bg-green-500"
              }`}
            />

            <span className="text-sm text-zinc-400">
              {typing ? (
                <>
                  <span className="hidden sm:inline">Oriv AI is typing...</span>
                  <span className="sm:hidden">Typing...</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Oriv AI is online</span>
                  <span className="sm:hidden">Online</span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}

      {activeChat && (
        <div className="flex shrink-0 items-center gap-2">
          {/* Desktop only */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={renameChat}
            className="hidden rounded-xl p-3 transition hover:bg-zinc-800 md:flex"
          >
            <Pencil size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDeleteChat(activeChat._id)}
            className="hidden rounded-xl p-3 transition hover:bg-red-500/10 hover:text-red-400 md:flex"
          >
            <Trash2 size={20} />
          </motion.button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl p-2 lg:p-3 transition hover:bg-zinc-800"
              >
                <MoreVertical size={20} />
              </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 border-zinc-800 bg-zinc-900 text-white"
            >
              <DropdownMenuItem
                onClick={() => navigate("/")}
                className="cursor-pointer"
              >
                <House className="mr-2 h-4 w-4" />
                Home
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  await handleCreateChat();
                  navigate("/chat");
                }}
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/settings")}
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="cursor-pointer text-red-400 focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
