// useState and useEffect are used to manage state and side effects in the React component. The component fetches room data from the server when it mounts and displays it on the page.
import { useEffect, useState } from "react";

function App() {

  const [roomData, setRoomData] = useState(null);

  // this function is called when the user clicks the "Join Room" button. It sends a POST request to the server to join the room and updates the room data with the response.
  const joinRoom = () => {
    fetch("http://localhost:3000/join", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data.room);
      });
  };
  useEffect(() => {
    fetch("http://localhost:3000/room")
      .then((res) => res.json())
      .then((data) => setRoomData(data));
  }, []);

  return (
    <div>
      <h1>Collaborative Interview Platform</h1>

      {roomData && ( // only render if roomData is not null
        <div>
          <p>Room ID: {roomData.roomId}</p>
          <p>Users: {roomData.users}</p>
          <button onClick={joinRoom}>
            Join Room
          </button>
        </div>
      )}
    </div>
  );
}

export default App;