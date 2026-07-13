import { useEffect, useState } from "react";
import api from "../services/api";

function Attendance() {

  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const [attendanceData, setAttendanceData] = useState({
    studentId: "",
    status: "PRESENT"
  });

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {

    try {

      const response = await api.get(
        "/api/students"
      );

      setStudents(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async () => {

    try {

      const response = await api.get(
        "/api/attendance"
      );

      setAttendance(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {

    setAttendanceData({
      ...attendanceData,
      [e.target.name]: e.target.value
    });
  };

  const markAttendance = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/api/attendance",
        attendanceData
      );

      alert("Attendance Marked");

      fetchAttendance();

    } catch (error) {
      console.error(error);
    }
  };

  const getStudentName = (studentId) => {

    const student = students.find(
      student => student.id === Number(studentId)
    );

    return student
      ? student.fullName
      : "Unknown";
  };

  const presentCount = attendance.filter(
    item => item.status === "PRESENT"
  ).length;

  const absentCount = attendance.filter(
    item => item.status === "ABSENT"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Attendance Management
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-green-600">
            Present
          </h2>

          <p className="text-4xl font-bold mt-3">
            {presentCount}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-red-500">
            Absent
          </h2>

          <p className="text-4xl font-bold mt-3">
            {absentCount}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-blue-600">
            Total Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {attendance.length}
          </p>

        </div>

      </div>

      {/* Attendance Form */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <form
          onSubmit={markAttendance}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >

          <select
            name="studentId"
            value={attendanceData.studentId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Student
            </option>

            {students.map((student) => (

              <option
                key={student.id}
                value={student.id}
              >
                {student.fullName}
              </option>

            ))}

          </select>

          <select
            name="status"
            value={attendanceData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="PRESENT">
              PRESENT
            </option>

            <option value="ABSENT">
              ABSENT
            </option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Mark Attendance
          </button>

        </form>

      </div>

      {/* Attendance Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => (

              <tr
                key={item.id}
                className="text-center border-b hover:bg-gray-100"
              >

                <td className="p-4 font-semibold">
                  {getStudentName(item.studentId)}
                </td>

                <td className="p-4">
                  {item.attendanceDate}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      item.status === "PRESENT"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Attendance;