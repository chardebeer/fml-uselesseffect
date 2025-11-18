export default function Panel({ title, subtitle, children, accent, glitch }) {
  const glitchStyle = glitch ? {
    animation: "shake 0.1s infinite, textCorruption 2s ease-in-out infinite",
    filter: "hue-rotate(0deg)",
  } : {};
  
  return (
    <div
      style={{
        borderRadius: 22,
        padding: 18,
        background:
          "radial-gradient(circle at top, #24273a 0%, #1e1e2e 35%, #1e1e2e 45%, #181825 100%)",
        border: `1px solid ${accent || "#6c7086"}`,
        boxShadow:
          "0 0 20px rgba(15,23,42,0.4), inset 0 0 0 1px rgba(15,23,42,0.3)",
        position: "relative",
        overflow: "hidden",
        animation: "panelBreath 7s ease-in-out infinite",
        ...glitchStyle,
      }}
    >
      {/* CRT wash */}
      <div
        style={{
          position: "absolute",
          inset: -1,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(15,23,42,0.15) 0, rgba(15,23,42,0.15) 1px, rgba(3,7,18,0.8) 1px, rgba(3,7,18,0.8) 3px)",
          mixBlendMode: "soft-light",
          opacity: 0.4,
          pointerEvents: "none",
          animation: "scanline 3s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% -10%, rgba(148,226,213,0.08), transparent 55%), radial-gradient(circle at 110% 40%, rgba(243,139,168,0.06), transparent 50%)",
          mixBlendMode: "screen",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background:
                "radial-gradient(circle at 30% 20%, #fab387, #1e1e2e)",
              boxShadow: "0 0 8px rgba(250,179,135,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
            }}
          >
            ⚡
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                color: "#cdd6f4",
                fontSize: 17,
                letterSpacing: 0.04,
                animation: glitch ? "textCorruption 3s ease-in-out infinite" : "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                marginTop: 3,
                marginBottom: 0,
                opacity: 0.85,
                fontSize: 12,
                color: "#bac2de",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

