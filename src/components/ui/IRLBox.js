export default function IRLBox({ children }) {
  return (
    <div className="irl-box">
      <div className="irl-title">IRL symptoms</div>
      <ul className="irl-list">
        {children}
      </ul>
    </div>
  );
}

