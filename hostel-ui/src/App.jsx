import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";
import StudentLayout from "./components/StudentLayout";

import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import ProtectedStudentRoute from "./routes/ProtectedStudentRoute";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import Register from "./pages/Register";

// Admin pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Complaints from "./pages/Complaints";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";

// Student pages
import StudentProfile from "./pages/StudentProfile";
import RoomDetails from "./pages/RoomDetails";
import FeeStatus from "./pages/FeeStatus";
import StudentAttendance from "./pages/StudentAttendance";
import StudentDashboard from "./pages/StudentDashboard"; // Complaint Registration
import StudentMaintenance from "./pages/StudentMaintenance";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<Register />} />

        {/* ADMIN ROUTES — every one of these requires a valid ADMIN token */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedAdminRoute>
              <Layout><Students /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/register"
          element={
            <ProtectedAdminRoute>
              <Layout><Register /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/rooms"
          element={
            <ProtectedAdminRoute>
              <Layout><Rooms /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/fees"
          element={
            <ProtectedAdminRoute>
              <Layout><Fees /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedAdminRoute>
              <Layout><Attendance /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <ProtectedAdminRoute>
              <Layout><Complaints /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/maintenance"
          element={
            <ProtectedAdminRoute>
              <Layout><Maintenance /></Layout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedAdminRoute>
              <Layout><Reports /></Layout>
            </ProtectedAdminRoute>
          }
        />

        {/* STUDENT ROUTES — every one of these requires a valid STUDENT token */}

        <Route
          path="/student/profile"
          element={
            <ProtectedStudentRoute>
              <StudentLayout><StudentProfile /></StudentLayout>
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/student/room"
          element={
            <ProtectedStudentRoute>
              <StudentLayout><RoomDetails /></StudentLayout>
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/student/fees"
          element={
            <ProtectedStudentRoute>
              <StudentLayout><FeeStatus /></StudentLayout>
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedStudentRoute>
              <StudentLayout><StudentAttendance /></StudentLayout>
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/student/complaints"
          element={
            <ProtectedStudentRoute>
              <StudentLayout><StudentDashboard /></StudentLayout>
            </ProtectedStudentRoute>
          }
        />

        <Route
          path="/student/maintenance"
          element={
            <ProtectedStudentRoute>
              <StudentLayout><StudentMaintenance /></StudentLayout>
            </ProtectedStudentRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
