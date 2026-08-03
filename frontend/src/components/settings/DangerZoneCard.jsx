import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { deleteAccount } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const DangerZoneCard = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (text !== "DELETE") {
      return toast.error(
        "Type DELETE to confirm"
      );
    }

    try {
      setLoading(true);

      const data = await deleteAccount();

      toast.success(data.message);

      setUser(null);

      navigate("/register", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-red-900 bg-zinc-900 p-8">
      <h2 className="text-2xl font-bold text-red-500">
        Danger Zone
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Deleting your account is permanent and
        cannot be undone.
      </p>

      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Type DELETE"
        className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
      />

      <button
        onClick={handleDelete}
        disabled={loading}
        className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium transition hover:bg-red-500 disabled:opacity-50"
      >
        <Trash2 size={18} />

        {loading
          ? "Deleting..."
          : "Delete Account"}
      </button>
    </section>
  );
};

export default DangerZoneCard;