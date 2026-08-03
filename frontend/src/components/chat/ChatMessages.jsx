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
    <div className="min-h-0 flex-1 overflow-y-auto bg-zinc-950 px-6 py-6 pb-32">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
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
    </div>
  );
};

export default ChatMessages;
