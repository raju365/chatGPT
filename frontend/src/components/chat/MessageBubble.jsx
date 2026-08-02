import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ message }) => {
  if (!message) return null;

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
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mt-6 mb-4 text-3xl font-bold">{children}</h1>
            ),

            h2: ({ children }) => (
              <h2 className="mt-5 mb-3 text-2xl font-bold">{children}</h2>
            ),

            h3: ({ children }) => (
              <h3 className="mt-4 mb-2 text-xl font-semibold">{children}</h3>
            ),

            p: ({ children }) => <p className="mb-3 leading-7">{children}</p>,

            ul: ({ children }) => (
              <ul className="mb-4 list-disc pl-6">{children}</ul>
            ),

            ol: ({ children }) => (
              <ol className="mb-4 list-decimal pl-6">{children}</ol>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-4 border-violet-500 pl-4 italic text-zinc-300">
                {children}
              </blockquote>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline hover:text-violet-300"
              >
                {children}
              </a>
            ),

            table: ({ children }) => (
              <div className="my-4 overflow-x-auto">
                <table className="w-full border border-zinc-700">
                  {children}
                </table>
              </div>
            ),

            th: ({ children }) => (
              <th className="border border-zinc-700 bg-zinc-800 px-3 py-2 text-left">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border border-zinc-700 px-3 py-2">{children}</td>
            ),

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
                      {copied ? <Check size={16} /> : <Copy size={16} />}
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
                  className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm"
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
