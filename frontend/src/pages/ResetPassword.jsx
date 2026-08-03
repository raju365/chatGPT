import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";

import { resetPassword } from "../services/auth.service";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const data = await resetPassword(token, password);

      toast.success(data.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <h1 className="mb-2 text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mb-8 text-zinc-400">
          Enter your new password.
        </p>

        {/* Password */}

        <div className="mb-5">
          <label className="mb-2 block text-sm">
            New Password
          </label>

          <div className="flex items-center rounded-xl border border-zinc-700 px-4">
            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 bg-transparent px-3 py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Confirm */}

        <div className="mb-8">
          <label className="mb-2 block text-sm">
            Confirm Password
          </label>

          <div className="flex items-center rounded-xl border border-zinc-700 px-4">
            <Lock size={18} />

            <input
              type={showConfirm ? "text" : "password"}
              className="flex-1 bg-transparent px-3 py-3 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm text-zinc-400 hover:text-white"
        >
          Back to Login
        </Link>
      </form>
    </main>
  );
};

export default ResetPassword;