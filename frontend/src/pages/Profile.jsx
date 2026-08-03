import ProfileCard from "../components/profile/ProfileCard";
import UserStats from "../components/profile/UserStats";

const Profile = () => {
  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold">
          My Profile
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">

          <ProfileCard />

          <UserStats />

        </div>

      </div>
    </main>
  );
};

export default Profile;