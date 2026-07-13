import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, UserCog, GraduationCap, ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const options = [
  {
    to: "/admin/login",
    title: "Admin Login",
    subtitle: "Manage students, rooms, fees & reports",
    icon: UserCog,
    gradient: "from-[var(--color-primary)] to-[var(--color-primary-dark)]"
  },
  {
    to: "/student/login",
    title: "Student Login",
    subtitle: "View your profile, fees, attendance & more",
    icon: GraduationCap,
    gradient: "from-[var(--color-secondary)] to-emerald-600"
  }
];

function Home() {

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-[var(--color-surface)] dark:bg-[#0B1120] p-6 overflow-hidden">

      {/* Ambient gradient blobs */}
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />

      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        title="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-card">
          <Building2 className="h-7 w-7 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent"
      >
        Hostel Management System
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-slate-500 dark:text-slate-400 mb-12 text-lg text-center"
      >
        Please choose how you'd like to sign in
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl relative z-10">
        {options.map(({ to, title, subtitle, icon: Icon, gradient }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <Link to={to} className="block group">
              <motion.div
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-2xl p-8 sm:p-10 text-center text-white shadow-card hover:shadow-card-hover transition-shadow bg-gradient-to-br ${gradient}`}
              >
                <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <Icon className="h-7 w-7" />
                </div>

                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-white/80 text-sm">{subtitle}</p>

                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                  Continue <ArrowRight className="h-4 w-4" />
                </div>

                <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-14 relative z-10">
        © {new Date().getFullYear()} Hostel Management System
      </p>
    </div>
  );
}

export default Home;
