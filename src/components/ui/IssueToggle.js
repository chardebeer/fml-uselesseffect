export default function IssueToggle({ label, description, active, onChange, accent, hint }) {
  const bg = active
    ? `radial-gradient(circle at top left, ${accent}, #1e1e2e)`
    : "linear-gradient(135deg, #1e1e2e, #1e1e2e)";
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      style={{
        flex: "1 1 240px",
        minWidth: 0,
        textAlign: "left",
        padding: 12,
        borderRadius: 14,
        border: `1px solid ${active ? accent : "#313244"}`,
        background: bg,
        color: "#cdd6f4",
        fontSize: 12,
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        position: "relative",
        overflow: "hidden",
        boxShadow: active
          ? "0 0 10px rgba(137,180,250,0.15)"
          : "0 0 0 rgba(0,0,0,0)",
        transition:
          "border-color 200ms ease, box-shadow 200ms ease, background 200ms ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: active ? 0.25 : 0.05,
          backgroundImage:
            "radial-gradient(circle at -10% 0%, rgba(148,226,213,0.2), transparent 60%), radial-gradient(circle at 120% 120%, rgba(245,194,231,0.2), transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 28,
          height: 16,
          borderRadius: 999,
          border: "1px solid rgba(108,112,134,0.6)",
          background: "rgba(30,30,46,0.9)",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: active ? "flex-end" : "flex-start",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: active ? accent : "#6c7086",
            boxShadow: active ? `0 0 6px ${accent}` : "none",
          }}
        />
      </div>
      <div style={{ zIndex: 1, flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0.03,
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>{label}</span>
          {hint && (
            <span
              style={{
                fontSize: 9,
                padding: "2px 6px",
                borderRadius: 999,
                border: "1px solid rgba(108,112,134,0.6)",
                textTransform: "uppercase",
                letterSpacing: 0.12,
                opacity: 0.85,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {hint}
            </span>
          )}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 11,
            opacity: 0.78,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </button>
  );
}

