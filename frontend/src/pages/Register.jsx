import { Link } from "react-router-dom";
import Button from "./ui/Button";
import Input from "./ui/Input";
import OrivIcon from "../assets/oriv-icon.svg";

const Register = () => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-violet-600 flex items-center justify-center">
            <img
              src={OrivIcon}
              alt="Oriv AI"
              className="h-8 w-8"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold">
            Create Account 🚀
          </h1>

          <p className="mt-2 text-zinc-400">
            Join <span className="text-violet-400">Oriv AI</span> and start your AI journey.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">

          <Input
            type="text"
            placeholder="First Name"
          />

          <Input
            type="text"
            placeholder="Last Name"
          />

          <Input
            type="email"
            placeholder="Email address"
          />

          <Input
            type="password"
            placeholder="Create password"
          />

          <Input
            type="password"
            placeholder="Confirm password"
          />

          <label className="flex items-start gap-3 text-sm text-zinc-400">

            <input
              type="checkbox"
              className="mt-1 accent-violet-600"
            />

            <span>
              I agree to the{" "}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300"
              >
                Terms
              </button>{" "}
              &{" "}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300"
              >
                Privacy Policy
              </button>
            </span>

          </label>

          <Button>
            Create Account
          </Button>

        </form>

        {/* Divider */}

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800"></div>

          <span className="text-sm text-zinc-500">
            OR
          </span>

          <div className="h-px flex-1 bg-zinc-800"></div>
        </div>

        {/* Google */}

        <button
          className="w-full rounded-xl border border-zinc-700 py-3 transition hover:bg-zinc-800"
        >
          Continue with Google
        </button>

        {/* Footer */}

        <p className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Sign In
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Register;