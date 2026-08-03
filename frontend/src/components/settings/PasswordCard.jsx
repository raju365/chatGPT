import { useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { changePassword } from "../../services/auth.service";
const PasswordInput = ({ label, value, onChange, show, setShow }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-400">{label}</label>

      <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 px-4">
        <Lock size={18} className="text-zinc-500" />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent py-3 text-white outline-none placeholder:text-zinc-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-zinc-400 hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};
const PasswordCard = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const data = await changePassword(currentPassword, newPassword);

      toast.success(data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-200">Change Password</h2>

        <p className="mt-2 text-sm text-zinc-400">
          Update your account password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          show={showCurrent}
          setShow={setShowCurrent}

        />

        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          show={showNew}
          setShow={setShowNew}
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        {confirmPassword && (
          <p
            className={`text-sm ${
              newPassword === confirmPassword
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {newPassword === confirmPassword
              ? "✓ Passwords match"
              : "✗ Passwords do not match"}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Lock size={18} />
          )}

          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
  );
};

export default PasswordCard;
