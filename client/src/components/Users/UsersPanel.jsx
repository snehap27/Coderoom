function UsersPanel({ users }) {
  return (
    <section className="users-panel">
      <h2>Active Users</h2>

      <ul>
        {users.map((u) => (
          <li key={u.socketId}>
            🟢 {u.username}
      </li>
        ))}
      </ul>
    </section>
  );
}

export default UsersPanel;