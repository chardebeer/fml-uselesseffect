"use client";

import { useEffect, useState } from "react";
import Panel from "../ui/Panel";
import MetricPill from "../ui/MetricPill";
import IRLBox from "../ui/IRLBox";
import CodeSnippet from "../ui/CodeSnippet";
import { globalNoiseLog } from "../../utils/constants";

/* FETCH DDOS CANNON
   The part of your app that thinks "got a response" means "send another".
*/
export default function FetchDdosCannon({ enabled }) {
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
      title={
        <>
          <span style={{ marginRight: 6 }}>💥</span> Fetch DDOS Cannon
        </>
      }
      subtitle="you accidentally built a DDoS attack against your own API because you&apos;re an idiot (╯°□°）╯"
      accent="#f38ba8"
      glitch={enabled && floodLevel > 0.7}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          fontSize: 13,
          color: "#cdd6f4",
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
              color: errors > 10 ? "#f38ba8" : "#cdd6f4",
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
          background: "#1e1e2e",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 10% 0, rgba(243,139,168,0.35), transparent 55%)",
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
                "repeating-linear-gradient(45deg,#f38ba8 0,#f38ba8 4px,#eba0ac 4px,#eba0ac 8px)",
            }}
          />
          <div
            style={{
              width: `${Math.min(100, responses)}%`,
              background:
                "repeating-linear-gradient(-45deg,#a6e3a1 0,#a6e3a1 4px,#94e2d5 4px,#94e2d5 8px)",
            }}
          />
        </div>
      </div>

      <p style={{ marginTop: 8, fontSize: 11, color: "#bac2de" }}>
        Network tab is just a wall of identical requests. Backend graphs go vertical. You blame infrastructure and go home early. (╯°□°）╯
      </p>

      <IRLBox>
        <li>
          Local: network tab is just 500 identical requests, can&apos;t find the one you need, you give up and use Postman. (╯°□°）╯
        </li>
        <li>
          Staging: SRE asks why one page load = 200 API calls. You say &quot;must be caching&quot; and hope they don&apos;t check. (ノಠ益ಠ)ノ
        </li>
        <li>
          Prod: rate limits hit, errors spike, PM says backend is broken, you close DevTools and pretend you didn&apos;t see it. (╥﹏╥)
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#f38ba8"
        label="the code that DDoSes your own API"
      />
    </Panel>
  );
}

