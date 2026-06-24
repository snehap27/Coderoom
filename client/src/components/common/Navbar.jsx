import "../../styles/navbar.css";

function Navbar({
  roomId,
  userCount,
  onCopyRoomId,
  onLeaveRoom,
}) {
  return (
    <header className="navbar">
      <h1 className="logo">CodeRoom</h1>

      <div className="room-info">
        <span>ID: {roomId}</span>

        <button
          className="copy-btn"
          onClick={onCopyRoomId}
        >
          📋
        </button>
      </div>

      <div className="navbar-actions">
        <div className="user-count">
          👥 {userCount} user{userCount !== 1 ? "s" : ""}
        </div>

        <button
          className="leave-btn"
          onClick={onLeaveRoom}
        >
          Leave
        </button>
      </div>
    </header>
  );
}

export default Navbar;