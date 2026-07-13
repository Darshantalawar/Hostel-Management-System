import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentStudent } from "../services/auth";

function StudentAttendance() {

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const logged = getCurrentStudent();

    try {
      const response = await api.get("/api/attendance");
      setRecords(response.data.filter((a) => a.studentId === logged.id));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="p-8 text-2xl">Loading...</h1>;
  }

  const presentCount = records.filter((r) => r.status === "PRESENT").length;
  const absentCount = records.filter((r) => r.status === "ABSENT").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">My Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold text-green-600">Present</h2>
          <p className="text-4xl font-bold mt-3">{presentCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold text-red-500">Absent</h2>
          <p className="text-4xl font-bold mt-3">{absentCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 text-white grid grid-cols-2 p-4 text-lg font-bold">
          <h2>Date</h2>
          <h2>Status</h2>
        </div>

        {records.map((record) => (
          <div key={record.id} className="grid grid-cols-2 p-4 border-b text-base items-center">
            <p>{record.attendanceDate}</p>
            <p>
              <span
                className={`px-3 py-1 rounded-full text-white font-bold text-sm ${
                  record.status === "PRESENT" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {record.status}
              </span>
            </p>
          </div>
        ))}

        {records.length === 0 && (
          <p className="p-6 text-center text-gray-500">No attendance records yet.</p>
        )}
      </div>

    </div>
  );
}

export default StudentAttendance;
