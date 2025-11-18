import { ORBS } from "../utils/prng";

export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {ORBS.map(orb => (
        <div
          key={orb.key}
          style={{
            position: "absolute",
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: orb.size,
            height: orb.size,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(148,226,213,0.08), transparent 70%)",
            filter: "blur(6px)",
            animation: "floatNoise 9s ease-in-out infinite",
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

