import PersonalInfoCard from "../components/settings/PersonalInfoCard";
import PasswordCard from "../components/settings/PasswordCard";
import DangerZoneCard from "../components/settings/DangerZoneCard";

const Settings = () => {
  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-4xl font-bold">
          Account Settings
        </h1>

        <div className="space-y-8">

          <PersonalInfoCard />

          <PasswordCard />

          <DangerZoneCard />

        </div>

      </div>
    </main>
  );
};

export default Settings;