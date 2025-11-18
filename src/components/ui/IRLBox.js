export default function IRLBox({ children }) {
  return (
    <div
      style={{
        marginTop: 8,
        padding: 8,
        borderRadius: 8,
        background: "rgba(36,39,58,0.6)",
        border: "1px dashed #45475a",
        fontSize: 10,
        color: "#cdd6f4",
        animation: "textCorruption 5s ease-in-out infinite",
      }}
    >
      <div style={{ fontWeight: 500, fontSize: 10, marginBottom: 3 }}>
        IRL symptoms
      </div>
      <ul style={{ margin: 0, paddingLeft: 16, listStyle: "disc" }}>
        {children}
      </ul>
    </div>
  );
}

