import MessageBubble from "./MessageBubble";

const messages = [
  {
    role: "user",
    content: "Explain React Hooks.",
  },

  {
    role: "assistant",
    content: `React Hooks let you use state and lifecycle methods.

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`
`,
  },
];

const ChatMessages = () => {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto px-6 py-8">
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
        />
      ))}
    </div>
  );
};

export default ChatMessages;