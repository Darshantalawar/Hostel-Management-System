import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import Navbar from "./Navbar";
import { getCurrentStudent } from "../services/auth";

function StudentLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const student = getCurrentStudent();

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100">

      <StudentSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar
          userName={student?.fullName || "Student"}
          userSubtitle="Student"
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

export default StudentLayout;
