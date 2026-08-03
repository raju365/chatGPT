import { useState } from "react";
import { User, Mail, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const PersonalInfoCard = () => {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(
    user?.fullName?.firstName || "",
  );

  const [lastName, setLastName] = useState(
    user?.fullName?.lastName || "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API next step
    console.log({
      firstName,
      lastName,
    });
  };

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Personal Information
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Update your personal details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* First Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            First Name
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 px-4">
            <User size={18} className="text-zinc-500" />

            <input
              type="text"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>
        </div>

        {/* Last Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Last Name
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950 px-4">
            <User size={18} className="text-zinc-500" />

            <input
              type="text"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 px-4 opacity-70">
            <Mail size={18} className="text-zinc-500" />

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full cursor-not-allowed bg-transparent py-3 outline-none"
            />
          </div>

          <p className="mt-2 text-xs text-zinc-500">
            Email address cannot be changed.
          </p>
        </div>

        {/* Save */}

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
        >
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default PersonalInfoCard;