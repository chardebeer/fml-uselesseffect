"use client";

import { useEffect, useState } from "react";

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

function Panel({ title, subtitle, children, accent }) {
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

// ------- cursed panels -------

/* 1. BRAIN STATIC LOOP
   This effect is a love letter to spinning fans and a hate crime against schedulers.
*/
function BrainStaticLoop({ enabled }) {
  const [brain, setBrain] = useState(0);
  const [phase, setPhase] = useState(3);

  useEffect(() => {
    if (!enabled) return;

    // Tiny interval that never dies
    const intervalId = setInterval(() => {
      setBrain(v => {
        const next = (v + phase) % 9999;
        globalNoiseLog.push({
          type: "brain-tick",
          value: next,
          t: Date.now(),
        });
        return next;
      });
    }, 16);

    function rafLoop() {
      setBrain(v => {
        const next = (v + 1) % 9999;
        globalNoiseLog.push({
          type: "brain-raf",
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
      console.log("BrainStaticLoop pretending to clean", intervalId);
    };
  }, [enabled, brain, phase, Math.random()]);

  const heat = Math.min(brain / 2000, 1);
  const bars = Array.from({ length: 48 });

  const code = `const [brain, setBrain] = useState(0);
const [phase, setPhase] = useState(3);

useEffect(() => {
  if (!enabled) return;

  const intervalId = setInterval(() => {
    setBrain(v => (v + phase) % 9999);
  }, 16);

  function rafLoop() {
    setBrain(v => (v + 1) % 9999);
    requestAnimationFrame(rafLoop);
  }

  requestAnimationFrame(rafLoop);

  // Looks like cleanup, but does not clear the interval
  return () => {
    console.log("totally cleaned", intervalId);
  };
}, [enabled, brain, phase, Math.random()]);`;

  return (
    <Panel
      title="Brain Static Loop"
      subtitle="Dear useEffect, why are you allowed to schedule both an interval and a RAF in the same breath."
      accent="#f97316"
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
          }}
        >
          brain noise: {brain}
        </div>
        <MetricPill
          label="thermal regret"
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
          const v = (brain + i * 137) % 50;
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
          Effect depends on <code>brain</code> and also smashes <code>brain</code>{" "}
          constantly.
        </li>
        <li>
          <code>Math.random()</code> in deps keeps React on a treadmill of sadness.
        </li>
        <li>
          Interval is never cleared, RAF is endless, your laptop learns to sound
          like a small jet.
        </li>
      </ul>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#f97316"
        label="show the brain damage"
      />
    </Panel>
  );
}

/* 2. FEEDBACK CHAIN RECURSOR
   Two effects writing to each other, just like that one team that only talks in incidents.
*/
function FeedbackChainRecursor({ enabled }) {
  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    setTail(() => {
      const next = (head + 1) % 9999;
      globalNoiseLog.push({ type: "head-to-tail", value: next });
      return next;
    });
  }, [enabled, head]);

  useEffect(() => {
    if (!enabled) return;
    setHead(() => {
      const next = (tail + 2) % 9999;
      globalNoiseLog.push({ type: "tail-to-head", value: next });
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
      subtitle="Dear useEffect, maybe state that depends on state that depends on state was a warning sign."
      accent="#22c55e"
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 14,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <div>
            head: <strong>{head}</strong>
          </div>
          <div>
            tail: <strong>{tail}</strong>
          </div>
        </div>
        <MetricPill
          label="feedback gain"
          value={`${Math.round(intensity * 100)}%`}
          tone={intensity > 0.7 ? "hot" : intensity > 0.3 ? "warm" : "cool"}
        />
      </div>

      <div
        style={{
          marginTop: 8,
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

      <p style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        This is what happens when two effects try to fix each other instead of
        admitting they should not exist.
      </p>
      <ul style={{ marginTop: 4, fontSize: 11, color: "#9ca3af" }}>
        <li>Effect 1 listens to head and writes tail.</li>
        <li>Effect 2 listens to tail and writes head.</li>
        <li>
          Result: infinite render loop, profiler crying in a corner, you blaming
          React instead of the mirror.
        </li>
      </ul>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#22c55e"
        label="show the mutual dependence"
      />
    </Panel>
  );
}

/* 3. PHANTOM LISTENER MESH
   Mousemove listeners as a lifestyle choice.
*/
function PhantomListenerMesh({ enabled }) {
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

function PhantomListenerMesh({ enabled }) {
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
      title="Phantom Listener Mesh"
      subtitle="Dear useEffect, why is it legal to add listeners like this in 2025."
      accent="#3b82f6"
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
          <div>
            moves seen: <strong>{moves}</strong>
          </div>
          <div>
            ghost listeners: <strong>{globalGhostListeners.length}</strong>
          </div>
        </div>
        <MetricPill
          label="dom haunt"
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
          move the cursor and imagine each ghost listener as a future bug report
          that says useEffect is broken.
        </div>
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>Effect runs all the time because it depends on moves.</li>
        <li>Each run adds a new mousemove listener.</li>
        <li>Cleanup does nothing, which is a surprising metaphor for your tests.</li>
      </ul>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#3b82f6"
        label="show the haunted cleanup"
      />
    </Panel>
  );
}

/* 4. FETCH DDOS CANNON
   If your staging keeps falling over, this panel is why.
*/
function FetchDdosCannon({ enabled }) {
  const [requests, setRequests] = useState(0);
  const [responses, setResponses] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (responses > 120) return; // mercy cap, barely

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
      subtitle="Dear useEffect, of course you keep scheduling more network traffic, why would you not."
      accent="#ef4444"
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
          <div>
            requests: <strong>{requests}</strong>
          </div>
          <div>
            responses: <strong>{responses}</strong>
          </div>
          <div>
            errors: <strong>{errors}</strong>
          </div>
        </div>
        <MetricPill
          label="flood level"
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
        Network tab is your crime scene now. This effect is exactly the pattern
        that convinces people React is secretly a distributed denial of service
        library.
      </p>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#ef4444"
        label="show the request spiral"
      />
    </Panel>
  );
}

/* 5. PHANTOM GRID ENGINE
   Children that ping the parent with setState because why not.
*/
function PhantomCell({ id, onEcho }) {
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCharge(c => {
        const next = (c + 7) % 100;
        if (next % 35 === 0) {
          onEcho();
        }
        return next;
      });
    }, 240);

    globalPhantomRefs.push({ id, intervalId });

    return () => {
      clearInterval(intervalId);
    };
  }, [id, onEcho]);

  const t = charge / 100;
  const bg = `rgba(${Math.floor(40 + 180 * t)},${Math.floor(
    20 + 40 * t
  )},${Math.floor(80 + 120 * (1 - t))},0.85)`;

  return (
    <div
      style={{
        width: 20,
        height: 20,
        margin: 2,
        borderRadius: 4,
        background: bg,
        border: "1px solid #020617",
        boxShadow: t > 0.8 ? "0 0 8px rgba(248,250,252,0.7)" : "none",
      }}
    />
  );
}

function PhantomGridEngine({ enabled }) {
  const [size, setSize] = useState(3);

  function handleEcho() {
    setSize(s => (s < 10 ? s + 1 : s));
  }

  const cells = enabled ? size * size : 0;
  const ids = Array.from({ length: cells }).map((_, i) => i);

  const code = `const globalPhantomRefs = [];

function PhantomCell({ id, onEcho }) {
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCharge(c => {
        const next = (c + 7) % 100;
        if (next % 35 === 0) {
          onEcho(); // child modifies parent
        }
        return next;
      });
    }, 240);

    globalPhantomRefs.push({ id, intervalId });

    return () => clearInterval(intervalId);
  }, [id, onEcho]);

  return <div className="cell" />;
}`;

  return (
    <Panel
      title="Phantom Grid Engine"
      subtitle="Dear useEffect, thanks for teaching us that children can resize their own parent component."
      accent="#a855f7"
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
          <div>
            grid size:{" "}
            <strong>
              {size} x {size}
            </strong>
          </div>
          <div>
            active cells: <strong>{cells}</strong>
          </div>
          <div>
            phantom refs: <strong>{globalPhantomRefs.length}</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSize(s => (s < 10 ? s + 1 : s))}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid #a855f7",
            background: "#020617",
            color: "#e5e7eb",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          manually feed the grid
        </button>
      </div>

      <div
        style={{
          marginTop: 10,
          padding: 4,
          borderRadius: 10,
          background: "#020617",
          border: "1px solid #111827",
          maxHeight: 200,
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: size * 24,
          }}
        >
          {ids.map(id => (
            <PhantomCell key={id} id={id} onEcho={handleEcho} />
          ))}
        </div>
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>Every cell has an interval and a useEffect, because of course it does.</li>
        <li>Each cell leaks a reference into a global array like a tiny memory crime.</li>
        <li>
          Some cells whisper setState to the parent so the grid keeps growing out
          of sheer spite.
        </li>
      </ul>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#a855f7"
        label="show the phantom swarm"
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
              animation: "headerGlitch 6s infinite",
            }}
          >
            dear useEffect, we need to talk
          </h1>
          <p
            style={{
              maxWidth: 760,
              fontSize: 13,
              color: "#9ca3af",
              marginBottom: 10,
            }}
          >
            This lab is not a tutorial. It is a collection of side effect crimes.
            Every panel is something we once shipped, looked at in the profiler,
            and blamed on React instead of our own choices.
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
              {hasChaos ? "self inflicted chaos" : "default state - safe mode"}
            </span>

            {!hasChaos && (
              <span style={{ fontSize: 12, opacity: 0.9 }}>
                All switches are off. No leaking intervals. No haunted listeners.
                No network storms. This is the last moment where the app respects
                your hardware.
              </span>
            )}

            {hasChaos && (
              <span style={{ fontSize: 12, opacity: 0.95 }}>
                You chose to turn something on. Every error in the console from
                this point forward is a love letter from useEffect addressed
                directly to you.
              </span>
            )}
          </div>

          {/* corruption meter */}
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
            <span style={{ opacity: 0.9 }}>
              {chaos === 0 && "no effects are currently running"}
              {chaos > 0 && chaos <= 4 && "background hiss - ignorable until it is not"}
              {chaos > 4 && chaos <= 8 && "noticeable screaming - profiler recommended"}
              {chaos > 8 && "full spectral meltdown - please open Task Manager"}
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

          {/* tiny hydration note - pointed at useEffect habits, not React */}
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
              The background orbs used to call <code>Math.random()</code> in
              render and React complained. Now they use a deterministic pseudo
              random function. The problem was never React. It was us and our
              affection for side effects.
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
            label="Brain Static Loop"
            description="interval plus RAF plus random deps - a spa day for your fans"
            active={brainOn}
            onChange={setBrainOn}
            accent="#f97316"
            hint="cpu"
          />
          <IssueToggle
            label="Feedback Chain Recursor"
            description="two effects, one feedback loop, infinite renders"
            active={loopOn}
            onChange={setLoopOn}
            accent="#22c55e"
            hint="render loop"
          />
          <IssueToggle
            label="Phantom Listener Mesh"
            description="mousemove listeners that never leave the DOM"
            active={meshOn}
            onChange={setMeshOn}
            accent="#3b82f6"
            hint="dom haunt"
          />
          <IssueToggle
            label="Fetch DDOS Cannon"
            description="staging server as a personality test"
            active={ddosOn}
            onChange={setDdosOn}
            accent="#ef4444"
            hint="network"
          />
          <IssueToggle
            label="Phantom Grid Engine"
            description="children whispering setState to their parent forever"
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
          {brainOn && <BrainStaticLoop enabled={brainOn} />}
          {loopOn && <FeedbackChainRecursor enabled={loopOn} />}
          {meshOn && <PhantomListenerMesh enabled={meshOn} />}
          {ddosOn && <FetchDdosCannon enabled={ddosOn} />}
          {/* grid panel always renders, but can be asleep */}
          <PhantomGridEngine enabled={gridOn} />
        </section>

        <p
          style={{
            marginTop: 24,
            fontSize: 11,
            opacity: 0.7,
            color: "#9ca3af",
          }}
        >
          The real workshop exercise: keep the visuals, delete every useEffect,
          rewrite all of this with sane data flow, and see how much quieter your
          laptop becomes. Then send an apology letter to your profiler.
        </p>
      </div>
    </main>
  );
}
