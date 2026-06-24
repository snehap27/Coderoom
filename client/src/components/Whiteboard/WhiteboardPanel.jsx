function WhiteboardPanel({
  canvasRef,
  width = 400,
  height = 400,
}) {
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="whiteboard"
    />
  );
}

export default WhiteboardPanel;