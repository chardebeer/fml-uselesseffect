export default function CodeSnippet({ code, active, accent, label }) {
  const chipColor = accent || "#a6e3a1";
  return (
    <details style={{ marginTop: 10 }}>
      <summary
        style={{
          cursor: "pointer",
          fontSize: 12,
          color: "#cdd6f4",
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: "space-between",
          listStyle: "none",
        }}
      >
        <span>{label || "open the forbidden snippet"}</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 0.08,
            opacity: active ? 1 : 0.7,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              background: active ? chipColor : "#4b5563",
              boxShadow: active
                ? `0 0 12px ${chipColor}`
                : "0 0 0 rgba(0,0,0,0)",
              animation: active ? "glowPulse 2s ease-in-out infinite" : "none",
            }}
          />
          {active ? "running issue" : "idle example"}
        </span>
      </summary>
      <pre
        style={{
          marginTop: 8,
          padding: 10,
          borderRadius: 10,
          background: "rgba(24,24,37,0.98)",
          color: "#cdd6f4",
          fontSize: 10,
          overflowX: "auto",
          lineHeight: 1.5,
          border: `1px solid ${active ? chipColor : "#313244"}`,
          boxShadow: active
            ? "0 0 16px rgba(137,180,250,0.3)"
            : "0 0 0 rgba(0,0,0,0)",
          transition:
            "border-color 200ms ease, box-shadow 200ms ease",
        }}
      >
        <code>{code}</code>
      </pre>
    </details>
  );
}

