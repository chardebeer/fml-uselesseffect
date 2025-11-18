export default function CodeSnippet({ code, active, accent, label }) {
  const chipColor = accent || "#a6e3a1";
  return (
    <details className="code-snippet">
      <summary>
        <span>{label || "open the forbidden snippet"}</span>
        <span className={`code-status ${active ? "active" : ""}`}>
          <span
            className={`code-status-dot ${active ? "active" : ""}`}
            style={{
              background: active ? chipColor : undefined,
              boxShadow: active ? `0 0 6px ${chipColor}` : undefined,
            }}
          />
          {active ? "running issue" : "idle example"}
        </span>
      </summary>
      <pre
        className={`code-block ${active ? "active" : ""}`}
        style={{
          borderColor: active ? chipColor : undefined,
        }}
      >
        <code>{code}</code>
      </pre>
    </details>
  );
}

