import { useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  type = "text",
  icon: Icon,
  error,
  value,
  onChange,
  name,
  required = false,
  className = "",
  ...props
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        )}

        <input
          id={id}
          name={name}
          type={resolvedType}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className={`peer w-full rounded-xl border bg-white dark:bg-slate-800
            ${Icon ? "pl-11" : "pl-4"} ${isPassword ? "pr-11" : "pr-4"} pt-5 pb-2
            text-slate-800 dark:text-slate-100 outline-none transition-colors
            ${error
              ? "border-red-400 focus:border-red-500"
              : "border-slate-200 dark:border-slate-600 focus:border-[var(--color-primary)]"
            }`}
          {...props}
        />

        <label
          htmlFor={id}
          className={`absolute ${Icon ? "left-11" : "left-4"} top-2 text-xs text-slate-400
            transition-all pointer-events-none
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--color-primary)]`}
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
