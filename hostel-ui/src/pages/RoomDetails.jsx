import { useEffect, useState } from "react";
import api from "../services/api";
import { PageLoader } from "../components/ui/Loader";
import Card from "../components/ui/Card";
import { Users, DoorOpen } from "lucide-react";

function RoomDetails() {

  const [room, setRoom] = useState(null);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  const fetchRoomDetails = async () => {
    try {
      // Own profile (for roomId) — never the admin-only full student list.
      const meRes = await api.get("/api/students/me");
      const me = meRes.data;

      if (me && me.roomId) {
        const [roomsRes, occupantsRes] = await Promise.all([
          api.get("/api/rooms"),
          api.get(`/api/rooms/${me.roomId}/occupants`)
        ]);

        setRoom(roomsRes.data.find((r) => r.id === me.roomId) || null);
        setRoommates(occupantsRes.data.filter((s) => s.id !== me.id));
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader label="Loading room details..." />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">
        Room Details
      </h1>

      {!room ? (
        <Card className="p-8 text-slate-500 dark:text-slate-400">
          No room has been allocated to you yet. Please contact the hostel admin.
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white">
                <DoorOpen className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Room {room.roomNumber}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div><p className="text-slate-400">Type</p><p className="font-semibold text-slate-800 dark:text-slate-100">{room.roomType}</p></div>
              <div><p className="text-slate-400">Capacity</p><p className="font-semibold text-slate-800 dark:text-slate-100">{room.capacity}</p></div>
              <div><p className="text-slate-400">Occupied</p><p className="font-semibold text-slate-800 dark:text-slate-100">{room.occupied}</p></div>
              <div><p className="text-slate-400">Available Beds</p><p className="font-semibold text-slate-800 dark:text-slate-100">{room.availableBeds}</p></div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Roommates</h2>
            </div>
            {roommates.length === 0 ? (
              <p className="text-slate-400 text-sm">No roommates yet.</p>
            ) : (
              <ul className="space-y-3">
                {roommates.map((mate) => (
                  <li key={mate.id} className="flex items-center gap-3 text-sm">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-300">
                      {mate.fullName?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-slate-700 dark:text-slate-200">{mate.fullName}</span>
                    <span className="text-slate-400">— {mate.course}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default RoomDetails;
