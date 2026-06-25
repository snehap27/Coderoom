function WhiteboardPanel({
  canvasRef,
  width = 400,
  height = 400,
  onClear,
  onSave,
  brushColor,
  setBrushColor,
  brushSize,
  setBrushSize,
}) {
  return (
    <div className="whiteboard-container">

      <div className="whiteboard-toolbar">
        <div className="color-toolbar">

  <button
    className="color-btn black"
    onClick={() => setBrushColor("black")}
  />

  <button
    className="color-btn red"
    onClick={() => setBrushColor("red")}
  />

  <button
    className="color-btn blue"
    onClick={() => setBrushColor("blue")}
  />

  <button
    className="color-btn green"
    onClick={() => setBrushColor("green")}
  />

</div>
<div className="brush-toolbar">

  <label>
    Brush Size: {brushSize}
  </label>

  <input
    type="range"
    min="1"
    max="10"
    value={brushSize}
    onChange={(e) =>
      setBrushSize(Number(e.target.value))
    }
  />

</div>

        <button
          className="whiteboard-button"
          onClick={onClear}
        >
          🗑 Clear
        </button>

        <button
          className="whiteboard-button"
          onClick={onSave}
        >
          💾 Save
        </button>

      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="whiteboard"
      />

    </div>
  );
}

export default WhiteboardPanel;