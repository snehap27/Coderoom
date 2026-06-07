const express = require("express");
const cors = require("cors");

const app = express();

// frontend runs on 5173, backend runs on 3000
// cors is needed to allow the frontend to make requests to the backend
app.use(cors());
app.use(express.json());

const createRoom = () => ({
  roomId: Math.random().toString(36).substring(2, 8),
  users: 1,
});

// In-memory room data. This will reset every time the server restarts.
const rooms = {};

app.get("/room", (req, res) => {
  res.json(Object.values(rooms));
});

app.get("/room/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (!room) {
    return res.status(404).json({
      message: "Room not found",
    });
  }

  res.json(room);
});

app.post("/room", (req, res) => {
  const room = createRoom();
  rooms[room.roomId] = room;

  res.json({
    message: "Room created",
    room,
  });
});

app.post("/join", (req, res) => {
  const { roomId } = req.body;
  const room = rooms[roomId];

  // Only existing rooms can be joined.
  if (!room) {
    return res.status(404).json({
      message: "Room not found",
    });
  }

  // This is a temporary count until Socket.io presence is added.
  room.users += 1;

  res.json({
    message: "User joined room",
    room,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
