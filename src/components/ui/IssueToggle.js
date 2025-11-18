export default function IssueToggle({ label, description, active, onChange, accent, hint }) {
  const bg = active
    ? `radial-gradient(circle at top left, ${accent}, #1e1e2e)`
    : "linear-gradient(135deg, #1e1e2e, #1e1e2e)";
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={`issue-toggle ${active ? "active" : ""}`}
      style={{
        borderColor: active ? accent : "#313244",
        background: bg,
      }}
    >
      <div className={`issue-toggle-overlay ${active ? "active" : ""}`} />
      <div className={`toggle-switch ${active ? "active" : ""}`}>
        <div
          className={`toggle-switch-dot ${active ? "active" : ""}`}
          style={{
            background: active ? accent : "#6c7086",
          }}
        />
      </div>
      <div className="toggle-content">
        <div className="toggle-label-row">
          <span className="nowrap">{label}</span>
          {hint && <span className="toggle-hint">{hint}</span>}
        </div>
        <div className="toggle-description">{description}</div>
      </div>
    </button>
  );
}

