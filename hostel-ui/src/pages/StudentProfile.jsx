import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentStudent } from "../services/auth";
import { PageLoader } from "../components/ui/Loader";
import Card from "../components/ui/Card";

function StudentProfile() {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Own profile only — resolved server-side from the JWT, so this
      // works for a STUDENT token (GET /api/students would 403).
      const response = await api.get("/api/students/me");
      setStudent(response.data);
    } catch (error) {
      console.error(error);
      // Fall back to the minimal data captured at login so the page
      // still renders something rather than breaking.
      setStudent(getCurrentStudent());
    }
  };

  if (!student) {
    return <PageLoader label="Loading profile..." />;
  }

  const fields = [
    ["Full Name", student.fullName],
    ["Email", student.email],
    ["Phone", student.phone],
    ["Gender", student.gender],
    ["College", student.collegeName],
    ["Course", student.course],
    ["Address", student.address],
    ["Room", student.roomId ? `Room ${student.roomId}` : "Not Assigned"]
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">
        Welcome, {student.fullName}
      </h1>

      <Card className="p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">My Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {fields.map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <span className="font-semibold text-slate-500 dark:text-slate-400">{label}</span>
              <span className="text-slate-800 dark:text-slate-100">{value || "-"}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default StudentProfile;
