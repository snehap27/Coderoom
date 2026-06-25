function PreviewPanel() {
  return (
    <div className="preview-card">

      <h2>Workspace Status</h2>

      <div className="status-card">
        <span className="status-dot"></span>
        Code Editor Connected
      </div>

      <div className="status-card">
        <span className="status-dot"></span>
        Whiteboard Ready
      </div>

      <div className="status-card">
        <span className="status-dot"></span>
        Interview Timer Available
      </div>

      <div className="status-card">
        <span className="status-dot"></span>
        Cursor Tracking Active
      </div>

      <div className="status-card">
        <span className="status-dot"></span>
        Multi-user Rooms
      </div>

    </div>
  );
}

export default PreviewPanel;