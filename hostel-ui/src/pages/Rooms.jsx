import { useEffect, useState } from "react";
import api from "../services/api";

function Rooms() {

  const [rooms, setRooms] = useState([]);

  const [students, setStudents] = useState([]);

  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    occupied: ""
  });

  const [allocation, setAllocation] = useState({
    studentId: "",
    roomId: ""
  });

  useEffect(() => {
    fetchRooms();
    fetchStudents();
  }, []);

  const fetchRooms = async () => {

    try {

      const response = await api.get(
        "/api/rooms"
      );

      setRooms(response.data);

    } catch (error) {
      console.error(error);
    }
  };

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

  const handleChange = (e) => {

    setRoom({
      ...room,
      [e.target.name]: e.target.value
    });
  };

  const addRoom = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/api/rooms",
        room
      );

      alert("Room Added Successfully");

      setRoom({
        roomNumber: "",
        roomType: "",
        capacity: "",
        occupied: ""
      });

      fetchRooms();

    } catch (error) {
      console.error(error);
    }
  };

  const allocateRoom = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        `/api/rooms/allocate?studentId=${allocation.studentId}&roomId=${allocation.roomId}`
      );

      alert(response.data);

      setAllocation({
        studentId: "",
        roomId: ""
      });

      fetchRooms();
      fetchStudents();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Room Management
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-blue-600">
            Total Rooms
          </h2>

          <p className="text-4xl font-bold mt-3">
            {rooms.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-green-600">
            Available Rooms
          </h2>

          <p className="text-4xl font-bold mt-3">
            {
              rooms.filter(
                room => room.availableBeds > 0
              ).length
            }
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <h2 className="text-xl font-bold text-red-500">
            Full Rooms
          </h2>

          <p className="text-4xl font-bold mt-3">
            {
              rooms.filter(
                room => room.availableBeds === 0
              ).length
            }
          </p>

        </div>

      </div>

      {/* Add Room Form */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Add Room
        </h2>

        <form
          onSubmit={addRoom}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >

          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={room.roomNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="roomType"
            placeholder="Room Type"
            value={room.roomType}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={room.capacity}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="occupied"
            placeholder="Occupied"
            value={room.occupied}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 md:col-span-4"
          >
            Add Room
          </button>

        </form>

      </div>

      {/* Allocate Room */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-2xl font-bold mb-6 text-green-600">
          Allocate Room
        </h2>

        <form
          onSubmit={allocateRoom}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >

          <select
            value={allocation.studentId}
            onChange={(e) =>
              setAllocation({
                ...allocation,
                studentId: e.target.value
              })
            }
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Student
            </option>

            {students
              .filter(student => !student.roomId)
              .map((student) => (

              <option
                key={student.id}
                value={student.id}
              >
                {student.fullName}
              </option>

            ))}

          </select>

          <select
            value={allocation.roomId}
            onChange={(e) =>
              setAllocation({
                ...allocation,
                roomId: e.target.value
              })
            }
            className="border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Room
            </option>

            {rooms
              .filter(room => room.availableBeds > 0)
              .map((room) => (

              <option
                key={room.id}
                value={room.id}
              >
                Room {room.roomNumber}
              </option>

            ))}

          </select>

          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Assign Room
          </button>

        </form>

      </div>

      {/* Room Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {rooms.map((room) => (

          <div
            key={room.id}
            className="bg-white p-6 rounded-xl shadow-lg"
          >

            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Room {room.roomNumber}
            </h2>

            <p>
              <strong>Type:</strong> {room.roomType}
            </p>

            <p>
              <strong>Capacity:</strong> {room.capacity}
            </p>

            <p>
              <strong>Occupied:</strong> {room.occupied}
            </p>

            <p>
              <strong>Available Beds:</strong> {room.availableBeds}
            </p>

            <div className="mt-4">

              {room.availableBeds > 0 ? (

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Available
                </span>

              ) : (

                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  Full
                </span>

              )}

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Rooms;