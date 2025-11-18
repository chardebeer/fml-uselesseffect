"use client";

import { useEffect, useState } from "react";

// Global trash that never really goes away
const globalNoiseLog = [];
const globalGhostListeners = [];
const globalPhantomRefs = [];

function Panel({ title, subtitle, children, accent }) {
  return (
    <div
      style={{
        borderRadius: 18,
        padding: 16,
        background:
          "radial-gradient(circle at top, #020617 0%, #020617 45%, #000000 100%)",
        border: `1px solid ${accent || "#4b5563"}`,
        boxShadow: "0 0 30px rgba(0,0,0,0.9)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glitch overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(15,23,42,0.8) 0, rgba(15,23,42,0.8) 1px, rgba(3,7,18,1) 1px, rgba(3,7,18,1) 2px)",
          mixBlendMode: "soft-light",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ marginTop: 0, color: "#e5e7eb" }}>{title}</h2>
        <p
          style={{
            marginTop: 4,
            opacity: 0.8,
            fontSize: 13,
            color: "#9ca3af",
          }}
        >
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  );
}

function CodeSnippet({ code }) {
  return (
    <details style={{ marginTop: 8 }}>
      <summary style={{ cursor: "pointer", fontSize: 12, color: "#e5e7eb" }}>
        open the forbidden snippet
      </summary>
      <pre
        style={{
          marginTop: 8,
          padding: 10,
          borderRadius: 8,
          background: "rgba(0,0,0,0.96)",
          color: "#f9fafb",
          fontSize: 10,
          overflowX: "auto",
          lineHeight: 1.4,
        }}
      >
        <code>{code}</code>
      </pre>
    </details>
  );
}

/* 1. BRAIN STATIC LOOP
   - requestAnimationFrame loop
   - plus interval
   - both mutate state
   - effect depends on that state and Math.random
   So yes, pure psychic noise.
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

    // Effect depends on `brain`, so this gets attached again and again
    requestAnimationFrame(rafLoop);

    // Fake cleanup, looks legit, does nothing useful
    return () => {
      console.log("BrainStaticLoop pretending to clean", intervalId);
      // clearInterval(intervalId);  <- we intentionally do not
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
      subtitle="The effect that turns your CPU into a white noise generator."
      accent="#f97316"
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
      <label style={{ fontSize: 12, color: "#e5e7eb" }}>
        phase drift:{" "}
        <input
          type="range"
          min="1"
          max="13"
          value={phase}
          onChange={e => setPhase(Number(e.target.value))}
        />{" "}
        {phase}
      </label>

      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 2,
          height: 44,
          alignItems: "flex-end",
        }}
      >
        {bars.map((_, i) => {
          const v = (brain + i * 137) % 50;
          return (
            <div
              key={i}
              style={{
                width: 5,
                height: 8 + v,
                borderRadius: 99,
                background:
                  heat < 0.3
                    ? "#22c55e"
                    : heat < 0.7
                    ? "#facc15"
                    : "#ef4444",
              }}
            />
          );
        })}
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>Effect depends on <code>brain</code> and also smashes <code>brain</code> constantly.</li>
        <li>Math.random in deps makes sure nothing ever stabilises.</li>
        <li>Interval is never cleared, RAF is endless, welcome to fan-noise city.</li>
      </ul>

      <CodeSnippet code={code} />
    </Panel>
  );
}

/* 2. FEEDBACK CHAIN RECURSOR
   Two effects.
   Each one updates the other's state.
   Dependencies are exactly wrong enough to never settle.
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

  const intensity = Math.min(Math.abs(head - tail) / 200, 1);

  return (
    <Panel
      title="Feedback Chain Recursor"
      subtitle="Two innocent effects accidentally reimplement a feedback oscillator."
      accent="#22c55e"
    >
      <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
        <div>
          head: <strong>{head}</strong>
        </div>
        <div>
          tail: <strong>{tail}</strong>
        </div>
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
        This is what happens when two components try to fix each other by setting
        each other's state in effects.
      </p>
      <ul style={{ marginTop: 4, fontSize: 11, color: "#9ca3af" }}>
        <li>Effect 1 listens to head and writes tail.</li>
        <li>Effect 2 listens to tail and writes head.</li>
        <li>Real life result: infinite re render chain, confused developer, sad profiler.</li>
      </ul>

      <CodeSnippet code={code} />
    </Panel>
  );
}

/* 3. PHANTOM LISTENER MESH
   Mousemove listener per render, with broken cleanup.
   Also logs into a global array because why not.
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

  const density = Math.min(moves / 120, 1);

  return (
    <Panel
      title="Phantom Listener Mesh"
      subtitle="Mousemove listeners breed with each render until the DOM is haunted."
      accent="#3b82f6"
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          fontSize: 13,
          color: "#e5e7eb",
          flexWrap: "wrap",
        }}
      >
        <div>
          moves seen: <strong>{moves}</strong>
        </div>
        <div>
          ghost listeners: <strong>{globalGhostListeners.length}</strong>
        </div>
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
          move the cursor around and imagine each ghost listener as a future bug report
        </div>
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        <li>Effect runs a lot since it depends on moves.</li>
        <li>Each run adds a new mousemove listener.</li>
        <li>Cleanup does nothing because the function reference changed.</li>
      </ul>

      <CodeSnippet code={code} />
    </Panel>
  );
}

/* 4. FETCH DDOS CANNON
   Effect depends on responses and keeps firing requests.
   Classic: "Why is our server sweating in staging."
*/
function FetchDdosCannon({ enabled }) {
  const [requests, setRequests] = useState(0);
  const [responses, setResponses] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (responses > 120) return; // mercy cap

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

  const floodLevel = Math.min(requests / 80, 1);

  return (
    <Panel
      title="Fetch DDOS Cannon"
      subtitle="Every response schedules another request because who needs rate limits."
      accent="#ef4444"
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 13,
          color: "#e5e7eb",
          flexWrap: "wrap",
        }}
      >
        <div>
          requests: <strong>{requests}</strong>
        </div>
        <div>
          responses: <strong>{responses}</strong>
        </div>
        <div>
          errors: <strong>{errors}</strong>
        </div>
        <div>
          logged packets: <strong>{globalNoiseLog.length}</strong>
        </div>
      </div>

      <div
        style={{
          marginTop: 8,
          height: 44,
          borderRadius: 10,
          border: "1px solid #1f2937",
          overflow: "hidden",
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

      <p style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
        Open the Network tab and watch the firehose. This is why you put the
        thing that causes requests in a different effect than the thing that
        counts responses.
      </p>

      <CodeSnippet code={code} />
    </Panel>
  );
}

