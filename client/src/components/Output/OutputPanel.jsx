function OutputPanel({ output }) {
  return (
    <div className="output-panel">
      <h2>Output</h2>

      <pre className="output-box">
        {output || "Program output will appear here"}
      </pre>
    </div>
  );
}

export default OutputPanel;