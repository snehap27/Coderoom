import "../../styles/layout.css";

function RoomLayout({
  usersPanel,
  editorPanel,
  problemPanel,
  whiteboardPanel,
  outputPanel,
}) {
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

      <div className="whiteboard-row">
        {whiteboardPanel}
      </div>

      <div className="output-row">
        {outputPanel}
      </div>

    </div>
  );
}

export default RoomLayout;