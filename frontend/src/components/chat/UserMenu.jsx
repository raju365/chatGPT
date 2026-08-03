import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth.service";
import socket from "../../lib/socket";
import { toast } from "sonner";

import {
  LogOut,
  MessageCircle,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar";

const UserMenu = ({ showChat = true }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logout();

      setUser(null);

      socket.disconnect();

      toast.success(data.message);

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 transition hover:border-violet-500 outline-none">
          <Avatar size="default">
            <AvatarFallback>
              {user?.fullName?.firstName?.[0]}
              {user?.fullName?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold">
              {user?.fullName?.firstName} {user?.fullName?.lastName}
            </p>

            <p className="truncate text-xs text-zinc-400">{user?.email}</p>
          </div>

          <ChevronDown size={16} className="text-zinc-400" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-xl border border-zinc-800 bg-zinc-950 text-white"
      >
        <DropdownMenuGroup>
          <div className="flex items-center gap-3 p-3">
            <Avatar size="lg">
              <AvatarFallback>
                {user?.fullName?.firstName?.[0]}
                {user?.fullName?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-semibold">
                {user?.fullName?.firstName} {user?.fullName?.lastName}
              </h3>

              <p className="text-xs text-zinc-400">{user?.email}</p>
            </div>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {showChat && (
            <DropdownMenuItem
              onClick={() => navigate("/chat")}
              className="cursor-pointer"
            >
              <MessageCircle size={18} />
              Continue Chat
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
            <Link to="/profile" className="flex items-center gap-3">
              <User size={18} />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings size={18} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-400"
        >
          <LogOut size={18} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
