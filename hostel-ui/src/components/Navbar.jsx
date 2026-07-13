import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Navbar({ userName, userSubtitle, onMenuClick }) {

  const { theme, toggleTheme } = useTheme();

  const initials = (userName || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center gap-4 px-4 md:px-8 py-4">

        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>

        <div className="flex-1 sm:flex-none" />

        <div className="flex items-center gap-2 md:gap-4">

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </button>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white flex items-center justify-center text-sm font-bold shadow-soft">
              {initials}
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">{userName}</p>
              <p className="text-xs text-slate-400">{userSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
