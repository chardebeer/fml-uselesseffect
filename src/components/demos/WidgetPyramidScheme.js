"use client";

import { useEffect, useState, useCallback } from "react";
import Panel from "../ui/Panel";
import IRLBox from "../ui/IRLBox";
import CodeSnippet from "../ui/CodeSnippet";
import { globalPhantomRefs } from "../../utils/constants";

/* WIDGET PYRAMID SCHEME
   Children that ping the parent with setState because of course they do.
*/
function WidgetCell({ id, refreshMs, onTick, onPanic, enabled }) {
  const [hits, setHits] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      setHits(h => {
        const next = h + 1;
        onTick();
        if (next % 7 === 0) {
          onPanic();
        }
        return next;
      });
    };

    // Start interval
    const intervalId = setInterval(tick, refreshMs);

    // every run leaves another footprint - this array only grows
    // Even though cleanup clears the interval, we keep pushing to this array
    globalPhantomRefs.push({ id, intervalId, timestamp: Date.now() });

    return () => {
      clearInterval(intervalId);
    };
    // BUG: hits in deps means effect recreates every time hits changes
    // This causes the interval to be cleared and recreated constantly
    // The cleanup runs, then the effect runs again immediately
    // This is wrong - hits should NOT be in the dependency array
    // But it still works because intervals fire, update hits, effect recreates, new interval starts
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
        boxShadow: t > 0.8 ? "0 0 6px rgba(248,250,252,0.3)" : "none",
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

export default function WidgetPyramidScheme({ enabled }) {
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
      title={
        <>
          <span style={{ marginRight: 6 }}>🔮</span> Widget Pyramid Scheme
        </>
      }
      subtitle="widgets spawn widgets spawn widgets spawn widgets until your browser gives up and dies (ﾉಥ益ಥ)ﾉ"
      accent="#cba6f7"
      glitch={enabled && widgetCount > 10}
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
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span>refresh (ms)</span>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={refreshMs}
            onChange={e => setRefreshMs(Number(e.target.value))}
            style={{ width: 100 }}
          />
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
              opacity: 0.9,
              minWidth: 40,
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
          background: "#24273a",
          border: "1px solid #313244",
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

      <ul style={{ marginTop: 8, fontSize: 11, color: "#bac2de" }}>
        <li>
          Each widget creates its own interval instead of one shared timer. It&apos;s like having 20 separate timers all doing the same thing, except they&apos;re all slightly out of sync and your CPU hates you. (╯°□°）╯
        </li>
        <li>
          Effect depends on <code>hits</code>, so it recreates every single tick. The cleanup runs, but then the effect runs again immediately because <code>hits</code> changed. The global array keeps growing forever like a tumor. (ﾉಥ益ಥ)ﾉ
        </li>
        <li>
          Widgets call <code>onPanic()</code> to spawn more widgets, which spawn more intervals, which spawn more widgets. It&apos;s a fucking pyramid scheme where the product is CPU usage and everyone loses. (ノಠ益ಠ)ノ
        </li>
      </ul>

      <IRLBox>
        <li>
          Local: dashboard feels slow, leave it open for lunch, come back, CPU at 100%, laptop sounds like a jet engine. (ﾉಥ益ಥ)ﾉ
        </li>
        <li>
          Staging: 20 widgets = 20 identical API calls every second, backend graphs look like a fucking heart attack. (╯°□°）╯
        </li>
        <li>
          Prod: analytics page open for 10 minutes, phone gets hot enough to cook eggs, browser kills the tab, user thinks your app is broken. (ノಠ益ಠ)ノ
        </li>
      </IRLBox>

      <CodeSnippet
        code={code}
        active={enabled}
        accent="#cba6f7"
        label="the code that runs a widget pyramid scheme"
      />
    </Panel>
  );
}

