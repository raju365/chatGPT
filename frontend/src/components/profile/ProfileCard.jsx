import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Calendar, Mail } from "lucide-react";

const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="flex flex-col items-center">

        <Avatar size="xl">
          <AvatarFallback>
            {user?.fullName?.firstName?.[0]}
            {user?.fullName?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <h2 className="mt-5 text-2xl font-bold">
          {user?.fullName?.firstName}{" "}
          {user?.fullName?.lastName}
        </h2>

        <div className="mt-3 flex items-center gap-2 text-zinc-400">
          <Mail size={16} />

          {user?.email}
        </div>

        <div className="mt-2 flex items-center gap-2 text-zinc-500">
          <Calendar size={16} />

          Joined{" "}
          {new Date(user?.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;