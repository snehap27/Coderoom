function LanguageSelector({ language, setLanguage }) {
  return (
    <select
      className="language-selector"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="javascript">JavaScript</option>
      <option value="cpp">C++</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </select>
  );
}

export default LanguageSelector;