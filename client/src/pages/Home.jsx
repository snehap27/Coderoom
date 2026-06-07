import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your name before creating a room.");
      return;
    }

    setError("");
    localStorage.setItem("coderoomUsername", trimmedUsername);

    fetch("http://localhost:3000/room", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/room/${data.room.roomId}`, {
          state: { username: trimmedUsername },
        });
      });
  };

  const joinRoom = (event) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedRoomId = roomId.trim();

    if (!trimmedUsername) {
      setError("Please enter your name before joining a room.");
      return;
    }

    if (!trimmedRoomId) {
      setError("Please enter a room ID.");
      return;
    }

    setError("");
    localStorage.setItem("coderoomUsername", trimmedUsername);

    // Tell the backend this user joined before navigating into the room.
    fetch("http://localhost:3000/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: trimmedRoomId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Room not found");
        }

        return res.json();
      })
      .then(() => {
        navigate(`/room/${trimmedRoomId}`, {
          state: { username: trimmedUsername },
        });
      })
      .catch(() => {
        setError("Room not found. Please check the room ID.");
      });
  };

  return (
    <main className="page">
      <h1>CodeRoom</h1>

      <div className="actions">
        <label>
          Name
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Akanksha"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="button" onClick={createRoom}>
          Create Room
        </button>

        <form onSubmit={joinRoom}>
          <input
            type="text"
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
            placeholder="Enter Room ID"
          />
          <button type="submit">Join Room</button>
        </form>
      </div>
    </main>
  );
}

export default Home;
