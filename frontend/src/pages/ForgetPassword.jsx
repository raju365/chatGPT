import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl">

        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-2 text-zinc-400">
          Enter your email and we'll send you a password reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-violet-500"
            />
          </div>

          <button
            className="w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;