import Editor from "@monaco-editor/react";

function EditorPanel({
  code,
  handleCodeChange,
  editorRef,
  monacoRef,
  socketRef,
  roomId,
  username,
}) {
  return (
    <div className="editor-container">
      <Editor
        height="500px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
        options={{
          minimap: { enabled: false },
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          monacoRef.current = monaco;

          editor.onDidChangeCursorPosition((e) => {
            if (!socketRef.current?.connected) return;

            socketRef.current.emit("cursor-move", {
              roomId,
              userId: socketRef.current.id,
              username,
              position: e.position,
            });
          });
        }}
      />
    </div>
  );
}

export default EditorPanel;