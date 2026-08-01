import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Sparkles,
  MessageSquareText,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";
import CountUpModule from "react-countup";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const isLoggedIn = !!user;

  const ctaLink = isLoggedIn ? "/chat" : "/register";
  const ctaText = isLoggedIn ? "Continue Chat →" : "Start Chatting →";
  const CountUp = CountUpModule.default;
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },

    visible: (i = 1) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };
  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="absolute bottom-20 left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>
      {/* Background Glow */}

      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}

      <section className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-6">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Left */}

          <div>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              ✨ Meet Oriv AI
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">
              Your Intelligent
              <span className="block bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Chat smarter, generate ideas, write code, summarize documents and
              boost productivity with one modern AI platform.
            </p>
            {isLoggedIn && (
              <div className="mt-8 max-w-md rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 backdrop-blur">
                <p className="text-sm text-zinc-400">Logged in as</p>

                <h3 className="mt-1 text-2xl font-bold">
                  👋 Welcome back, {user.fullName.firstName}
                </h3>

                <p className="mt-2 text-zinc-300">{user.email}</p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link
                  to={ctaLink}
                  className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold transition hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-700/30"
                >
                  {ctaText}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <a
                  href="https://github.com/raju365/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-zinc-800 px-8 py-4 transition hover:border-violet-500 hover:bg-zinc-900 hover:text-white"
                >
                  GitHub
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right */}

          <div
            className="relative"
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: [0, -12, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              x: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="ml-auto w-fit rounded-2xl bg-violet-600 px-5 py-3">
                  Explain React Hooks
                </div>

                <div className="w-fit rounded-2xl bg-zinc-800 px-5 py-4">
                  React Hooks allow you to use state, lifecycle methods and
                  other React features inside functional components.
                </div>

                <div className="ml-auto w-fit rounded-2xl bg-violet-600 px-5 py-3">
                  Give an example
                </div>

                <div className="w-fit rounded-2xl bg-zinc-800 px-5 py-4 font-mono text-sm">
                  const [count,setCount] = useState(0);
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trusted Technologies */}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          Trusted Technologies
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {["React", "Node.js", "MongoDB", "Socket.IO", "Gemini", "JWT"].map(
            (tech, index) => (
              <motion.div
                key={tech}
                variants={fadeUp}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center text-zinc-300 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:text-white"
              >
                {tech}
              </motion.div>
            ),
          )}
        </div>
      </section>

      {/* Features */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-violet-400 font-semibold">FEATURES</p>

          <h2 className="mt-3 text-4xl font-bold">Why Choose Oriv AI?</h2>

          <p className="mt-4 text-zinc-400">
            Everything you need in one intelligent AI platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Get responses in seconds with an optimized AI pipeline.",
            },

            {
              icon: "🧠",
              title: "Smart AI",
              desc: "Powered by advanced language models for accurate answers.",
            },

            {
              icon: "🔒",
              title: "Secure",
              desc: "JWT authentication and encrypted communication.",
            },

            {
              icon: "💬",
              title: "Realtime Chat",
              desc: "Experience smooth Socket.IO based messaging.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                rotateX: 8,
                rotateY: -8,
              }}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-900/20"
            >
              <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="mt-7 text-xl font-semibold">{item.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-16 text-center">
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            🚀 Trusted Worldwide
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Numbers that speak for{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
              Oriv AI
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            Built for speed, reliability and intelligent conversations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <MessageSquareText className="h-8 w-8" />,

              end: 10,

              suffix: "K+",

              title: "Messages Generated",
            },

            {
              icon: <ShieldCheck className="h-8 w-8" />,

              end: 99.9,

              suffix: "%",

              decimals: 1,

              title: "Reliable Uptime",
            },

            {
              icon: <Sparkles className="h-8 w-8" />,

              end: 24,

              suffix: "/7",

              title: "AI Availability",
            },

            {
              icon: <BrainCircuit className="h-8 w-8" />,

              end: 50,

              suffix: "+",

              title: "AI Capabilities",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.04,
              }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:border-violet-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]"
            >
              {/* Glow */}

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20"></div>

              {/* Icon */}

              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg"
              >
                {item.icon}
              </motion.div>

              {/* Number */}

              <h3 className="bg-gradient-to-r from-white via-violet-300 to-indigo-400 bg-clip-text text-5xl font-black text-transparent">
                <CountUp
                  end={item.end}
                  duration={2.5}
                  suffix={item.suffix}
                  decimals={item.decimals || 0}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>

              {/* Title */}

              <p className="mt-4 text-lg font-medium text-zinc-300">
                {item.title}
              </p>

              {/* Bottom Line */}

              <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <motion.section
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        className="mx-auto max-w-6xl px-6 pb-28"
      >
        <div className="overflow-hidden rounded-[40px] border border-violet-500/20 bg-gradient-to-r from-violet-600 to-indigo-700 p-14 shadow-2xl shadow-violet-900/30">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-5xl font-black leading-tight">
              Ready to Experience
              <br />
              Oriv AI?
            </h2>

            <p className="mt-6 text-lg text-violet-100">
              Join thousands of users using Oriv AI for coding, writing,
              productivity and intelligent conversations.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              {isLoggedIn ? (
                <Link
                  to="/chat"
                  className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
                >
                  Continue Chat →
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
                  >
                    Get Started Free
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-2xl border border-white/30 px-8 py-4 transition hover:bg-white/10"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}

      <motion.footer
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="border-t border-zinc-800"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold">
              Oriv <span className="text-violet-400">AI</span>
            </h2>

            <p className="mt-2 text-zinc-500">Your Intelligent AI Assistant</p>
          </div>

          <div className="flex flex-wrap gap-8 text-zinc-400">
            <a href="#">Docs</a>

            <a href="#">GitHub</a>

            <a href="#">Privacy</a>

            <a href="#">Terms</a>

            <a href="#">Contact</a>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
          © 2026 Oriv AI. Built with ❤️ by Raju barman.
        </div>
      </motion.footer>
    </main>
  );
};

export default Home;
