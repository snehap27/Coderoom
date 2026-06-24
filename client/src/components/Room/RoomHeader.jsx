function RoomHeader({ roomId, username, userCount }) {
  return (
    <section className="room-header">
      <h1>Room: {roomId}</h1>
      <p>Welcome, {username}</p>
      <p>Users: {userCount}</p>
    </section>
  );
}

export default RoomHeader;