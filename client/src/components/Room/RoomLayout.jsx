import "../../styles/layout.css";
import { useState } from "react";

function RoomLayout({
  usersPanel,
  editorPanel,
  problemPanel,
  whiteboardPanel,
  outputPanel,
}) {
   const [showWhiteboard, setShowWhiteboard] = useState(true);
  return (
    <div className="room-layout">

      <div className="top-layout">
        <div className="users-column">
          {usersPanel}
        </div>

        <div className="editor-column">
          {editorPanel}
        </div>

        <div className="problem-column">
          {problemPanel}
        </div>
      </div>

      <div className="whiteboard-section">

        <button
          className="whiteboard-toggle"
          onClick={() => setShowWhiteboard(!showWhiteboard)}
        >
        {showWhiteboard ? "▼ Whiteboard" : "▶ Whiteboard"}
        </button>

        {showWhiteboard && (
        <div className="whiteboard-row">
          {whiteboardPanel}
        </div>
        )}
      </div>

      <div className="output-row">
        {outputPanel}
      </div>

    </div>
  );
}

export default RoomLayout;