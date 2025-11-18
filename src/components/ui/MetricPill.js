export default function MetricPill({ label, value, tone }) {
  const palette =
    tone === "hot"
      ? { bg: "rgba(243,139,168,0.16)", border: "#f38ba8", dot: "#f38ba8" }
      : tone === "warm"
      ? { bg: "rgba(249,226,175,0.10)", border: "#f9e2af", dot: "#f9e2af" }
      : { bg: "rgba(166,227,161,0.10)", border: "#a6e3a1", dot: "#a6e3a1" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 10,
        border: `1px solid ${palette.border}`,
        background: palette.bg,
        color: "#e5e7eb",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: palette.dot,
        }}
      />
      <span style={{ opacity: 0.85 }}>{label}</span>
      {typeof value !== "undefined" && (
        <span style={{ fontVariantNumeric: "tabular-nums", opacity: 0.9 }}>
          {value}
        </span>
      )}
    </span>
  );
}

