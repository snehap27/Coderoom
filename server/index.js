const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app); // create an HTTP server using the Express app, this allows us to use the same server for both HTTP requests and WebSocket connections in the future if needed
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // allow requests from the frontend development server
  },
}); // create a Socket.IO server instance linked to the HTTP server

// frontend runs on 5173, backend runs on 3000
// cors is needed to allow the frontend to make requests to the backend
app.use(cors());
app.use(express.json());

// in-memory room data store; in a real application this would be stored in a database
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

// run this function whenever a new client connects
io.on("connection", (socket) => {
  console.log("User connected");

  // listen for "join-room" events from the client and log the data to the console
  socket.on("join-room", (data) => {
    console.log("join-room received"); // console prints "User joined room:" followed by the data sent from the client when a user joins a room
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

    socket.join(data.roomId); // join the Socket.IO room with the specified roomId

    room.users.push({
      username: data.username,
      socketId: socket.id,
    });

    // broadcast the updated user list to all clients in the room
    io.to(data.roomId).emit("room-users", room.users);

    console.log(room);
    console.log(socketToUser);
  });

  socket.on("disconnect", () => {
    const user = socketToUser[socket.id];

    if (!user) return;

    const room = rooms[user.roomId];

    if (room) {
      const index = room.users.findIndex(
        (u) => u.socketId === socket.id
      );

      if (index !== -1){
        room.users.splice(index, 1);
      }

      // broadcast the updated user list to all clients in the room after a user disconnects
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
