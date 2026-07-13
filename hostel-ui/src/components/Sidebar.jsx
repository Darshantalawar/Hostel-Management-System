import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, DoorOpen, Wallet, CalendarCheck,
  MessageSquareWarning, Wrench, FileBarChart, LogOut, ChevronsLeft, ChevronsRight, Building2
} from "lucide-react";
import { getCurrentAdmin, logout } from "../services/auth";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/students", label: "Student Management", icon: Users },
  { to: "/admin/rooms", label: "Room Management", icon: DoorOpen },
  { to: "/admin/fees", label: "Fee Management", icon: Wallet },
  { to: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/admin/complaints", label: "Complaints", icon: MessageSquareWarning },
  { to: "/admin/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart }
];

function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {

  const navigate = useNavigate();
  const admin = getCurrentAdmin();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const width = collapsed ? "lg:w-20" : "lg:w-72";

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}

      <motion.aside
        animate={{ width: collapsed ? 80 : 288 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`fixed lg:sticky top-0 z-50 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 w-72 ${width}`}
      >
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shrink-0 shadow-soft">
            <Building2 className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold leading-tight">Hostel Admin</h1>
              {admin && <p className="text-xs text-slate-400">{admin.fullName}</p>}
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-white/10 text-white shadow-soft"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"}`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4 space-y-1 border-t border-white/10 pt-3">
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
            {!collapsed && <span>Collapse</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
