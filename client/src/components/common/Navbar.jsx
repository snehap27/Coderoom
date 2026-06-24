import "../../styles/navbar.css";
import { useState } from "react";


function Navbar({
  roomId,
  userCount,
  onCopyRoomId,
  onLeaveRoom,
  themeToggle,
}) {
  const [copied, setCopied] = useState(false);
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>CodeRoom</h1>
      </div>

      <div className="navbar-room">
        <span>ID: {roomId}</span>

        <button
          className="copy-button"
          onClick={() => {
          onCopyRoomId();
          setCopied(true);

          setTimeout(() => {
          setCopied(false);
      },  2000);
    }}
  >
  {copied ? "Copied!" : "📋"}
</button>
      </div>

      <div className="navbar-actions">
        {themeToggle}

        <div className="user-badge">
          👥 {userCount} {userCount === 1 ? "user" : "users"}
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