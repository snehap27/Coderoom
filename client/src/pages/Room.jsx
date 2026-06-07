import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const username =
    location.state?.username || localStorage.getItem("coderoomUsername") || "Guest";
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Validate the room on page load and after refreshes.
    fetch(`http://localhost:3000/room/${roomId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Room not found");
        }

        return res.json();
      })
      .then((data) => {
        setRoom(data);
        setError("");
      })
      .catch(() => {
        setRoom(null);
        setError("Room Not Found");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [roomId]);

  if (isLoading) {
    return (
      <main className="page">
        <p>Loading room...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <h1>{error}</h1>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="room-header">
        <h1>Room: {room.roomId}</h1>
        <p>Welcome, {username}</p>
        <p>Users: {room.users}</p>
      </section>

      <section className="placeholder-panel">
        <h2>Editor Area</h2>
        <p>coming soon</p>
      </section>

      <section className="placeholder-panel">
        <h2>Output Area</h2>
        <p>coming soon</p>
      </section>
    </main>
  );
}

export default Room;
