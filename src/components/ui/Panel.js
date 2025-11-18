export default function Panel({ title, subtitle, children, accent, glitch }) {
  return (
    <div 
      className={`panel ${glitch ? "glitch" : ""}`}
      style={{ borderColor: accent || "#6c7086" }}
    >
      <div className="panel-crt" />
      <div className="panel-overlay" />
      <div className="panel-content">
        <div className="panel-header">
          <div className="panel-icon">⚡</div>
          <div>
            <h2 className={`panel-title ${glitch ? "glitch" : ""}`}>
              {title}
            </h2>
            <p className="panel-subtitle">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

