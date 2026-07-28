import MessageBubble from "./MessageBubble";
import { useChat } from "../../context/ChatContext";

const ChatMessages = () => {
  const { messages } = useChat();
  console.log(messages);

  messages.forEach((msg, index) => {
    console.log(index, msg);
  });

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-zinc-500">
          Start a conversation 👋
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message._id || `${message.role}-${message.content}`}
            message={message}
          />
        ))
      )}
    </div>
  );
};

export default ChatMessages;
