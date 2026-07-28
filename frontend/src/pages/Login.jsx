import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import OrivIcon from "../assets/oriv-icon.svg";
import socket from "../lib/socket";
import api from "../lib/axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(data);
      

      navigate("/chat");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-violet-600 flex items-center justify-center text-2xl font-bold">
            <img src={OrivIcon} alt="OrivIcon" />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

          <p className="mt-2 text-zinc-400">
            Sign in to continue to{" "}
            <span className="text-violet-400">Oriv AI</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-400">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-violet-400 hover:text-violet-300"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800"></div>
          <span className="text-sm text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>

        {/* Google */}

        <button className="w-full rounded-xl border border-zinc-700 py-3 transition hover:bg-zinc-800">
          Continue with Google
        </button>

        {/* Footer */}

        <p className="mt-8 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
