import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../../context/ChatContext";

const ChatMessages = () => {
  const { messages } = useChat();

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="w-full flex-1 overflow-y-auto px-6 py-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-zinc-500">
          Start a conversation 👋
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message._id || `${message.role}-${message.content}`}
              message={message}
            />
          ))}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
