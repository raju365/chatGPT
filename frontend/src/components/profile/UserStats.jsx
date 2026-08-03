import {
  MessageSquare,
  MessagesSquare,
  CalendarDays,
} from "lucide-react";

const UserStats = () => {
  const stats = [
    {
      title: "Total Chats",
      value: "0",
      icon: <MessageSquare size={22} />,
    },
    {
      title: "Messages",
      value: "0",
      icon: <MessagesSquare size={22} />,
    },
    {
      title: "Member Since",
      value: "Aug 2026",
      icon: <CalendarDays size={22} />,
    },
  ];

  return (
    <div className="lg:col-span-2 grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-violet-500"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">
            {stat.icon}
          </div>

          <h3 className="text-sm text-zinc-400">
            {stat.title}
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserStats;