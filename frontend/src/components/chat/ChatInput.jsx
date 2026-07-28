import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal, Paperclip, Mic } from "lucide-react";
import { motion } from "motion/react";
import { useChat } from "../../context/ChatContext";
const ChatInput = () => {
  const [message, setMessage] = useState("");

 
  const { sendMessage } = useChat();

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    sendMessage(text);

    setMessage("");
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-5">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-3">
        <button className="rounded-xl p-3 transition hover:bg-zinc-800">
          <Paperclip size={20} />
        </button>

        <TextareaAutosize
          minRows={1}
          maxRows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message Oriv AI..."
          className="flex-1 resize-none bg-transparent outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button className="rounded-xl p-3 transition hover:bg-zinc-800">
          <Mic size={20} />
        </button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!message.trim()}
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
