import { useEffect, useState } from "react";
import api from "../services/api";

function Complaints() {

  const [students, setStudents] =
    useState([]);

  const [complaints, setComplaints] =
    useState([]);

  const [editingComplaint, setEditingComplaint] =
    useState(null);

  useEffect(() => {

    fetchStudents();

    fetchComplaints();

  }, []);

  // Fetch Students

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

  // Fetch Complaints

  const fetchComplaints = async () => {

    try {

      const response = await api.get(
        "/api/complaints"
      );

      setComplaints(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // Open Manage Modal

  const handleEdit = (complaint) => {

    setEditingComplaint(complaint);
  };

  // Update Complaint

  const updateComplaint = async () => {

    try {

      await api.put(

        `/api/complaints/${editingComplaint.id}`,

        editingComplaint
      );

      alert("Complaint Updated");

      setEditingComplaint(null);

      fetchComplaints();

    } catch (error) {

      console.error(error);
    }
  };

  // Get Student Name

  const getStudentName = (studentId) => {

    const student = students.find(

      student =>
        student.id === Number(studentId)
    );

    return student
      ? student.fullName
      : "Unknown";
  };

  // Statistics

  const pendingCount = complaints.filter(

    complaint =>
      complaint.status === "PENDING"

  ).length;

  const resolvedCount = complaints.filter(

    complaint =>
      complaint.status === "RESOLVED"

  ).length;

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Heading */}

      <h1 className="text-5xl font-bold text-center text-blue-600 mb-10">

        Complaint Management

      </h1>

      {/* Analytics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Pending */}

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

          <h2 className="text-2xl font-bold text-yellow-500">

            Pending Complaints

          </h2>

          <p className="text-5xl font-bold mt-5">

            {pendingCount}

          </p>

        </div>

        {/* Resolved */}

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

          <h2 className="text-2xl font-bold text-green-600">

            Resolved Complaints

          </h2>

          <p className="text-5xl font-bold mt-5">

            {resolvedCount}

          </p>

        </div>

        {/* Total */}

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

          <h2 className="text-2xl font-bold text-blue-600">

            Total Complaints

          </h2>

          <p className="text-5xl font-bold mt-5">

            {complaints.length}

          </p>

        </div>

      </div>

      {/* Edit Modal */}

      {

        editingComplaint && (

          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl p-8 w-[500px]">

              <h2 className="text-3xl font-bold text-blue-600 mb-6">

                Manage Complaint

              </h2>

              <div className="space-y-5">

                {/* Assign Staff */}

                <input
                  type="text"
                  placeholder="Assigned Staff"

                  value={
                    editingComplaint.assignedStaff || ""
                  }

                  onChange={(e) =>
                    setEditingComplaint({

                      ...editingComplaint,

                      assignedStaff:
                        e.target.value
                    })
                  }

                  className="w-full border p-4 rounded-xl"
                />

                {/* Status */}

                <select

                  value={editingComplaint.status}

                  onChange={(e) =>
                    setEditingComplaint({

                      ...editingComplaint,

                      status:
                        e.target.value
                    })
                  }

                  className="w-full border p-4 rounded-xl"
                >

                  <option value="PENDING">

                    PENDING

                  </option>

                  <option value="IN_PROGRESS">

                    IN PROGRESS

                  </option>

                  <option value="RESOLVED">

                    RESOLVED

                  </option>

                </select>

                {/* Buttons */}

                <div className="flex gap-4">

                  <button

                    onClick={updateComplaint}

                    className="bg-green-600 text-white px-6 py-3 rounded-xl w-full"
                  >

                    Update

                  </button>

                  <button

                    onClick={() =>
                      setEditingComplaint(null)
                    }

                    className="bg-red-500 text-white px-6 py-3 rounded-xl w-full"
                  >

                    Cancel

                  </button>

                </div>

              </div>

            </div>

          </div>
        )
      }

      {/* Complaint Table */}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          {/* Table Header */}

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">

                Student

              </th>

              <th className="p-4 text-left">

                Type

              </th>

              <th className="p-4 text-left">

                Description

              </th>

              <th className="p-4 text-left">

                Staff

              </th>

              <th className="p-4 text-left">

                Status

              </th>

              <th className="p-4 text-left">

                Date

              </th>

              <th className="p-4 text-left">

                Action

              </th>

            </tr>

          </thead>

          {/* Table Body */}

          <tbody>

            {

              complaints.map((complaint) => (

                <tr

                  key={complaint.id}

                  className="border-b hover:bg-gray-100"
                >

                  {/* Student */}

                  <td className="p-4">

                    {

                      getStudentName(
                        complaint.studentId
                      )
                    }

                  </td>

                  {/* Type */}

                  <td className="p-4">

                    {complaint.complaintType}

                  </td>

                  {/* Description */}

                  <td className="p-4">

                    {complaint.description}

                  </td>

                  {/* Staff */}

                  <td className="p-4">

                    {

                      complaint.assignedStaff ||

                      "Not Assigned"
                    }

                  </td>

                  {/* Status */}

                  <td className="p-4">

                    <span
                      className={`px-4 py-2 rounded-full text-white ${
                        complaint.status === "RESOLVED"

                          ? "bg-green-600"

                          : complaint.status === "IN_PROGRESS"

                          ? "bg-yellow-500"

                          : "bg-red-500"
                      }`}
                    >

                      {complaint.status}

                    </span>

                  </td>

                  {/* Date */}

                  <td className="p-4">

                    {complaint.complaintDate}

                  </td>

                  {/* Action */}

                  <td className="p-4">

                    <button

                      onClick={() =>
                        handleEdit(complaint)
                      }

                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >

                      Manage

                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Complaints;