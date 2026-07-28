import { motion } from "motion/react";
import { Sparkles, Code2, FileText, Lightbulb } from "lucide-react";
import OrivIcon from "../../assets/oriv-icon.svg";

const prompts = [
  {
    icon: <Code2 size={22} />,
    title: "Write Code",
    desc: "Generate clean and optimized code.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Brainstorm Ideas",
    desc: "Get creative ideas instantly.",
  },
  {
    icon: <FileText size={22} />,
    title: "Summarize",
    desc: "Summarize long articles or PDFs.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Ask Anything",
    desc: "Chat with Oriv AI naturally.",
  },
];

const EmptyState = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">

      {/* Logo */}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <div className="rounded-3xl bg-violet-600 p-5 shadow-[0_0_60px_rgba(139,92,246,.45)]">
          <img
            src={OrivIcon}
            alt="Oriv AI"
            className="h-14 w-14"
          />
        </div>
      </motion.div>

      {/* Heading */}

      <h1 className="text-center text-5xl font-black">
        How can I help you
        <span className="block bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
          today?
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-center text-zinc-400">
        Ask questions, generate code, summarize documents and build
        amazing projects with Oriv AI.
      </p>

      {/* Prompt Cards */}

      <div className="mt-14 grid w-full max-w-5xl gap-5 md:grid-cols-2">

        {prompts.map((item, index) => (
          <motion.button
            key={item.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 text-left transition hover:border-violet-500"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-zinc-400">
              {item.desc}
            </p>
          </motion.button>
        ))}

      </div>

    </div>
  );
};

export default EmptyState;