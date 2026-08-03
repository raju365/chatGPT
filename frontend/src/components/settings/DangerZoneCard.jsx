import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { deleteAccount } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const DangerZoneCard = () => {
  const [confirmText, setConfirmText] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmText !== "DELETE") {
      return toast.error("Please type DELETE to continue.");
    }

    if (!currentPassword) {
      return toast.error("Current password is required.");
    }

    try {
      setLoading(true);

      const data = await deleteAccount(currentPassword);

      toast.success(data.message);

      setUser(null);

      navigate("/register", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-red-900 bg-zinc-900 p-8">
      <h2 className="text-2xl font-bold text-red-500">Danger Zone</h2>

      <p className="mt-2 text-sm text-zinc-400">
        Deleting your account is permanent. This action cannot be undone.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Current Password</label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none text-white placeholder:text-zinc-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">Type DELETE to confirm</label>

          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none text-white placeholder:text-zinc-500"
          />
        </div>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium transition hover:bg-red-500 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Trash2 size={18} />
          )}

          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </section>
  );
};

export default DangerZoneCard;
