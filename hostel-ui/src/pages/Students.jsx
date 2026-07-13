import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {

  const [students, setStudents] = useState([]);

  const [filteredStudents, setFilteredStudents] =
    useState([]);

  const [search, setSearch] = useState("");

  const [genderFilter, setGenderFilter] =
    useState("");

  const [editingStudent, setEditingStudent] =
    useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {

    filterStudents();

  }, [search, genderFilter, students]);

  const fetchStudents = async () => {

    try {

      const response = await api.get(
        "/api/students"
      );

      setStudents(response.data);

      setFilteredStudents(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const filterStudents = () => {

    let filtered = students;

    if (search !== "") {

      filtered = filtered.filter(student =>

        student.fullName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (genderFilter !== "") {

      filtered = filtered.filter(student =>

        student.gender === genderFilter
      );
    }

    setFilteredStudents(filtered);
  };

  // DELETE

  const deleteStudent = async (id) => {

    try {

      await api.delete(
        `/api/students/${id}`
      );

      fetchStudents();

    } catch (error) {
      console.error(error);
    }
  };

  // EDIT

  const handleEdit = (student) => {

    setEditingStudent(student);
  };

  // UPDATE

  const updateStudent = async () => {

    try {

      await api.put(

        `/api/students/${editingStudent.id}`,

        editingStudent
      );

      setEditingStudent(null);

      fetchStudents();

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-5xl font-bold text-center text-blue-600 mb-10">

        Students Management

      </h1>

      {/* Search + Filter */}

      <div className="bg-white p-6 rounded-2xl shadow-xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-4 rounded-xl text-lg"
        />

        <select
          value={genderFilter}
          onChange={(e) =>
            setGenderFilter(e.target.value)
          }
          className="border p-4 rounded-xl text-lg"
        >

          <option value="">
            All Genders
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

        </select>

      </div>

      {/* EDIT MODAL */}

      {editingStudent && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[500px]">

            <h2 className="text-3xl font-bold text-blue-600 mb-6">

              Edit Student

            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={editingStudent.fullName}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    fullName: e.target.value
                  })
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="email"
                value={editingStudent.email}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    email: e.target.value
                  })
                }
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="text"
                value={editingStudent.phone}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    phone: e.target.value
                  })
                }
                className="w-full border p-4 rounded-xl"
              />

              <div className="flex gap-4">

                <button
                  onClick={updateStudent}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl w-full"
                >

                  Update

                </button>

                <button
                  onClick={() =>
                    setEditingStudent(null)
                  }
                  className="bg-red-500 text-white px-6 py-3 rounded-xl w-full"
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Students Table */}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Gender
              </th>

              <th className="p-4 text-left">
                Course
              </th>

              <th className="p-4 text-left">
                Room
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student) => (

              <tr
                key={student.id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4">
                  {student.fullName}
                </td>

                <td className="p-4">
                  {student.email}
                </td>

                <td className="p-4">
                  {student.phone}
                </td>

                <td className="p-4">
                  {student.gender}
                </td>

                <td className="p-4">
                  {student.course}
                </td>

                <td className="p-4">

                  {student.roomId
                    ? `Room ${student.roomId}`
                    : "Not Assigned"}

                </td>

                <td className="p-4 flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(student)
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >

                    Delete

                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;