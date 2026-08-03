import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal, Paperclip, Mic } from "lucide-react";
import { motion } from "motion/react";
import { useChat } from "../../context/ChatContext";
import { useNetwork } from "../../context/NetworkContext";
import { toast } from "sonner";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { isOnline } = useNetwork();

  const { sendMessage } = useChat();

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    if (!isOnline) {
      return toast.error("No internet connection");
    }

    sendMessage(text);

    setMessage("");
  };

  return (
    <div className="sticky bottom-0 z-30 border-t border-zinc-800 bg-zinc-950/80 p-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-3">
        <button className="rounded-xl p-3 transition hover:bg-zinc-800">
          <Paperclip size={20} />
        </button>

        <TextareaAutosize
          minRows={1}
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isOnline
              ? "Message Oriv AI..."
              : "You're offline. Check your internet..."
          }
          disabled={!isOnline}
          className="flex-1 resize-none bg-transparent outline-none disabled:cursor-not-allowed disabled:text-zinc-500"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          disabled={!isOnline}
          className="rounded-xl p-3 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Mic size={20} />
        </button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!message.trim() || !isOnline}
          className="rounded-2xl bg-violet-600 p-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </motion.button>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-500">
        Oriv AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default ChatInput;
