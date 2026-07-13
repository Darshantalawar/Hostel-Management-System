import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserCircle, DoorOpen, Wallet, CalendarCheck,
  MessageSquareWarning, Wrench, LogOut, ChevronsLeft, ChevronsRight, GraduationCap
} from "lucide-react";
import { getCurrentStudent, logout } from "../services/auth";

const links = [
  { to: "/student/profile", label: "Profile", icon: UserCircle },
  { to: "/student/room", label: "Room Details", icon: DoorOpen },
  { to: "/student/fees", label: "Fee Status", icon: Wallet },
  { to: "/student/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/student/complaints", label: "Complaint Registration", icon: MessageSquareWarning },
  { to: "/student/maintenance", label: "Maintenance Request", icon: Wrench }
];

function StudentSidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {

  const navigate = useNavigate();
  const student = getCurrentStudent();

  const handleLogout = () => {
    logout();
    navigate("/student/login");
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
        className={`fixed lg:sticky top-0 z-50 h-screen bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 w-72 ${width}`}
      >
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 shadow-soft">
            <GraduationCap className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold leading-tight">Student Panel</h1>
              {student && <p className="text-xs text-blue-100">{student.fullName}</p>}
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
                  ? "bg-white/15 text-white shadow-soft"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4 space-y-1 border-t border-white/15 pt-3">
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
            {!collapsed && <span>Collapse</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-100 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export default StudentSidebar;
