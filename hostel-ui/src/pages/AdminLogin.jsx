import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserCog, Lock, ShieldCheck, AlertCircle, Building2 } from "lucide-react";
import { loginAdmin } from "../services/auth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

function AdminLogin() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ usernameOrEmail: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(loginData.usernameOrEmail, loginData.password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid admin username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">

      {/* Left: secure admin panel illustration */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden border-r border-white/5">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
            <Building2 className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">Hostel Admin Console</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-5"
        >
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck className="h-4 w-4 text-[var(--color-secondary)]" />
            Restricted access — administrators only
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Run the entire<br />hostel from one<br />secure dashboard.
          </h2>
          <p className="text-slate-400 max-w-sm">
            Students, rooms, fees, attendance, complaints, maintenance and reports — fully under your control.
          </p>
        </motion.div>

        <p className="text-xs text-slate-600">© {new Date().getFullYear()} Hostel Management System</p>

        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
        <div className="absolute top-1/4 -left-16 h-56 w-56 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[var(--color-surface)] dark:bg-[#0B1120]">
        <Card className="w-full max-w-md p-8 sm:p-10" hover={false}>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <UserCog className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Admin Login</h1>
              <p className="text-slate-400 text-xs">Hostel management staff access only</p>
            </div>
          </div>

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

          <form onSubmit={handleLogin} className="space-y-5">

            <Input
              label="Admin Username or Email"
              type="text"
              name="usernameOrEmail"
              icon={UserCog}
              value={loginData.usernameOrEmail}
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

            <Button type="submit" loading={loading} className="w-full">
              Login as Admin
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            Not staff?{" "}
            <Link to="/student/login" className="text-[var(--color-primary)] font-semibold hover:underline">
              Go to Student Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default AdminLogin;
