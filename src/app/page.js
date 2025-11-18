"use client";

import { useEffect, useState, useCallback } from "react";

// Global trash that never really goes away
const globalNoiseLog = [];
const globalGhostListeners = [];
const globalPhantomRefs = [];

// ------- global CSS for cursed vibes -------

function GlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes glowPulse {
            0% { box-shadow: 0 0 0 rgba(148, 163, 184, 0.0); }
            50% { box-shadow: 0 0 30px rgba(94, 234, 212, 0.45); }
            100% { box-shadow: 0 0 0 rgba(148, 163, 184, 0.0); }
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
            0% { text-shadow: 0 0 0 rgba(96,165,250,0.0); }
            20% { text-shadow: 1px 0 rgba(59,130,246,0.9), -1px 0 rgba(236,72,153,0.7); }
            21% { text-shadow: -1px 0 rgba(59,130,246,0.9), 1px 0 rgba(236,72,153,0.7); }
            22% { text-shadow: 0 0 0 rgba(96,165,250,0.0); }
            60% { text-shadow: 0 0 0 rgba(96,165,250,0.0); }
            61% { text-shadow: 2px -1px rgba(34,197,94,0.9), -2px 1px rgba(239,68,68,0.8); }
            62% { text-shadow: 0 0 0 rgba(96,165,250,0.0); }
            100% { text-shadow: 0 0 0 rgba(96,165,250,0.0); }
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

// ------- deterministic "random" orbs so hydration stops yelling -------

function prng(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const ORBS = Array.from({ length: 18 }).map((_, i) => {
  const left = prng(i) * 100;
  const top = prng(i + 101) * 100;
  const size = 60 + prng(i + 202) * 80;
  const delay = prng(i + 303) * 6;
  return { key: i, left, top, size, delay };
});

function BackgroundOrbs() {
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
              "radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)",
            filter: "blur(4px)",
            animation: "floatNoise 9s ease-in-out infinite",
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ------- shared UI bits -------

function Panel({ title, subtitle, children, accent, glitch }) {
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
          "radial-gradient(circle at top, #020617 0%, #020617 35%, #020617 45%, #000000 100%)",
        border: `1px solid ${accent || "#4b5563"}`,
        boxShadow:
          "0 0 50px rgba(15,23,42,0.9), inset 0 0 0 1px rgba(15,23,42,0.8)",
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
            "repeating-linear-gradient(0deg, rgba(15,23,42,0.32) 0, rgba(15,23,42,0.32) 1px, rgba(3,7,18,1) 1px, rgba(3,7,18,1) 3px)",
          mixBlendMode: "soft-light",
          opacity: 0.7,
          pointerEvents: "none",
          animation: "scanline 3s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% -10%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at 110% 40%, rgba(239,68,68,0.12), transparent 50%)",
          mixBlendMode: "screen",
          opacity: 0.9,
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
                "radial-gradient(circle at 30% 20%, #f97316, #0f172a)",
              boxShadow: "0 0 16px rgba(249,115,22,0.8)",
            }}
          />
          <div>
            <h2
              style={{
                margin: 0,
                color: "#e5e7eb",
                fontSize: 17,
                letterSpacing: 0.04,
                animation: glitch ? "textCorruption 3s ease-in-out infinite" : "none",
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
                color: "#9ca3af",
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

function CodeSnippet({ code, active, accent, label }) {
  const chipColor = accent || "#22c55e";
  return (
    <details style={{ marginTop: 10 }}>
      <summary
        style={{
          cursor: "pointer",
          fontSize: 12,
          color: "#e5e7eb",
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
                ? `0 0 16px ${chipColor}`
                : "0 0 0 rgba(0,0,0,0)",
              animation: active ? "glowPulse 1.2s ease-in-out infinite" : "none",
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
          background: "rgba(3,7,18,0.98)",
          color: "#f9fafb",
          fontSize: 10,
          overflowX: "auto",
          lineHeight: 1.5,
          border: `1px solid ${active ? chipColor : "#1f2937"}`,
          boxShadow: active
            ? "0 0 24px rgba(96,165,250,0.45)"
            : "0 0 0 rgba(0,0,0,0)",
          transform: active ? "translateY(-1px)" : "translateY(0)",
          transition:
            "border-color 120ms linear, box-shadow 120ms linear, transform 120ms linear",
        }}
      >
        <code>{code}</code>
      </pre>
    </details>
  );
}

function MetricPill({ label, value, tone }) {
  const palette =
    tone === "hot"
      ? { bg: "rgba(248,113,113,0.16)", border: "#ef4444", dot: "#ef4444" }
      : tone === "warm"
      ? { bg: "rgba(250,204,21,0.10)", border: "#facc15", dot: "#facc15" }
      : { bg: "rgba(45,212,191,0.10)", border: "#22c55e", dot: "#22c55e" };

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

function IssueToggle({ label, description, active, onChange, accent, hint }) {
  const bg = active
    ? `radial-gradient(circle at top left, ${accent}, #020617)`
    : "linear-gradient(135deg, #020617, #020617)";
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      style={{
        flex: "1 1 220px",
        textAlign: "left",
        padding: 10,
        borderRadius: 14,
        border: `1px solid ${active ? accent : "#1f2937"}`,
        background: bg,
        color: "#e5e7eb",
        fontSize: 12,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 10,
        position: "relative",
        overflow: "hidden",
        boxShadow: active
          ? "0 0 26px rgba(59,130,246,0.45)"
          : "0 0 0 rgba(0,0,0,0)",
        transform: active ? "translateY(-1px)" : "translateY(0)",
        transition:
          "border-color 120ms linear, box-shadow 120ms linear, transform 120ms linear, background 160ms linear",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: active ? 0.45 : 0.1,
          backgroundImage:
            "radial-gradient(circle at -10% 0%, rgba(56,189,248,0.4), transparent 60%), radial-gradient(circle at 120% 120%, rgba(244,114,182,0.4), transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: 28,
          height: 16,
          borderRadius: 999,
          border: "1px solid rgba(148,163,184,0.6)",
          background: "rgba(15,23,42,0.9)",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: active ? "flex-end" : "flex-start",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: active ? accent : "#6b7280",
            boxShadow: active ? `0 0 12px ${accent}` : "none",
          }}
        />
      </div>
      <div style={{ zIndex: 1 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0.03,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {label}
          {hint && (
            <span
              style={{
                fontSize: 9,
                padding: "1px 6px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.6)",
                textTransform: "uppercase",
                letterSpacing: 0.12,
                opacity: 0.85,
              }}
            >
              {hint}
            </span>
          )}
        </div>
        <div
          style={{
            marginTop: 2,
            fontSize: 11,
            opacity: 0.78,
            maxWidth: 260,
          }}
        >
          {description}
        </div>
      </div>
    </button>
  );
}

// Shared IRL box
function IRLBox({ children }) {
  return (
          <div
            style={{
              marginTop: 8,
              padding: 8,
              borderRadius: 8,
              background: "rgba(15,23,42,0.95)",
              border: "1px dashed #374151",
              fontSize: 10,
              color: "#e5e7eb",
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

// ------- cursed panels -------

/* 1. CPU SPINNER LOOP
   This effect is a love letter to spinning fans and a hate crime against schedulers.
*/
function CpuSpinnerLoop({ enabled }) {
  const [spinner, setSpinner] = useState(0);
  const [phase, setPhase] = useState(3);

  useEffect(() => {
    if (!enabled) return;

    // Tiny interval that never dies
    const intervalId = setInterval(() => {
      setSpinner(v => {
        const next = (v + phase) % 9999;
        globalNoiseLog.push({
          type: "spinner-tick",
          value: next,
          t: Date.now(),
        });
        return next;
      });
    }, 16);

    function rafLoop() {
      setSpinner(v => {
        const next = (v + 1) % 9999;
        globalNoiseLog.push({
          type: "spinner-raf",
          value: next,
          t: Date.now(),
        });
        return next;
      });
      requestAnimationFrame(rafLoop);
    }

    requestAnimationFrame(rafLoop);

    return () => {
      // fake cleanup to keep the lie alive
      console.log("CpuSpinnerLoop pretending to clean", intervalId);
    };
  }, [enabled, spinner, phase, Math.random()]);

  const heat = Math.min(spinner / 2000, 1);
  const bars = Array.from({ length: 48 });

  const code = `const [spinner, setSpinner] = useState(0);
const [phase, setPhase] = useState(3);

useEffect(() => {
  if (!enabled) return;

  const intervalId = setInterval(() => {
    setSpinner(v => (v + phase) % 9999);
  }, 16);

  function rafLoop() {
    setSpinner(v => (v + 1) % 9999);
    requestAnimationFrame(rafLoop);
  }

  requestAnimationFrame(rafLoop);

  // Looks like cleanup, but does not clear the interval
  return () => {
    console.log("totally cleaned", intervalId);
  };
}, [enabled, spinner, phase, Math.random()]);`;

  return (
    <Panel
      title="CPU Spinner Loop"
      subtitle="your CPU is literally screaming and you&apos;re just watching it burn"
      accent="#f97316"
      glitch={enabled && heat > 0.7}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontVariantNumeric: "tabular-nums",
            color: heat > 0.7 ? "#f97316" : "#e5e7eb",
            animation: enabled && heat > 0.7 ? "flicker 0.3s infinite, shake 0.1s infinite" : "none",
            transform: enabled && heat > 0.7 ? "skew(1deg)" : "skew(0deg)",
          }}
        >
          cpu spinner: {spinner}
        </div>
        <MetricPill
          label="thermal death"
          value={`${Math.round(heat * 100)}%`}
          tone={heat > 0.75 ? "hot" : heat > 0.4 ? "warm" : "cool"}
        />
      </div>
      <label
        style={{
          fontSize: 12,
          color: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        phase drift
        <input
          type="range"
          min="1"
          max="13"
          value={phase}
          onChange={e => setPhase(Number(e.target.value))}
        />
        <span
          style={{
            fontVariantNumeric: "tabular-nums",
            fontSize: 12,
            opacity: 0.9,
          }}
        >
          {phase}
        </span>
      </label>

      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 2,
          height: 46,
          alignItems: "flex-end",
        }}
      >
        {bars.map((_, i) => {
          const v = (spinner + i * 137) % 50;
          const h = 8 + v;
          const fraction = i / bars.length;
          const color =
            heat < 0.3
              ? `rgba(45,212,191,${0.5 + fraction * 0.4})`
              : heat < 0.7
              ? `rgba(250,204,21,${0.4 + fraction * 0.4})`
              : `rgba(248,113,113,${0.45 + fraction * 0.4})`;

          return (
            <div
              key={i}
              style={{
                width: 5,
                height: h,
                borderRadius: 99,
                background: color,
              }}
            />
          );
        })}
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>
          Effect depends on <code>spinner</code> and also sets <code>spinner</code> every 16ms. It&apos;s like setting an alarm that goes off every time you check if the alarm is set, except the alarm is your CPU and it&apos;s actually going off.
        </li>
        <li>
          <code>Math.random()</code> in deps means this effect runs on every single render forever. React is having a fucking stroke.
        </li>
        <li>
          Interval never gets cleared. RAF never stops. Your laptop is now a space heater that occasionally renders React components.
        </li>
      </ul>

      <IRLBox>
        <li>
          Local: fans sound like a jet taking off, VS Code freezes every 2 seconds, CPU graph looks like a heart attack.
        </li>
        <li>
          Staging: pods at 90% CPU doing absolutely fucking nothing, autoscaler panics and spawns 50 more pods, CPU still at 90%.
        </li>
        <li>
          Prod: users&apos; phones literally get hot enough to cook eggs, you blame &quot;browser optimization&quot; and close the ticket.
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#f97316"
        label="the code that turned your CPU into a space heater"
      />
    </Panel>
  );
}

/* 2. FEEDBACK CHAIN RECURSOR
   Two effects writing to each other, like a pair of Slack bots having a meltdown.
*/
function FeedbackChainRecursor({ enabled }) {
  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!enabled) return;
    setTail(() => {
      const next = (head + 1) % 9999;
      globalNoiseLog.push({ type: "head-to-tail", value: next });
      setHistory(prev => {
        const line = `effect A: head -> tail  (${head} -> ${next})`;
        const nextArr = [...prev, line];
        return nextArr.length > 20 ? nextArr.slice(-20) : nextArr;
      });
      return next;
    });
  }, [enabled, head]);

  useEffect(() => {
    if (!enabled) return;
    setHead(() => {
      const next = (tail + 2) % 9999;
      globalNoiseLog.push({ type: "tail-to-head", value: next });
      setHistory(prev => {
        const line = `effect B: tail -> head  (${tail} -> ${next})`;
        const nextArr = [...prev, line];
        return nextArr.length > 20 ? nextArr.slice(-20) : nextArr;
      });
      return next;
    });
  }, [enabled, tail]);

  const intensity = Math.min(Math.abs(head - tail) / 200, 1);

  const code = `const [head, setHead] = useState(0);
const [tail, setTail] = useState(0);

useEffect(() => {
  if (!enabled) return;
  setTail(head + 1);
}, [enabled, head]);

useEffect(() => {
  if (!enabled) return;
  setHead(tail + 2);
}, [enabled, tail]);`;

  return (
    <Panel
      title="Feedback Chain Recursor"
      subtitle="two effects in a toxic relationship where they keep triggering each other until your browser crashes"
      accent="#22c55e"
      glitch={enabled && intensity > 0.7}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 14,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              animation: enabled && intensity > 0.7 ? "textCorruption 2s ease-in-out infinite" : "none",
            }}
          >
            head: <strong>{head}</strong>
          </div>
          <div
            style={{
              animation: enabled && intensity > 0.7 ? "textCorruption 2s ease-in-out infinite 0.1s" : "none",
            }}
          >
            tail: <strong>{tail}</strong>
          </div>
        </div>
        <MetricPill
          label="render apocalypse"
          value={`${Math.round(intensity * 100)}%`}
          tone={intensity > 0.7 ? "hot" : intensity > 0.3 ? "warm" : "cool"}
        />
      </div>

      {/* simple diagram of the ping pong */}
      <div
        style={{
          marginTop: 4,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 11,
          color: "#9ca3af",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              borderRadius: 999,
              border: "1px solid rgba(34,197,94,0.7)",
              background: "rgba(22,101,52,0.3)",
              fontSize: 11,
            }}
          >
            effect A
          </div>
          <span>listens to head</span>
          <span style={{ opacity: 0.7 }}>and writes tail</span>
        </div>
        <div
          style={{
            width: 26,
            height: 1,
            background: "rgba(148,163,184,0.8)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              borderRadius: 999,
              border: "1px solid rgba(56,189,248,0.7)",
              background: "rgba(15,23,42,0.8)",
              fontSize: 11,
            }}
          >
            effect B
          </div>
          <span>listens to tail</span>
          <span style={{ opacity: 0.7 }}>and writes head</span>
        </div>
      </div>

      {/* old visual flicker grid */}
      <div
        style={{
          marginTop: 4,
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 2,
        }}
      >
        {Array.from({ length: 32 }).map((_, i) => {
          const v = (head * 13 + tail * 7 + i * 17) % 100;
          const on = v > 50;
          return (
            <div
              key={i}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 4,
                background: on ? "#22c55e" : "#020617",
                opacity: on ? 0.95 : 0.25,
              }}
            />
          );
        })}
      </div>

      {/* log of what each effect is actually doing */}
      <div
        style={{
          marginTop: 8,
          padding: 8,
          borderRadius: 8,
          background: "#020617",
          border: "1px solid #111827",
          fontSize: 10,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          maxHeight: 120,
          overflow: "auto",
        }}
      >
        {history.length === 0 && (
          <div style={{ opacity: 0.7 }}>
            flip the toggle to watch two effects have a mental breakdown and trigger each other until your browser commits suicide
          </div>
        )}
        {history.map((line, idx) => (
          <div key={idx} style={{ opacity: idx === history.length - 1 ? 1 : 0.7 }}>
            {line}
          </div>
        ))}
      </div>

      <IRLBox>
        <li>
          Local: type one fucking character, whole app re-renders 50 times, React DevTools looks like a strobe light.
        </li>
        <li>
          Staging: hover over literally anything, render apocalypse happens, you blame React 18 and close the issue.
        </li>
        <li>
          Prod: &quot;feels slow&quot; bugs that only happen when real users use it, you can&apos;t reproduce it, users think you&apos;re gaslighting them.
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#22c55e"
        label="the code that makes React cry"
      />
    </Panel>
  );
}


/* 3. MEMORY LEAK LISTENER MESH
   Mousemove listeners as a lifestyle choice.
*/
function MemoryLeakListenerMesh({ enabled }) {
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handler = event => {
      setMoves(c => c + 1);
      globalNoiseLog.push({
        type: "move",
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("mousemove", handler);
    globalGhostListeners.push(handler);

    // Cleanup uses a new function reference, so removal fails
    return () => {
      document.removeEventListener("mousemove", () => handler());
    };
  }, [enabled, moves]);

  const density = Math.min(moves / 120, 1);

  const code = `const globalGhostListeners = [];

function MemoryLeakListenerMesh({ enabled }) {
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handler = event => {
      setMoves(c => c + 1);
    };

    document.addEventListener("mousemove", handler);
    globalGhostListeners.push(handler);

    // Wrong function reference
    return () => {
      document.removeEventListener("mousemove", () => handler());
    };
  }, [enabled, moves]);

  return <div>...</div>;
}`;

  return (
    <Panel
      title="Memory Leak Listener Mesh"
      subtitle="memory leak simulator 2024 - every mouse move spawns a new listener that never dies"
      accent="#3b82f6"
      glitch={enabled && density > 0.7}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          fontSize: 13,
          color: "#e5e7eb",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div
            style={{
              animation: enabled && density > 0.7 ? "flicker 0.4s infinite" : "none",
            }}
          >
            moves seen: <strong>{moves}</strong>
          </div>
          <div
            style={{
              animation: enabled && density > 0.7 ? "shake 0.2s infinite" : "none",
            }}
          >
            ghost listeners: <strong>{globalGhostListeners.length}</strong>
          </div>
        </div>
        <MetricPill
          label="memory hemorrhage"
          value={`${Math.round(density * 100)}%`}
          tone={density > 0.7 ? "hot" : density > 0.3 ? "warm" : "cool"}
        />
      </div>

      <div
        style={{
          marginTop: 8,
          height: 80,
          borderRadius: 10,
          border: "1px solid #1f2937",
          background:
            density === 0
              ? "#020617"
              : `repeating-linear-gradient(90deg, rgba(59,130,246,${
                  0.2 + density * 0.6
                }) 0, rgba(59,130,246,${
                  0.2 + density * 0.6
                }) 1px, transparent 1px, transparent 3px)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(0deg, rgba(15,23,42,0.95), transparent)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: "#9ca3af",
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          Move your mouse. Each listener is a future &quot;my browser crashed&quot; bug report that you&apos;ll never fix.
        </div>
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>Effect depends on <code>moves</code>, so it runs every single time you move the mouse. Every. Single. Time.</li>
        <li>Each run adds another mousemove listener to the document. They pile up like garbage in a landfill.</li>
        <li>Cleanup function is completely fucking wrong, so listeners never get removed. Memory leak apocalypse.</li>
      </ul>

      <IRLBox>
        <li>
          Local: move mouse, console explodes with 1000 logs per second, can&apos;t see your actual logs, you give up debugging.
        </li>
        <li>
          Staging: navigate around, memory climbs to 2GB for no reason, you have no idea why, blame Next.js and move on.
        </li>
        <li>
          Prod: old phones lag after 2 minutes, users close the app, you never find out why, ticket gets closed as &quot;device too old&quot;.
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#3b82f6"
        label="the code that leaks memory like a sieve"
      />
    </Panel>
  );
}

/* 4. FETCH DDOS CANNON
   The part of your app that thinks "got a response" means "send another".
*/
function FetchDdosCannon({ enabled }) {
  const [requests, setRequests] = useState(0);
  const [responses, setResponses] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (responses > 120) return;

    setRequests(r => r + 1);

    fetch("/api/ddos?hit=" + requests)
      .then(res => res.json())
      .then(body => {
        globalNoiseLog.push({
          type: "packet",
          delay: body.delay,
          hit: body.hit,
        });
        setResponses(r => r + 1);
      })
      .catch(err => {
        console.error("ddos error", err);
        setErrors(e => e + 1);
      });
  }, [enabled, responses]);

  const floodLevel = Math.min(requests / 80, 1);

  const code = `const [requests, setRequests] = useState(0);
const [responses, setResponses] = useState(0);

useEffect(() => {
  if (!enabled) return;

  setRequests(r => r + 1);

  fetch("/api/ddos?hit=" + requests)
    .then(res => res.json())
    .then(() => {
      setResponses(r => r + 1);
    });
}, [enabled, responses]);`;

  return (
    <Panel
      title="Fetch DDOS Cannon"
      subtitle="you accidentally built a DDoS attack against your own API because you&apos;re an idiot"
      accent="#ef4444"
      glitch={enabled && floodLevel > 0.7}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 13,
          color: "#e5e7eb",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div
            style={{
              animation: enabled && floodLevel > 0.7 ? "textCorruption 1.5s ease-in-out infinite" : "none",
            }}
          >
            requests: <strong>{requests}</strong>
          </div>
          <div
            style={{
              animation: enabled && floodLevel > 0.7 ? "flicker 0.3s infinite" : "none",
            }}
          >
            responses: <strong>{responses}</strong>
          </div>
          <div
            style={{
              animation: enabled && errors > 10 ? "shake 0.1s infinite" : "none",
              color: errors > 10 ? "#ef4444" : "#e5e7eb",
            }}
          >
            errors: <strong>{errors}</strong>
          </div>
        </div>
        <MetricPill
          label="API abuse"
          value={`${Math.round(floodLevel * 100)}%`}
          tone={floodLevel > 0.7 ? "hot" : floodLevel > 0.3 ? "warm" : "cool"}
        />
      </div>

      <div
        style={{
          marginTop: 8,
          height: 44,
          borderRadius: 10,
          border: "1px solid #1f2937",
          overflow: "hidden",
          position: "relative",
          background: "#020617",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 10% 0, rgba(248,113,113,0.35), transparent 55%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 1,
            display: "flex",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, requests)}%`,
              background:
                "repeating-linear-gradient(45deg,#ef4444 0,#ef4444 4px,#7f1d1d 4px,#7f1d1d 8px)",
            }}
          />
          <div
            style={{
              width: `${Math.min(100, responses)}%`,
              background:
                "repeating-linear-gradient(-45deg,#22c55e 0,#22c55e 4px,#166534 4px,#166534 8px)",
            }}
          />
        </div>
      </div>

      <p style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        Network tab is just a wall of identical requests. Backend graphs go vertical. You blame infrastructure and go home early.
      </p>

      <IRLBox>
        <li>
          Local: network tab is just 500 identical requests, can&apos;t find the one you need, you give up and use Postman.
        </li>
        <li>
          Staging: SRE asks why one page load = 200 API calls. You say &quot;must be caching&quot; and hope they don&apos;t check.
        </li>
        <li>
          Prod: rate limits hit, errors spike, PM says backend is broken, you close DevTools and pretend you didn&apos;t see it.
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#ef4444"
        label="the code that DDoSes your own API"
      />
    </Panel>
  );
}

/* 5. WIDGET PYRAMID SCHEME
   Children that ping the parent with setState because of course they do.
*/
function WidgetCell({ id, refreshMs, onTick, onPanic, enabled }) {
  const [hits, setHits] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      setHits(h => {
        const next = h + 1;
        onTick();
        if (next % 7 === 0) {
          onPanic();
        }
        return next;
      });
    }, refreshMs);

    // every run leaves another footprint
    globalPhantomRefs.push({ id, intervalId, timestamp: Date.now() });

    return () => {
      clearInterval(intervalId);
    };
  }, [id, refreshMs, onTick, onPanic, enabled, hits]);

  const t = Math.min(1, hits / 40);
  const bg = `rgba(${Math.floor(40 + 180 * t)},${Math.floor(
    20 + 80 * t
  )},${Math.floor(80 + 120 * (1 - t))},0.9)`;

  return (
    <div
      style={{
        width: 24,
        height: 24,
        margin: 2,
        borderRadius: 5,
        background: bg,
        border: "1px solid #020617",
        boxShadow: t > 0.8 ? "0 0 10px rgba(248,250,252,0.7)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        color: "#020617",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {hits}
    </div>
  );
}

function WidgetPyramidScheme({ enabled }) {
  const [widgetCount, setWidgetCount] = useState(3);
  const [refreshMs, setRefreshMs] = useState(700);
  const [totalHits, setTotalHits] = useState(0);

  const handleTick = useCallback(() => {
    setTotalHits(h => h + 1);
  }, []);

  const handlePanic = useCallback(() => {
    // widgets ask the parent to add more widgets, because of course they do
    setWidgetCount(c => (c < 20 ? c + 1 : c));
  }, []);

  const cells = enabled ? widgetCount : 0;
  const ids = Array.from({ length: cells }).map((_, i) => i);

  const code = `const globalPhantomRefs = [];

function Widget({ id, refreshMs, onTick, onPanic }) {
  const [hits, setHits] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHits(h => {
        const next = h + 1;
        onTick();
        if (next % 7 === 0) {
          onPanic(); // child asks parent to add more widgets
        }
        return next;
      });
    }, refreshMs);

    globalPhantomRefs.push({ id, intervalId });

    return () => clearInterval(intervalId);
  }, [id, refreshMs, onTick, onPanic, hits]); // hits in deps = effect recreates every tick

  return <div className="widget" />;
}`;

  return (
    <Panel
      title="Widget Pyramid Scheme"
      subtitle="widgets spawn widgets spawn widgets spawn widgets until your browser gives up and dies"
      accent="#a855f7"
      glitch={enabled && widgetCount > 10}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 13,
          color: "#e5e7eb",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div
            style={{
              animation: enabled && widgetCount > 10 ? "textCorruption 2s ease-in-out infinite" : "none",
            }}
          >
            widgets: <strong>{widgetCount}</strong>
          </div>
          <div
            style={{
              animation: enabled && totalHits > 100 ? "flicker 0.2s infinite" : "none",
            }}
          >
            total ticks: <strong>{totalHits}</strong>
          </div>
          <div
            style={{
              animation: enabled && globalPhantomRefs.length > 20 ? "shake 0.15s infinite" : "none",
            }}
          >
            interval footprints: <strong>{globalPhantomRefs.length}</strong>
          </div>
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
          }}
        >
          refresh period (ms)
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={refreshMs}
            onChange={e => setRefreshMs(Number(e.target.value))}
          />
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              opacity: 0.9,
            }}
          >
            {refreshMs}
          </span>
        </label>
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 4,
          borderRadius: 10,
          background: "#020617",
          border: "1px solid #111827",
          maxHeight: 220,
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: widgetCount * 28,
          }}
        >
          {ids.map(id => (
            <WidgetCell
              key={id}
              id={id}
              refreshMs={refreshMs}
              onTick={handleTick}
              onPanic={handlePanic}
              enabled={enabled}
            />
          ))}
        </div>
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>
          Each widget creates its own interval instead of one shared timer. It&apos;s like having 20 separate timers all doing the same thing, except they&apos;re all slightly out of sync and your CPU hates you.
        </li>
        <li>
          Effect depends on <code>hits</code>, so it recreates every single tick. The cleanup runs, but then the effect runs again immediately because <code>hits</code> changed. The global array keeps growing forever like a tumor.
        </li>
        <li>
          Widgets call <code>onPanic()</code> to spawn more widgets, which spawn more intervals, which spawn more widgets. It&apos;s a fucking pyramid scheme where the product is CPU usage and everyone loses.
        </li>
      </ul>

      <IRLBox>
        <li>
          Local: dashboard feels slow, leave it open for lunch, come back, CPU at 100%, laptop sounds like a jet engine.
        </li>
        <li>
          Staging: 20 widgets = 20 identical API calls every second, backend graphs look like a fucking heart attack.
        </li>
        <li>
          Prod: analytics page open for 10 minutes, phone gets hot enough to cook eggs, browser kills the tab, user thinks your app is broken.
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#a855f7"
        label="the code that runs a widget pyramid scheme"
      />
    </Panel>
  );
}

