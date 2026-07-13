import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-soft hover:shadow-card",
  secondary:
    "bg-[var(--color-secondary)] text-white shadow-soft hover:brightness-110",
  accent:
    "bg-[var(--color-accent)] text-white shadow-soft hover:brightness-110",
  outline:
    "border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
  ghost:
    "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  danger:
    "bg-red-500 text-white shadow-soft hover:bg-red-600"
};

function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold
        transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </motion.button>
  );
}

export default Button;
