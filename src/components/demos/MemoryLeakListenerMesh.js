"use client";

import { useEffect, useState } from "react";
import Panel from "../ui/Panel";
import MetricPill from "../ui/MetricPill";
import IRLBox from "../ui/IRLBox";
import CodeSnippet from "../ui/CodeSnippet";
import { globalNoiseLog, globalGhostListeners } from "../../utils/constants";

/* MEMORY LEAK LISTENER MESH
   Mousemove listeners as a lifestyle choice.
*/
export default function MemoryLeakListenerMesh({ enabled }) {
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
      title={
        <>
          <span style={{ marginRight: 6 }}>🧠</span> Memory Leak Listener Mesh
        </>
      }
      subtitle="memory leak simulator 2024 - every mouse move spawns a new listener that never dies (╯︵╰,)"
      accent="#89b4fa"
      glitch={enabled && density > 0.7}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          fontSize: 13,
          color: "#cdd6f4",
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
            color: "#bac2de",
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          Move your mouse. Each listener is a future &quot;my browser crashed&quot; bug report that you&apos;ll never fix. (╯︵╰,)
        </div>
      </div>

      <ul style={{ marginTop: 8, fontSize: 11, color: "#bac2de" }}>
        <li>Effect depends on <code>moves</code>, so it runs every single time you move the mouse. Every. Single. Time. (╯︵╰,)</li>
        <li>Each run adds another mousemove listener to the document. They pile up like garbage in a landfill. (ﾉಥ益ಥ)ﾉ</li>
        <li>Cleanup function is completely fucking wrong, so listeners never get removed. Memory leak apocalypse. (ノಠ益ಠ)ノ</li>
      </ul>

      <IRLBox>
        <li>
          Local: move mouse, console explodes with 1000 logs per second, can&apos;t see your actual logs, you give up debugging. (╯︵╰,)
        </li>
        <li>
          Staging: navigate around, memory climbs to 2GB for no reason, you have no idea why, blame Next.js and move on. (╥﹏╥)
        </li>
        <li>
          Prod: old phones lag after 2 minutes, users close the app, you never find out why, ticket gets closed as &quot;device too old&quot;. (ノಠ益ಠ)ノ
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#89b4fa"
        label="the code that leaks memory like a sieve"
      />
    </Panel>
  );
}

