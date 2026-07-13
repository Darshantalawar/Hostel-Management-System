import { useEffect, useState } from "react";
import api from "../services/api";

function Fees() {

  const [students, setStudents] = useState([]);

  const [fees, setFees] = useState([]);

  const [feeData, setFeeData] = useState({
    studentId: "",
    amount: "",
    status: "PAID"
  });

  useEffect(() => {
    fetchStudents();
    fetchFees();
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

  const fetchFees = async () => {

    try {

      const response = await api.get(
        "/api/fees"
      );

      setFees(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {

    setFeeData({
      ...feeData,
      [e.target.name]: e.target.value
    });
  };

  const addFee = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/api/fees",
        feeData
      );

      alert("Fee Added Successfully");

      setFeeData({
        studentId: "",
        amount: "",
        status: "PAID"
      });

      fetchFees();

    } catch (error) {
      console.error(error);
    }
  };

  const clearPendingFee = async (id) => {

    try {

      await api.put(
        `/api/fees/${id}`
      );

      alert("Fee Cleared Successfully");

      fetchFees();

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

  const totalCollection = fees
    .filter(fee => fee.status === "PAID")
    .reduce(
      (total, fee) => total + fee.amount,
      0
    );

  const pendingAmount = fees
    .filter(fee => fee.status === "PENDING")
    .reduce(
      (total, fee) => total + fee.amount,
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Fee Management
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-green-600">
            Total Collection
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹ {totalCollection}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-red-500">
            Pending Amount
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹ {pendingAmount}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-blue-600">
            Total Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {fees.length}
          </p>

        </div>

      </div>

      {/* Add Fee Form */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <form
          onSubmit={addFee}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >

          <select
            name="studentId"
            value={feeData.studentId}
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

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={feeData.amount}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <select
            name="status"
            value={feeData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Fee
          </button>

        </form>

      </div>

      {/* Fee Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {fees.map((fee) => (

              <tr
                key={fee.id}
                className="text-center border-b hover:bg-gray-100"
              >

                <td className="p-4 font-semibold">
                  {getStudentName(fee.studentId)}
                </td>

                <td className="p-4">
                  ₹ {fee.amount}
                </td>

                <td className="p-4">
                  {fee.paymentDate}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      fee.status === "PAID"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {fee.status}
                  </span>

                </td>

                <td className="p-4">

                  {fee.status === "PENDING" ? (

                    <button
                      onClick={() =>
                        clearPendingFee(fee.id)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Clear Fee
                    </button>

                  ) : (

                    <span className="text-green-600 font-semibold">
                      Completed
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Fees;