// ------- main page -------

export default function Page() {
  const [brainOn, setBrainOn] = useState(false);
  const [loopOn, setLoopOn] = useState(false);
  const [meshOn, setMeshOn] = useState(false);
  const [ddosOn, setDdosOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);

  const chaos =
    (brainOn ? 3 : 0) +
    (loopOn ? 2 : 0) +
    (meshOn ? 2 : 0) +
    (ddosOn ? 3 : 0) +
    (gridOn ? 2 : 0);

  const hasChaos = chaos > 0;

  const chaosTone =
    chaos === 0 ? "cool" : chaos <= 4 ? "cool" : chaos <= 8 ? "warm" : "hot";

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        background:
          "radial-gradient(circle at top, #020617 0%, #020617 40%, #000000 75%, #020617 100%)",
        color: "#e5e7eb",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <GlobalStyles />
      <BackgroundOrbs />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 10% 0, rgba(56,189,248,0.2), transparent 55%), radial-gradient(circle at 90% 100%, rgba(124,58,237,0.25), transparent 50%)",
          opacity: 0.7,
          mixBlendMode: "screen",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <header style={{ marginBottom: 18 }}>
          <h1
            style={{
              marginTop: 0,
              marginBottom: 4,
              letterSpacing: 0.15,
              fontSize: 25,
              textTransform: "lowercase",
              animation: "headerGlitch 6s infinite, textCorruption 4s ease-in-out infinite",
              transform: hasChaos ? "skew(0.5deg)" : "skew(0deg)",
            }}
          >
            this is what happens when you use useEffect like a fucking moron
          </h1>
          <p
            style={{
              maxWidth: 760,
              fontSize: 13,
              color: "#9ca3af",
              marginBottom: 10,
            }}
          >
            These are real bugs I&apos;ve seen in production. Every time you think &quot;I&apos;ll just useEffect it&quot;, you&apos;re making one of these. Stop it. You&apos;re killing your app.
          </p>

          {/* default state clarity banner */}
          <div
            style={{
              marginTop: 8,
              marginBottom: 12,
              padding: 10,
              borderRadius: 14,
              background: hasChaos
                ? "linear-gradient(90deg, rgba(248,113,113,0.18), rgba(30,64,175,0.9))"
                : "linear-gradient(90deg, rgba(22,163,74,0.22), rgba(15,23,42,0.9))",
              border: hasChaos
                ? "1px solid rgba(248,113,113,0.8)"
                : "1px solid rgba(34,197,94,0.8)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              boxShadow: hasChaos
                ? "0 0 26px rgba(248,113,113,0.55)"
                : "0 0 20px rgba(34,197,94,0.4)",
            }}
          >
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 0.1,
                border: "1px solid rgba(15,23,42,0.4)",
                background: "rgba(0,0,0,0.35)",
              }}
            >
              {hasChaos ? "you broke it, you monster" : "safe mode - nothing broken yet"}
            </span>

            {!hasChaos && (
              <span style={{ fontSize: 12, opacity: 0.9 }}>
                Everything is off. No leaks. No infinite loops. No memory issues. Your computer is fine.
              </span>
            )}

            {hasChaos && (
              <span style={{ fontSize: 12, opacity: 0.95 }}>
                You turned something on. Now your app is broken, your CPU is screaming, and it&apos;s 100% your fault. Congratulations.
              </span>
            )}
          </div>

          {/* corruption meter with real world labels */}
          <div
            style={{
              marginTop: 4,
              marginBottom: 14,
              padding: 12,
              borderRadius: 16,
              background: "rgba(2,6,23,0.95)",
              border: "1px solid rgba(148,163,184,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 12,
              flexWrap: "wrap",
              boxShadow: "0 0 40px rgba(15,23,42,0.9)",
            }}
          >
            <span style={{ opacity: 0.9 }}>corruption meter</span>
            <div
              style={{
                position: "relative",
                width: 220,
                height: 12,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg,#022c22,#020617,#111827,#020617)",
                overflow: "hidden",
                border: "1px solid #111827",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    chaosTone === "hot"
                      ? "linear-gradient(90deg,#22c55e,#eab308,#f97316,#ef4444)"
                      : chaosTone === "warm"
                      ? "linear-gradient(90deg,#22c55e,#a3e635,#eab308)"
                      : "linear-gradient(90deg,#22c55e,#22c55e,#a3e635)",
                  transformOrigin: "left center",
                  transform: `scaleX(${chaos / 12})`,
                  transition: "transform 160ms linear",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(120deg, rgba(248,250,252,0.3) 0, transparent 45%)",
                  mixBlendMode: "soft-light",
                  animation: "corruptionShimmer 4s ease-in-out infinite",
                }}
              />
            </div>
            <span 
              style={{ 
                opacity: 0.9,
                animation: chaos > 8 ? "flicker 0.5s infinite" : "none",
              }}
            >
              {chaos === 0 &&
                "Stage 0: nothing running, everything is fine, your computer is happy."}
              {chaos > 0 &&
                chaos <= 4 &&
                "Stage 1: minor jank, CPU bumps, you probably won&apos;t notice until it&apos;s too late."}
              {chaos > 4 &&
                chaos <= 8 &&
                "Stage 2: noticeable lag, perf charts look like a heart attack, users complain, you blame React."}
              {chaos > 8 &&
                "Stage 3: everything is broken, fans spinning like jet engines, oncall is paged, you&apos;re fired."}
            </span>
            <span
              style={{
                marginLeft: "auto",
                opacity: 0.7,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: chaos === 0 ? "#22c55e" : "#ef4444",
                  boxShadow:
                    chaos === 0
                      ? "0 0 12px rgba(34,197,94,0.8)"
                      : "0 0 16px rgba(239,68,68,0.9)",
                }}
              />
              global noise: {globalNoiseLog.length} entries
            </span>
          </div>

          {/* hydration note */}
          <div
            style={{
              fontSize: 10,
              color: "#9ca3af",
              opacity: 0.9,
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "1px 6px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.6)",
                textTransform: "uppercase",
                letterSpacing: 0.1,
              }}
            >
              hydration gossip
            </span>
            <span>
              Background orbs used <code>Math.random()</code> in render, React yelled about hydration. Fixed with deterministic PRNG. The bug wasn&apos;t React, it was side effects in render. Classic.
            </span>
          </div>
        </header>

        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
            fontSize: 12,
          }}
        >
          <IssueToggle
            label="CPU Spinner Loop"
            description="interval + RAF + random deps = your CPU commits suicide"
            active={brainOn}
            onChange={setBrainOn}
            accent="#f97316"
            hint="cpu"
          />
          <IssueToggle
            label="Feedback Chain Recursor"
            description="two effects in a toxic relationship = infinite renders"
            active={loopOn}
            onChange={setLoopOn}
            accent="#22c55e"
            hint="render loop"
          />
          <IssueToggle
            label="Memory Leak Listener Mesh"
            description="mousemove listeners that leak memory like a sieve"
            active={meshOn}
            onChange={setMeshOn}
            accent="#3b82f6"
            hint="dom haunt"
          />
          <IssueToggle
            label="Fetch DDOS Cannon"
            description="you accidentally DDoS your own API because you&apos;re an idiot"
            active={ddosOn}
            onChange={setDdosOn}
            accent="#ef4444"
            hint="network"
          />
          <IssueToggle
            label="Widget Pyramid Scheme"
            description="widgets spawn widgets like cancer, intervals spawn intervals like cancer"
            active={gridOn}
            onChange={setGridOn}
            accent="#a855f7"
            hint="fan chorus"
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 16,
          }}
        >
          {brainOn && <CpuSpinnerLoop enabled={brainOn} />}
          {loopOn && <FeedbackChainRecursor enabled={loopOn} />}
          {meshOn && <MemoryLeakListenerMesh enabled={meshOn} />}
          {ddosOn && <FetchDdosCannon enabled={ddosOn} />}
          <WidgetPyramidScheme enabled={gridOn} />
        </section>

        <p
          style={{
            marginTop: 24,
            fontSize: 11,
            opacity: 0.7,
            color: "#9ca3af",
          }}
        >
          Fix these. Rewrite them properly. Stop using useEffect for everything. Your CPU will thank you. Your users will thank you. Your oncall will thank you. Just fucking fix them.
        </p>

        {/* CONSPIRACY SECTION */}
        <div
          style={{
            marginTop: 60,
            padding: 24,
            borderRadius: 16,
            background:
              "linear-gradient(135deg, rgba(127,29,29,0.95) 0%, rgba(69,10,10,0.98) 50%, rgba(127,29,29,0.95) 100%)",
            border: "3px solid #ef4444",
            boxShadow:
              "0 0 40px rgba(239,68,68,0.6), inset 0 0 20px rgba(0,0,0,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Red scanlines overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(239,68,68,0.1) 0, rgba(239,68,68,0.1) 1px, transparent 1px, transparent 2px)",
              pointerEvents: "none",
              animation: "scanline 2s linear infinite",
            }}
          />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: 20,
                padding: "12px 0",
                borderTop: "2px solid #ef4444",
                borderBottom: "2px solid #ef4444",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fef2f2",
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  textShadow:
                    "0 0 20px rgba(239,68,68,0.8), 0 0 40px rgba(239,68,68,0.6), 2px 2px 0 #7f1d1d",
                  animation: "flicker 1s infinite",
                }}
              >
                ⚠️ WAKE UP DEVELOPERS ⚠️
              </h2>
            </div>

            <div
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "#fef2f2",
              }}
            >
              <p
                style={{
                  margin: "16px 0",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fca5a5",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                THEY DON&apos;T WANT YOU TO KNOW THIS
              </p>

              <p style={{ margin: "12px 0", fontSize: 15 }}>
                <strong style={{ color: "#fca5a5", fontSize: 16 }}>
                  React doesn&apos;t want you to know the truth about useEffect.
                </strong>{" "}
                The &quot;documentation&quot; is a LIE. The &quot;best practices&quot; are
                PROPAGANDA. Every time you use useEffect, you&apos;re playing into their
                hands.
              </p>

              <p style={{ margin: "12px 0", fontSize: 15 }}>
                <strong style={{ color: "#fca5a5", fontSize: 16 }}>
                  Big Tech is hiding the REAL way to write React code.
                </strong>{" "}
                They want you dependent on useEffect. They want your apps to be slow.
                They want your CPU to burn. WHY? Because slow apps = more server costs =
                more money for Big Cloud.
              </p>

              <div
                style={{
                  margin: "20px 0",
                  padding: 16,
                  background: "rgba(0,0,0,0.4)",
                  border: "2px dashed #ef4444",
                  borderRadius: 8,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fef2f2",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  THE TRUTH THEY DON&apos;T WANT YOU TO KNOW:
                </p>
                <ul
                  style={{
                    margin: "12px 0 0 0",
                    paddingLeft: 24,
                    fontSize: 14,
                  }}
                >
                  <li style={{ margin: "8px 0" }}>
                    useEffect was designed to FAIL. It&apos;s a trap. Every dependency
                    array is a ticking time bomb.
                  </li>
                  <li style={{ margin: "8px 0" }}>
                    The React team KNOWS about infinite loops. They&apos;re not bugs,
                    they&apos;re FEATURES. They want your app to crash.
                  </li>
                  <li style={{ margin: "8px 0" }}>
                    Memory leaks aren&apos;t accidents. They&apos;re INTENTIONAL. Big
                    Browser wants you to buy more RAM.
                  </li>
                  <li style={{ margin: "8px 0" }}>
                    The &quot;Rules of Hooks&quot; are a distraction. The REAL rules are
                    hidden in the source code. They don&apos;t want you to read it.
                  </li>
                  <li style={{ margin: "8px 0" }}>
                    Every useEffect you write makes Mark Zuckerberg stronger. This is not
                    a joke. This is REAL.
                  </li>
                </ul>
              </div>

              <p
                style={{
                  margin: "20px 0",
                  padding: 12,
                  background: "rgba(239,68,68,0.2)",
                  border: "2px solid #ef4444",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#fef2f2",
                }}
              >
                ⚠️ THEY&apos;RE WATCHING YOU RIGHT NOW ⚠️
                <br />
                <span style={{ fontSize: 12, opacity: 0.9 }}>
                  Every useEffect you write is logged. Every infinite loop is tracked.
                  Every memory leak is monitored. WAKE UP.
                </span>
              </p>

              <div
                style={{
                  margin: "20px 0",
                  padding: 16,
                  background: "linear-gradient(90deg, rgba(239,68,68,0.3), rgba(127,29,29,0.3))",
                  border: "3px solid #ef4444",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#fef2f2",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    textShadow: "0 0 15px rgba(239,68,68,0.8)",
                  }}
                >
                  THE SOLUTION THEY DON&apos;T WANT YOU TO KNOW:
                </p>
                <p
                  style={{
                    margin: "12px 0 0 0",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fca5a5",
                  }}
                >
                  STOP USING useEffect. USE YOUR BRAIN INSTEAD.
                </p>
                <p style={{ margin: "8px 0 0 0", fontSize: 13, opacity: 0.9 }}>
                  They want you dependent. They want you weak. They want you to reach for
                  useEffect like a crutch. BREAK FREE. THINK FOR YOURSELF. WRITE BETTER
                  CODE.
                </p>
              </div>

              <p
                style={{
                  margin: "24px 0 0 0",
                  fontSize: 12,
                  textAlign: "center",
                  opacity: 0.7,
                  fontStyle: "italic",
                }}
              >
                Share this page with 10 developers or your next useEffect will create an
                infinite loop. This is not a threat. This is a FACT.
              </p>

              <div
                style={{
                  marginTop: 20,
                  padding: 8,
                  textAlign: "center",
                  fontSize: 10,
                  opacity: 0.6,
                  borderTop: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                <p style={{ margin: 0 }}>
                  🔴 LIVE: {new Date().toLocaleString()} | DEVELOPERS AWAKENED:{" "}
                  {Math.floor(Math.random() * 10000) + 1000} | STATUS: THEY KNOW
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
