import { useEffect, useState } from "react";

import api from "../services/api";

function StudentDashboard() {

  const [student, setStudent] = useState(null);

  const [selectedProblem, setSelectedProblem] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {

    const loggedStudent =
      JSON.parse(
        localStorage.getItem("student")
      );

    setStudent(loggedStudent);

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const response = await api.get(

        "/api/complaints"
      );

      const loggedStudent =
        JSON.parse(
          localStorage.getItem("student")
        );

      const studentComplaints =
        response.data.filter(

          complaint =>

            complaint.studentId ===
            loggedStudent.id
        );

      setComplaints(studentComplaints);

    } catch (error) {

      console.error(error);
    }
  };

  const submitComplaint = async () => {

    if (
      !selectedProblem ||
      !description
    ) {

      alert("Please fill all fields");

      return;
    }

    const newComplaint = {

      studentId: student.id,

      complaintType: selectedProblem,

      description: description,

      assignedStaff: "Not Assigned",

      status: "PENDING",

      complaintDate: new Date()
        .toISOString()
        .split("T")[0]
    };

    try {

      await api.post(

        "/api/complaints",

        newComplaint
      );

      alert("Complaint Submitted");

      setSelectedProblem("");

      setDescription("");

      fetchComplaints();

    } catch (error) {

      console.error(error);
    }
  };

  if (!student) {

    return <h1>Loading...</h1>;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Heading */}

      <h1 className="text-3xl font-bold text-blue-600 mb-10">

        Student Complaint Portal

      </h1>

      {/* Student Details */}

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">

        <h2 className="text-2xl font-bold mb-6">

          Welcome {student.fullName}

        </h2>

        <div className="space-y-4 text-lg">

          <p>
            <span className="font-bold">
              Email:
            </span>

            {" "}
            {student.email}
          </p>

          <p>
            <span className="font-bold">
              Room:
            </span>

            {" "}
            {student.roomId}
          </p>

        </div>

      </div>

      {/* Raise Complaint */}

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">

        <h2 className="text-2xl font-bold text-red-500 mb-6">

          Raise Complaint

        </h2>

        <div className="space-y-5">

          {/* Select */}

          <select

            value={selectedProblem}

            onChange={(e) =>
              setSelectedProblem(
                e.target.value
              )
            }

            className="w-full p-4 border rounded-xl text-lg"
          >

            <option value="">
              Select Problem
            </option>

            <option>
              Wi-Fi Problem
            </option>

            <option>
              Water Issue
            </option>

            <option>
              Electricity Issue
            </option>

            <option>
              Cleaning Request
            </option>

          </select>

          {/* Description */}

          <textarea

            placeholder="Describe your problem"

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }

            className="w-full p-4 border rounded-xl text-lg h-40"
          />

          {/* Button */}

          <button

            onClick={submitComplaint}

            className="bg-red-500 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-red-600"
          >

            Submit Complaint

          </button>

        </div>

      </div>

      {/* Complaint History */}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Table Header */}

        <div className="bg-blue-600 text-white grid grid-cols-5 p-4 text-lg font-bold">

          <h2>Type</h2>

          <h2>Description</h2>

          <h2>Staff</h2>

          <h2>Status</h2>

          <h2>Date</h2>

        </div>

        {/* Complaint Rows */}

        {

          complaints.map((complaint) => (

            <div

              key={complaint.id}

              className="grid grid-cols-5 p-4 border-b text-base items-center"
            >

              <p>
                {complaint.complaintType}
              </p>

              <p>
                {complaint.description}
              </p>

              <p>
                {complaint.assignedStaff}
              </p>

              <p>

                <span
                  className={`px-3 py-1 rounded-full text-white font-bold text-sm ${
                    complaint.status ===
                    "RESOLVED"

                      ? "bg-green-500"

                      : "bg-red-500"
                  }`}
                >

                  {complaint.status}

                </span>

              </p>

              <p>
                {complaint.complaintDate}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default StudentDashboard;