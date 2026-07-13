import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function PageLoader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
      <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function SkeletonRow({ columns = 4 }) {
  return (
    <div
      className="grid gap-4 p-4 border-b border-slate-100 dark:border-slate-700/60"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 rounded-full bg-slate-200 dark:bg-slate-700"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/80 shadow-card overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} columns={columns} />
      ))}
    </div>
  );
}

export default PageLoader;
