import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getCurrentAdmin } from "../services/auth";

function Layout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const admin = getCurrentAdmin();

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100">

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar
          userName={admin?.fullName || "Admin"}
          userSubtitle="Administrator"
          onMenuClick={() => setMobileOpen(true)}
        />

        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;
