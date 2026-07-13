import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentStudent } from "../services/auth";

function StudentMaintenance() {

  const [selectedIssue, setSelectedIssue] = useState("");
  const [description, setDescription] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const logged = getCurrentStudent();

    try {
      const response = await api.get("/api/complaints");
      setRequests(
        response.data.filter(
          (c) =>
            c.studentId === logged.id &&
            (c.complaintType || "").startsWith("Maintenance:")
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const submitRequest = async () => {
    if (!selectedIssue || !description) {
      alert("Please fill all fields");
      return;
    }

    const logged = getCurrentStudent();

    const newRequest = {
      studentId: logged.id,
      complaintType: `Maintenance: ${selectedIssue}`,
      description,
      assignedStaff: "Not Assigned",
      status: "PENDING",
      complaintDate: new Date().toISOString().split("T")[0]
    };

    try {
      await api.post("/api/complaints", newRequest);
      alert("Maintenance Request Submitted");
      setSelectedIssue("");
      setDescription("");
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-600 mb-10">
        Maintenance Request
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-xl mb-10">

        <div className="space-y-5">

          <select
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
            className="w-full p-4 border rounded-xl text-lg"
          >
            <option value="">Select Issue Type</option>
            <option>Furniture Repair</option>
            <option>Plumbing Issue</option>
            <option>Electrical Fault</option>
            <option>Appliance Repair</option>
            <option>Other</option>
          </select>

          <textarea
            placeholder="Describe the maintenance issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border rounded-xl text-lg h-40"
          />

          <button
            onClick={submitRequest}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-blue-700"
          >
            Submit Request
          </button>

        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="bg-blue-600 text-white grid grid-cols-4 p-4 text-lg font-bold">
          <h2>Issue</h2>
          <h2>Description</h2>
          <h2>Status</h2>
          <h2>Date</h2>
        </div>

        {requests.map((request) => (
          <div key={request.id} className="grid grid-cols-4 p-4 border-b text-base items-center">
            <p>{request.complaintType.replace("Maintenance: ", "")}</p>
            <p>{request.description}</p>
            <p>
              <span
                className={`px-3 py-1 rounded-full text-white font-bold text-sm ${
                  request.status === "RESOLVED" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {request.status}
              </span>
            </p>
            <p>{request.complaintDate}</p>
          </div>
        ))}

        {requests.length === 0 && (
          <p className="p-6 text-center text-gray-500">No maintenance requests yet.</p>
        )}
      </div>

    </div>
  );
}

export default StudentMaintenance;
