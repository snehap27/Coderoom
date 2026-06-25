function LoginCard({
  username,
  setUsername,
  roomId,
  setRoomId,
  error,
  createRoom,
  joinRoom,
}) {
  return (
    <div className="login-card">

      <label>
        Name
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your name"
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button
        type="button"
        onClick={createRoom}
      >
        Create Room
      </button>

      <form onSubmit={joinRoom}>
        <input
          type="text"
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          placeholder="Enter Room ID"
        />

        <button type="submit">
          Join Room
        </button>
      </form>

    </div>
  );
}

export default LoginCard;