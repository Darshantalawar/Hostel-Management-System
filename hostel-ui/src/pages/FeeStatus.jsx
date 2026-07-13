import { useEffect, useState } from "react";
import api from "../services/api";
import { getCurrentStudent } from "../services/auth";

function FeeStatus() {

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const logged = getCurrentStudent();

    try {
      const response = await api.get("/api/fees");
      setFees(response.data.filter((fee) => fee.studentId === logged.id));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="p-8 text-2xl">Loading...</h1>;
  }

  const totalPaid = fees.filter((f) => f.status === "PAID").reduce((s, f) => s + f.amount, 0);
  const totalPending = fees.filter((f) => f.status === "PENDING").reduce((s, f) => s + f.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">Fee Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold text-green-600">Paid</h2>
          <p className="text-4xl font-bold mt-3">₹ {totalPaid}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-bold text-red-500">Pending</h2>
          <p className="text-4xl font-bold mt-3">₹ {totalPending}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 text-white grid grid-cols-3 p-4 text-lg font-bold">
          <h2>Amount</h2>
          <h2>Payment Date</h2>
          <h2>Status</h2>
        </div>

        {fees.map((fee) => (
          <div key={fee.id} className="grid grid-cols-3 p-4 border-b text-base items-center">
            <p>₹ {fee.amount}</p>
            <p>{fee.paymentDate || "-"}</p>
            <p>
              <span
                className={`px-3 py-1 rounded-full text-white font-bold text-sm ${
                  fee.status === "PAID" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {fee.status}
              </span>
            </p>
          </div>
        ))}

        {fees.length === 0 && (
          <p className="p-6 text-center text-gray-500">No fee records found.</p>
        )}
      </div>

    </div>
  );
}

export default FeeStatus;
