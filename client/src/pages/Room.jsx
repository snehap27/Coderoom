import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

const DEFAULT_CODE = `function hello() {
  console.log("Welcome to CodeRoom");
}`;

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const socketRef = useRef(null);
  const codeRef = useRef(DEFAULT_CODE);
  const username =
    location.state?.username ||
    localStorage.getItem("coderoomUsername") ||
    "Guest";
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState(DEFAULT_CODE);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    const handleConnect = () => {
      console.log("Connected to server");
      socket.emit("join-room", {
        username,
        roomId,
      });
    };

    const handleRoomUsers = (nextUsers) => {
      setUsers(nextUsers);
    };

    const handleCodeUpdate = (nextCode) => {
      if (nextCode !== codeRef.current) {
        codeRef.current = nextCode;
        setCode(nextCode);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("room-users", handleRoomUsers);
    socket.on("code-update", handleCodeUpdate);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("room-users", handleRoomUsers);
      socket.off("code-update", handleCodeUpdate);
      socket.disconnect();
    };
  }, [roomId, username]);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
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

  const handleCodeChange = (value) => {
    const nextCode = value ?? "";
    codeRef.current = nextCode;
    setCode(nextCode);

    if (socketRef.current?.connected) {
      socketRef.current.emit("code-change", {
        roomId,
        code: nextCode,
      });
    }
  };

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

      <section className="placeholder-panel">
        <h2>Active Users</h2>
        <ul>
          {users.map((u) => (
            <li key={u.socketId}>{u.username}</li>
          ))}
        </ul>
      </section>

      <section className="placeholder-panel">
        <h2>Editor Area</h2>
        <Editor
          height="500px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{ minimap: { enabled: false } }}
        />
      </section>

      <section className="placeholder-panel">
        <h2>Output Area</h2>
        <p>coming soon</p>
      </section>
    </main>
  );
}

export default Room;
