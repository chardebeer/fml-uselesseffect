export default function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes glowPulse {
            0% { box-shadow: 0 0 0 rgba(180, 190, 254, 0.0); }
            50% { box-shadow: 0 0 30px rgba(148, 226, 213, 0.45); }
            100% { box-shadow: 0 0 0 rgba(180, 190, 254, 0.0); }
          }
          @keyframes corruptionShimmer {
            0% { transform: translateX(-15%); }
            50% { transform: translateX(15%); }
            100% { transform: translateX(-15%); }
          }
          @keyframes scanline {
            0% { background-position-y: 0; }
            100% { background-position-y: 8px; }
          }
          @keyframes floatNoise {
            0% { transform: translate3d(0,0,0) scale(1); opacity: 0.08; }
            50% { transform: translate3d(6px,-10px,0) scale(1.25); opacity: 0.45; }
            100% { transform: translate3d(-4px,6px,0) scale(1); opacity: 0.18; }
          }
          @keyframes panelBreath {
            0% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
            100% { transform: translateY(0); }
          }
          @keyframes headerGlitch {
            0% { text-shadow: 0 0 0 rgba(137, 180, 250, 0.0); }
            20% { text-shadow: 1px 0 rgba(116, 199, 236, 0.9), -1px 0 rgba(245, 194, 231, 0.7); }
            21% { text-shadow: -1px 0 rgba(116, 199, 236, 0.9), 1px 0 rgba(245, 194, 231, 0.7); }
            22% { text-shadow: 0 0 0 rgba(137, 180, 250, 0.0); }
            60% { text-shadow: 0 0 0 rgba(137, 180, 250, 0.0); }
            61% { text-shadow: 2px -1px rgba(166, 227, 161, 0.9), -2px 1px rgba(243, 139, 168, 0.8); }
            62% { text-shadow: 0 0 0 rgba(137, 180, 250, 0.0); }
            100% { text-shadow: 0 0 0 rgba(137, 180, 250, 0.0); }
          }
          @keyframes textCorruption {
            0% { transform: translateX(0) skew(0deg); opacity: 1; }
            10% { transform: translateX(2px) skew(1deg); opacity: 0.9; }
            20% { transform: translateX(-1px) skew(-0.5deg); opacity: 1; }
            30% { transform: translateX(1px) skew(0.5deg); opacity: 0.95; }
            40% { transform: translateX(-2px) skew(-1deg); opacity: 1; }
            50% { transform: translateX(0) skew(0deg); opacity: 1; }
            100% { transform: translateX(0) skew(0deg); opacity: 1; }
          }
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes shake {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-1px, -1px); }
            20%, 40%, 60%, 80% { transform: translate(1px, 1px); }
          }
          @keyframes colorShift {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { filter: hue-rotate(360deg); }
          }
        `,
      }}
    />
  );
}

