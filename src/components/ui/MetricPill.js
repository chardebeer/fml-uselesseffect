export default function MetricPill({ label, value, tone }) {
  return (
    <span className={`metric-pill ${tone || "cool"}`}>
      <span className="metric-dot" />
      <span className="metric-label">{label}</span>
      {typeof value !== "undefined" && (
        <span className="metric-value">{value}</span>
      )}
    </span>
  );
}