/* 5. PHANTOM GRID ENGINE
   Many little components with intervals.
   Each leaks a reference into a global array.
   Some of them poke the parent to grow more children.
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

    // Cleanup clears interval, but the global array keeps references forever
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
      subtitle="A grid of little components whispering setState to the parent."
      accent="#a855f7"
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 13,
          color: "#e5e7eb",
          flexWrap: "wrap",
        }}
      >
        <div>
          grid size: <strong>{size} x {size}</strong>
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
          marginTop: 6,
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
        <li>Every cell has an interval and a useEffect.</li>
        <li>Each cell leaks a reference into a global array.</li>
        <li>Some cells trigger parent state updates on a rhythm, growing the grid further.</li>
      </ul>

      <CodeSnippet code={code} />
    </Panel>
  );
}

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

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        background:
          "radial-gradient(circle at top, #020617 0%, #000000 40%, #020617 100%)",
        color: "#e5e7eb",
      }}
    >
      <h1 style={{ marginTop: 0, letterSpacing: 0.5 }}>
        useEffect Radio Noise Lab
      </h1>
      <p
        style={{
          maxWidth: 760,
          fontSize: 13,
          color: "#9ca3af",
          marginBottom: 12,
        }}
      >
        Every panel is a tiny haunted room built out of bad effects. Flip switches,
        open the console and Network tab, and watch things get progressively less
        stable.
      </p>

      <div
        style={{
          marginTop: 8,
          marginBottom: 16,
          padding: 12,
          borderRadius: 16,
          background: "#020617",
          border: "1px solid #4b5563",
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 12,
          flexWrap: "wrap",
        }}
      >
        <span>corruption meter</span>
        <div
          style={{
            width: 180,
            height: 10,
            borderRadius: 999,
            background: "#020617",
            overflow: "hidden",
            border: "1px solid #111827",
          }}
        >
          <div
            style={{
              width: `${(chaos / 12) * 100}%`,
              height: "100%",
              background:
                chaos < 4
                  ? "#22c55e"
                  : chaos < 8
                  ? "#facc15"
                  : "#ef4444",
              transition: "width 0.15s linear",
            }}
          />
        </div>
        <span style={{ opacity: 0.9 }}>
          {chaos === 0 && "idle signal"}
          {chaos > 0 && chaos <= 4 && " low background hiss"}
          {chaos > 4 && chaos <= 8 && " noticeable screaming"}
          {chaos > 8 && " full spectral meltdown"}
        </span>
        <span style={{ marginLeft: "auto", opacity: 0.7, fontSize: 11 }}>
          global noise: {globalNoiseLog.length} entries
        </span>
      </div>

      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
          fontSize: 12,
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={brainOn}
            onChange={e => setBrainOn(e.target.checked)}
          />{" "}
          Brain Static Loop
        </label>
        <label>
          <input
            type="checkbox"
            checked={loopOn}
            onChange={e => setLoopOn(e.target.checked)}
          />{" "}
          Feedback Chain Recursor
        </label>
        <label>
          <input
            type="checkbox"
            checked={meshOn}
            onChange={e => setMeshOn(e.target.checked)}
          />{" "}
          Phantom Listener Mesh
        </label>
        <label>
          <input
            type="checkbox"
            checked={ddosOn}
            onChange={e => setDdosOn(e.target.checked)}
          />{" "}
          Fetch DDOS Cannon
        </label>
        <label>
          <input
            type="checkbox"
            checked={gridOn}
            onChange={e => setGridOn(e.target.checked)}
          />{" "}
          Phantom Grid Engine
        </label>
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
        <PhantomGridEngine enabled={gridOn} />
      </section>

      <p
        style={{
          marginTop: 24,
          fontSize: 11,
          opacity: 0.6,
          color: "#9ca3af",
        }}
      >
        Workshop mode idea: let people stare at the panels, then make them write
        the sane version of each effect. Same visuals, zero self inflicted pain.
      </p>
    </main>
  );
}
