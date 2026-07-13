import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, DoorOpen, Wallet, CalendarCheck, MessageSquareWarning,
  UserPlus, Wrench, FileBarChart, TrendingUp
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import api from "../services/api";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { PageLoader } from "../components/ui/Loader";

const COLORS = ["var(--color-primary)", "#E2E8F0"];
const ATTENDANCE_COLORS = ["#10B981", "#EF4444"];

function StatCard({ icon: Icon, label, value, gradient, delay = 0 }) {
  return (
    <Card hover className="p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay }}
      >
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-white mb-4 shadow-soft bg-gradient-to-br ${gradient}`}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm text-slate-400 font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">{value}</p>
      </motion.div>
    </Card>
  );
}

function Dashboard() {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, roomsRes, feesRes, attendanceRes, complaintsRes] = await Promise.all([
        api.get("/api/students"),
        api.get("/api/rooms"),
        api.get("/api/fees"),
        api.get("/api/attendance"),
        api.get("/api/complaints")
      ]);

      setStudents(studentsRes.data);
      setRooms(roomsRes.data);
      setFees(feesRes.data);
      setAttendance(attendanceRes.data);
      setComplaints(complaintsRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <PageLoader label="Loading dashboard..." />;

  const occupiedRooms = rooms.filter((r) => r.availableBeds === 0).length;
  const availableRooms = rooms.filter((r) => r.availableBeds > 0).length;
  const totalCollection = fees.filter((f) => f.status === "PAID").reduce((t, f) => t + f.amount, 0);
  const pendingAmount = fees.filter((f) => f.status === "PENDING").reduce((t, f) => t + f.amount, 0);
  const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = attendance.filter((a) => a.status === "ABSENT").length;
  const occupancyRate = rooms.length ? Math.round((occupiedRooms / rooms.length) * 100) : 0;

  const occupancyData = [
    { name: "Occupied", value: occupiedRooms || 0 },
    { name: "Available", value: availableRooms || 0.0001 }
  ];

  const attendanceData = [
    { name: "Present", value: presentCount || 0 },
    { name: "Absent", value: absentCount || 0.0001 }
  ];

  const feeBarData = [
    { name: "Collected", amount: totalCollection },
    { name: "Pending", amount: pendingAmount }
  ];

  const recentComplaints = [...complaints]
    .sort((a, b) => (a.complaintDate < b.complaintDate ? 1 : -1))
    .slice(0, 5);

  const quickActions = [
    { label: "Add Student", icon: UserPlus, to: "/admin/register", gradient: "from-blue-600 to-blue-500" },
    { label: "Room Management", icon: DoorOpen, to: "/admin/rooms", gradient: "from-emerald-600 to-teal-500" },
    { label: "Fee Management", icon: Wallet, to: "/admin/fees", gradient: "from-amber-500 to-orange-500" },
    { label: "Attendance", icon: CalendarCheck, to: "/admin/attendance", gradient: "from-rose-500 to-red-500" },
    { label: "Maintenance", icon: Wrench, to: "/admin/maintenance", gradient: "from-purple-600 to-indigo-500" },
    { label: "Reports", icon: FileBarChart, to: "/admin/reports", gradient: "from-slate-700 to-slate-500" }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
          Welcome back, Admin
        </h1>
        <p className="text-slate-400 text-sm mt-1">{new Date().toLocaleString()}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Users} label="Total Students" value={students.length} gradient="from-blue-600 to-blue-400" delay={0} />
        <StatCard icon={DoorOpen} label="Total Rooms" value={rooms.length} gradient="from-emerald-600 to-teal-400" delay={0.05} />
        <StatCard icon={Wallet} label="Fees Collected" value={`₹${totalCollection}`} gradient="from-amber-500 to-orange-400" delay={0.1} />
        <StatCard icon={MessageSquareWarning} label="Open Complaints" value={complaints.filter(c => c.status !== "RESOLVED").length} gradient="from-rose-500 to-red-400" delay={0.15} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card hover className="p-6 lg:col-span-1">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Room Occupancy</h2>
          <p className="text-sm text-slate-400 mb-4">{occupancyRate}% occupied</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyData} dataKey="value" innerRadius={55} outerRadius={75} paddingAngle={3}>
                  {occupancyData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm mt-2">
            <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />Occupied ({occupiedRooms})</span>
            <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-slate-300" />Available ({availableRooms})</span>
          </div>
        </Card>

        <Card hover className="p-6 lg:col-span-1">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Today's Attendance</h2>
          <p className="text-sm text-slate-400 mb-4">{presentCount + absentCount} records</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceData} dataKey="value" innerRadius={55} outerRadius={75} paddingAngle={3}>
                  {attendanceData.map((_, i) => <Cell key={i} fill={ATTENDANCE_COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm mt-2">
            <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" />Present ({presentCount})</span>
            <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-red-500" />Absent ({absentCount})</span>
          </div>
        </Card>

        <Card hover className="p-6 lg:col-span-1">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Fee Collection Summary</h2>
          <p className="text-sm text-slate-400 mb-4">Collected vs pending</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeBarData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]} fill="var(--color-secondary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[var(--color-primary)]" /> Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map(({ label, icon: Icon, to, gradient }) => (
            <motion.button
              key={to}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(to)}
              className={`rounded-2xl p-5 text-white text-sm font-semibold shadow-soft hover:shadow-card-hover transition-shadow bg-gradient-to-br ${gradient} flex flex-col items-center gap-2 text-center`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent complaints */}
      <Card className="p-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Recent Complaints</h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
          {recentComplaints.map((c) => (
            <div key={c.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-slate-700 dark:text-slate-200 truncate">{c.complaintType}</p>
                <p className="text-sm text-slate-400 truncate">{c.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-400">{c.complaintDate}</span>
                <Badge color={c.status === "RESOLVED" ? "green" : "amber"}>{c.status}</Badge>
              </div>
            </div>
          ))}
          {recentComplaints.length === 0 && (
            <p className="text-slate-400 text-sm py-4">No complaints yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
