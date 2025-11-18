"use client";

import { useEffect, useState } from "react";
import Panel from "../ui/Panel";
import MetricPill from "../ui/MetricPill";
import IRLBox from "../ui/IRLBox";
import CodeSnippet from "../ui/CodeSnippet";
import { globalNoiseLog } from "../../utils/constants";

/* CPU SPINNER LOOP
   This effect is a love letter to spinning fans and a hate crime against schedulers.
*/
export default function CpuSpinnerLoop({ enabled }) {
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
      title={
        <>
          <span style={{ marginRight: 6 }}>🌡️</span> CPU Spinner Loop
        </>
      }
      subtitle="your CPU is literally screaming and you&apos;re just watching it burn (╥﹏╥)"
      accent="#fab387"
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
            color: heat > 0.7 ? "#fab387" : "#cdd6f4",
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
          color: "#cdd6f4",
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
              ? `rgba(166,227,161,${0.5 + fraction * 0.4})`
              : heat < 0.7
              ? `rgba(249,226,175,${0.4 + fraction * 0.4})`
              : `rgba(243,139,168,${0.45 + fraction * 0.4})`;

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

      <ul style={{ marginTop: 8, fontSize: 11, color: "#bac2de" }}>
        <li>
          Effect depends on <code>spinner</code> and also sets <code>spinner</code> every 16ms. It&apos;s like setting an alarm that goes off every time you check if the alarm is set, except the alarm is your CPU and it&apos;s actually going off. (╥﹏╥)
        </li>
        <li>
          <code>Math.random()</code> in deps means this effect runs on every single render forever. React is having a fucking stroke. (ノಠ益ಠ)ノ
        </li>
        <li>
          Interval never gets cleared. RAF never stops. Your laptop is now a space heater that occasionally renders React components. (╯°□°）╯
        </li>
      </ul>

      <IRLBox>
        <li>
          Local: fans sound like a jet taking off, VS Code freezes every 2 seconds, CPU graph looks like a heart attack. (╯°□°）╯
        </li>
        <li>
          Staging: pods at 90% CPU doing absolutely fucking nothing, autoscaler panics and spawns 50 more pods, CPU still at 90%. (ノಠ益ಠ)ノ
        </li>
        <li>
          Prod: users&apos; phones literally get hot enough to cook eggs, you blame &quot;browser optimization&quot; and close the ticket. (╥﹏╥)
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#fab387"
        label="the code that turned your CPU into a space heater"
      />
    </Panel>
  );
}

