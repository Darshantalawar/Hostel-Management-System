import { useEffect, useState } from "react";
import api from "../services/api";

// Maintenance requests are stored as Complaints whose complaintType starts
// with "Maintenance:" (see StudentMaintenance.jsx). This page gives admins
// a dedicated view/workflow for just that subset, without needing a new
// backend entity.
function Maintenance() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/api/complaints");
      setRequests(
        response.data.filter((c) =>
          (c.complaintType || "").startsWith("Maintenance:")
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const markResolved = async (request) => {
    try {
      await api.put(`/api/complaints/${request.id}`, {
        ...request,
        status: "RESOLVED"
      });
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Maintenance Requests
      </h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="bg-blue-600 text-white grid grid-cols-5 p-4 text-lg font-bold">
          <h2>Student ID</h2>
          <h2>Issue</h2>
          <h2>Description</h2>
          <h2>Status</h2>
          <h2>Action</h2>
        </div>

        {requests.map((request) => (
          <div
            key={request.id}
            className="grid grid-cols-5 p-4 border-b text-base items-center"
          >
            <p>{request.studentId}</p>
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
            <p>
              {request.status !== "RESOLVED" && (
                <button
                  onClick={() => markResolved(request)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Mark Resolved
                </button>
              )}
            </p>
          </div>
        ))}

        {requests.length === 0 && (
          <p className="p-6 text-center text-gray-500">No maintenance requests yet.</p>
        )}

      </div>
    </div>
  );
}

export default Maintenance;
