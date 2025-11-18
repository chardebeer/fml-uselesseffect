"use client";

import { useEffect, useState } from "react";
import Panel from "../ui/Panel";
import MetricPill from "../ui/MetricPill";
import IRLBox from "../ui/IRLBox";
import CodeSnippet from "../ui/CodeSnippet";
import { globalNoiseLog } from "../../utils/constants";

/* FEEDBACK CHAIN RECURSOR
   Two effects writing to each other, like a pair of Slack bots having a meltdown.
*/
export default function FeedbackChainRecursor({ enabled }) {
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
      title={
        <>
          <span style={{ marginRight: 6 }}>♾️</span> Feedback Chain Recursor
        </>
      }
      subtitle="two effects in a toxic relationship where they keep triggering each other until your browser crashes (ノಠ益ಠ)ノ"
      accent="#a6e3a1"
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
          color: "#bac2de",
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
              border: "1px solid rgba(166,227,161,0.7)",
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
                background: on ? "#a6e3a1" : "#24273a",
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
          background: "#24273a",
          border: "1px solid #313244",
          fontSize: 10,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          maxHeight: 120,
          overflow: "auto",
        }}
      >
        {history.length === 0 && (
          <div style={{ opacity: 0.7 }}>
            flip the toggle to watch two effects have a mental breakdown and trigger each other until your browser commits suicide (ノಠ益ಠ)ノ
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
          Local: type one fucking character, whole app re-renders 50 times, React DevTools looks like a strobe light. (ﾉಥ益ಥ)ﾉ
        </li>
        <li>
          Staging: hover over literally anything, render apocalypse happens, you blame React 18 and close the issue. (╯°□°）╯
        </li>
        <li>
          Prod: &quot;feels slow&quot; bugs that only happen when real users use it, you can&apos;t reproduce it, users think you&apos;re gaslighting them. (ノಠ益ಠ)ノ
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#a6e3a1"
        label="the code that makes React cry"
      />
    </Panel>
  );
}

