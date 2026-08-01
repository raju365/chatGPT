import { Link } from "react-router-dom";
import OrivIcon from "../assets/oriv-icon.svg";
import { useAuth } from "../context/AuthContext";
import UserMenu from "./chat/UserMenu";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-600/30 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
            <img src={OrivIcon} className="h-7 w-7" alt="" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Oriv <span className="text-violet-400">AI</span>
            </h1>

            <p className="text-xs text-zinc-500">
              Your Intelligent AI Assistant
            </p>
          </div>
        </Link>

        {/* Right */}

        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
