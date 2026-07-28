import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-4xl rounded-3xl px-5 py-4 ${
          isUser
            ? "bg-violet-600 text-white"
            : "border border-zinc-800 bg-zinc-900"
        }`}
      >
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                return (
                  <div className="relative mt-4">

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(String(children));
                        setCopied(true);

                        setTimeout(() => {
                          setCopied(false);
                        }, 1500);
                      }}
                      className="absolute right-3 top-3 rounded-lg bg-zinc-800 p-2 hover:bg-zinc-700"
                    >
                      {copied ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>

                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code
                  className="rounded bg-zinc-800 px-1 py-0.5"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default MessageBubble;