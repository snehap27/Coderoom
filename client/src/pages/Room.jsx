import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const socketRef = useRef(null);
  const username =  // Get the username from location state, localStorage, or default to "Guest"
    location.state?.username || 
    localStorage.getItem("coderoomUsername") || 
    "Guest";
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  /*
    This useEffect hook establishes a WebSocket connection to the server using Socket.IO when the component mounts.
    It emits a "join-room" event to the server with the username and roomId, allowing the server to track which users are in which rooms. 
    The connection is cleaned up when the component unmounts to prevent memory leaks.
  */
  useEffect(() => {
  socketRef.current = io("http://localhost:3000");

  socketRef.current.on("connect", () => {
    console.log("Connected to server");

    socketRef.current.emit("join-room", {
      username,
      roomId,
    });
  });

  // Listen for "room-users" events from the server to update the list of users in the room in real-time.
  socketRef.current.on("room-users", (users) => {
    setUsers(users);
  });

  return () => {
    socketRef.current?.disconnect();
  };
}, [roomId, username]);

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
        <p>Users: {users.length}</p>
      </section>

      {/* 
        The following sections are placeholders for the active users list, code editor area, and output area.
        The active users list will display the usernames of all users currently in the room, which is updated in real-time using Socket.IO events.
       */}
      <section className="placeholder-panel">
        <h2>Active Users</h2>
        <ul>
          {users.map((u) => ( // Render each user's username in the list of active users. Each list item has a unique key based on the user's socket ID to help React efficiently update the list when users join or leave the room.
            <li key={u.socketId}>{u.username}</li> // this line of code renders a list item for each user in the users array, displaying their username. The key prop is set to the user's socketId to ensure that each list item has a unique identifier, which helps React optimize rendering when the list changes.
          ))}
        </ul>
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
