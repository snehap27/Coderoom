const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());

const DEFAULT_CODE = `function hello() {
  console.log("Welcome to CodeRoom");
}`;

const rooms = {};
const socketToUser = {};

const createRoom = () => {
  let id;

  do {
    id = Math.random().toString(36).substring(2, 8);
  } while (rooms[id]);

  rooms[id] = {
    roomId: id,
    users: [],
    code: DEFAULT_CODE,
  };

  return rooms[id];
};

app.post("/room", (req, res) => {
  const room = createRoom();
  res.status(201).json({ room });
});

app.get("/room/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  res.json(room);
});

const PORT = 3000;

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join-room", (data) => {
    console.log("join-room received");
    console.log(data);

    socketToUser[socket.id] = {
      username: data.username,
      roomId: data.roomId,
    };

    const room = rooms[data.roomId];

    if (!room) {
      console.error("Room not found");
      return;
    }

    socket.join(data.roomId);

    const existingUser = room.users.find((user) => user.socketId === socket.id);

    if (!existingUser) {
      room.users.push({
        username: data.username,
        socketId: socket.id,
      });
    }

    io.to(data.roomId).emit("room-users", room.users);
    socket.emit("code-update", room.code);
  });

  socket.on("code-change", (data) => {
    const room = rooms[data.roomId];

    if (!room) {
      return;
    }

    room.code = data.code;
    socket.to(data.roomId).emit("code-update", room.code);
  });

  socket.on("disconnect", () => {
    const user = socketToUser[socket.id];

    if (!user) return;

    const room = rooms[user.roomId];

    if (room) {
      const index = room.users.findIndex((u) => u.socketId === socket.id);

      if (index !== -1) {
        room.users.splice(index, 1);
      }

      io.to(user.roomId).emit("room-users", room.users);
      console.log("Updated room:", room);
    }

    delete socketToUser[socket.id];
    console.log("Current socket registry:", socketToUser);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
