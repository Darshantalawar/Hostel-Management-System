import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, GraduationCap, AlertCircle } from "lucide-react";
import { loginStudent } from "../services/auth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function StudentLogin() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginStudent(loginData.email, loginData.password);
      navigate("/student/profile");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--color-surface)] dark:bg-[#0B1120]">

      {/* Left: illustration / brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-secondary)] text-white relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">Hostel Management</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-bold leading-tight">
            Everything about<br />your hostel life,<br />in one place.
          </h2>
          <p className="text-blue-100 max-w-sm">
            Check your room, track your fees and attendance, and raise complaints — all from your student dashboard.
          </p>
        </motion.div>

        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-8 rounded-full bg-white/30" />
          ))}
        </div>

        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/3 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md p-8 sm:p-10" hover={false}>

          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Hostel Management</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
            Student Login
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Welcome back — sign in to continue.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-6"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={login} className="space-y-5">

            <Input
              label="Email"
              type="email"
              name="email"
              icon={Mail}
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              icon={Lock}
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                Remember me
              </label>
              <button type="button" className="text-[var(--color-primary)] font-semibold hover:underline">
                Forgot Password?
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            New here?{" "}
            <Link to="/student/register" className="text-[var(--color-primary)] font-semibold hover:underline">
              Register
            </Link>
            {" "}·{" "}
            <Link to="/admin/login" className="text-slate-400 hover:underline">
              Admin Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default StudentLogin;
