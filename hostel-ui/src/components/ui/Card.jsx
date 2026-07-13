import { motion } from "framer-motion";

function Card({ children, className = "", hover = false, as: Component = motion.div, ...props }) {
  return (
    <Component
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={hover ? { y: -4, boxShadow: "var(--shadow-card-hover)" } : undefined}
      className={`rounded-2xl bg-white dark:bg-slate-800/80 shadow-card border border-slate-100 dark:border-slate-700/60 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
