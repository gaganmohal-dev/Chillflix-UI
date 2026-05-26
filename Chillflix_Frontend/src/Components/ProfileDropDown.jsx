import { ChevronDown, User, Bookmark, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SpinningLoader from "../Loaders/SpinningLoader";
function ProfileDropdown() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
  setLoading(true);

  setTimeout(() => {
    localStorage.clear();
    navigate("/", { replace: true });
  }, 500);
};
  return (
    <div className="relative">

      {/* Dropdown */}
      <div
        className="
        absolute right-0 mt-4 w-64
        bg-zinc-900/95 backdrop-blur-md
        border border-zinc-800
        rounded-xl shadow-2xl
        overflow-hidden
        "
      >
        
        {/* Top Profile Section */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <div>
            <h3 className="text-white font-semibold text-sm">
              Guest User
            </h3>

            <p className="text-zinc-400 text-xs">
              Streaming Explorer
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">

          <button
            className="
            w-full flex items-center gap-3
            px-4 py-3 text-sm text-zinc-200
            hover:bg-zinc-800 transition
            cursor-pointer
            "
          >
            <User size={18} />
            Profile
          </button>

          <button
            className="
            w-full flex items-center gap-3
            px-4 py-3 text-sm text-zinc-200
            hover:bg-zinc-800 transition
            cursor-pointer
            "
          >
            <Bookmark size={18} />
            Account
          </button>

          <button
            className="
            w-full flex items-center gap-3
            px-4 py-3 text-sm text-zinc-200
            hover:bg-zinc-800 transition
            cursor-pointer
            "
          >
            <Settings size={18} />
            Settings
          </button>

        </div>

        {/* Bottom Logout */}
        <div className="border-t border-zinc-800">
          
          <button
            className="
            w-full flex items-center gap-3
            px-4 py-3 text-sm
            text-red-500 hover:bg-red-500/10
            transition cursor-pointer
            "
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;