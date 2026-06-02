const express = require("express");
const cors = require("cors");

const app = express();

// frontend runs on 5173, backend runs on 3000
// cors is needed to allow the frontend to make requests to the backend
app.use(cors());
app.use(express.json());

// in-memory room data, in a real application this would be stored in a database
let room = {
    roomId: Math.random().toString(36).substring(2,8), // generate a random 6 character string
    users: 1
};

app.get("/room", (req, res) => {
    res.json(room);
});

app.post("/join", (req, res) => {

  room.users += 1;

  res.json({
    message: "User joined room",
    room
  });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
