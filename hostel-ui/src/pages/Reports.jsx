import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const [studentsRes, roomsRes, feesRes, attendanceRes, complaintsRes] =
        await Promise.all([
          api.get("/api/students"),
          api.get("/api/rooms"),
          api.get("/api/fees"),
          api.get("/api/attendance"),
          api.get("/api/complaints")
        ]);

      const fees = feesRes.data;
      const attendance = attendanceRes.data;
      const complaints = complaintsRes.data;

      setData({
        totalStudents: studentsRes.data.length,
        totalRooms: roomsRes.data.length,
        occupiedRooms: roomsRes.data.filter((r) => r.availableBeds === 0).length,
        totalCollected: fees
          .filter((f) => f.status === "PAID")
          .reduce((sum, f) => sum + f.amount, 0),
        totalPending: fees
          .filter((f) => f.status === "PENDING")
          .reduce((sum, f) => sum + f.amount, 0),
        presentCount: attendance.filter((a) => a.status === "PRESENT").length,
        absentCount: attendance.filter((a) => a.status === "ABSENT").length,
        openComplaints: complaints.filter((c) => c.status !== "RESOLVED").length,
        resolvedComplaints: complaints.filter((c) => c.status === "RESOLVED").length
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-blue-600">
        Generating Report...
      </div>
    );
  }

  const rows = [
    ["Total Students", data.totalStudents],
    ["Total Rooms", data.totalRooms],
    ["Occupied Rooms", data.occupiedRooms],
    ["Fees Collected", `₹ ${data.totalCollected}`],
    ["Fees Pending", `₹ ${data.totalPending}`],
    ["Attendance Present (records)", data.presentCount],
    ["Attendance Absent (records)", data.absentCount],
    ["Open Complaints", data.openComplaints],
    ["Resolved Complaints", data.resolvedComplaints]
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Hostel Reports</h1>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
        >
          Print / Export
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b">
                <td className="p-4 font-semibold text-gray-700">{label}</td>
                <td className="p-4 text-right font-bold text-blue-600">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Reports;
