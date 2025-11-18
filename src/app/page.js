"use client";

import { useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import BackgroundOrbs from "../components/BackgroundOrbs";
import IssueToggle from "../components/ui/IssueToggle";
import CpuSpinnerLoop from "../components/demos/CpuSpinnerLoop";
import FeedbackChainRecursor from "../components/demos/FeedbackChainRecursor";
import MemoryLeakListenerMesh from "../components/demos/MemoryLeakListenerMesh";
import FetchDdosCannon from "../components/demos/FetchDdosCannon";
import WidgetPyramidScheme from "../components/demos/WidgetPyramidScheme";
import ConspiracySection from "../components/ConspiracySection";
import { globalNoiseLog } from "../utils/constants";

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
          "radial-gradient(circle at top, #1e1e2e 0%, #1e1e2e 40%, #11111b 75%, #1e1e2e 100%)",
        color: "#cdd6f4",
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
            "radial-gradient(circle at 10% 0, rgba(148,226,213,0.2), transparent 55%), radial-gradient(circle at 90% 100%, rgba(203,166,247,0.25), transparent 50%)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 32, filter: "drop-shadow(0 0 8px rgba(203,166,247,0.5))" }}>💻</span>
            <h1
              style={{
                marginTop: 0,
                marginBottom: 0,
                letterSpacing: 0.15,
                fontSize: 25,
                textTransform: "lowercase",
                animation: "headerGlitch 6s infinite, textCorruption 4s ease-in-out infinite",
                transform: hasChaos ? "skew(0.5deg)" : "skew(0deg)",
              }}
            >
              this is what happens when you use useEffect like a fucking moron
            </h1>
            <span style={{ fontSize: 32, filter: "drop-shadow(0 0 8px rgba(243,139,168,0.5))" }}>🔥</span>
          </div>
          {hasChaos && (
            <div
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 10,
                fontFamily: "monospace",
                color: "#f38ba8",
                opacity: 0.8,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              <pre style={{ margin: 0, fontFamily: "monospace" }}>
{`(╯°□°）╯︵ ┻━┻  (ノಠ益ಠ)ノ彡┻━┻  ┬─┬ノ( º _ ºノ)`}
              </pre>
            </div>
          )}
          <p
            style={{
              maxWidth: 760,
              fontSize: 13,
              color: "#bac2de",
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
                  ? "linear-gradient(90deg, rgba(243,139,168,0.18), rgba(30,30,46,0.9))"
                  : "linear-gradient(90deg, rgba(166,227,161,0.22), rgba(30,30,46,0.9))",
              border: hasChaos
                  ? "1px solid rgba(243,139,168,0.8)"
                  : "1px solid rgba(166,227,161,0.8)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              boxShadow: hasChaos
                  ? "0 0 26px rgba(243,139,168,0.55)"
                  : "0 0 20px rgba(166,227,161,0.4)",
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
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {hasChaos ? "chaos mode - you did this" : "nothing broken yet"}
            </span>

            {!hasChaos && (
              <span style={{ fontSize: 12, opacity: 0.9 }}>
                Everything is off. No leaks. No infinite loops. No memory issues. Your computer is fine.
              </span>
            )}

            {hasChaos && (
              <span style={{ fontSize: 12, opacity: 0.95 }}>
                You flipped a switch. Now your app is broken and your CPU is crying. This is what you wanted, right?
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
              background: "rgba(24,24,37,0.95)",
              border: "1px solid rgba(108,112,134,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 12,
              flexWrap: "wrap",
              boxShadow: "0 0 40px rgba(15,23,42,0.9)",
            }}
          >
            <span style={{ opacity: 0.9, whiteSpace: "nowrap", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>📊</span> corruption meter
            </span>
            <div
              style={{
                position: "relative",
                width: 220,
                height: 12,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg,#1e2320,#1e1e2e,#313244,#1e1e2e)",
                overflow: "hidden",
                border: "1px solid #313244",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    chaosTone === "hot"
                      ? "linear-gradient(90deg,#a6e3a1,#f9e2af,#fab387,#f38ba8)"
                      : chaosTone === "warm"
                      ? "linear-gradient(90deg,#a6e3a1,#94e2d5,#f9e2af)"
                      : "linear-gradient(90deg,#a6e3a1,#a6e3a1,#94e2d5)",
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
                flex: "1 1 200px",
                minWidth: 0,
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
                opacity: 0.7,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: chaos === 0 ? "#a6e3a1" : "#f38ba8",
                  boxShadow:
                    chaos === 0
                      ? "0 0 12px rgba(166,227,161,0.8)"
                      : "0 0 16px rgba(243,139,168,0.9)",
                }}
              />
              global noise: {globalNoiseLog.length} entries
            </span>
          </div>

          {/* hydration note */}
          <div
            style={{
              fontSize: 10,
              color: "#bac2de",
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
                border: "1px solid rgba(108,112,134,0.6)",
                textTransform: "uppercase",
                letterSpacing: 0.1,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 10 }}>💧</span> hydration gossip
            </span>
            <span>
              Background orbs used <code>Math.random()</code> in render, React yelled about hydration. Fixed with deterministic PRNG. The bug wasn&apos;t React, it was side effects in render. Classic.
            </span>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
            marginBottom: 20,
            fontSize: 12,
          }}
        >
          <IssueToggle
            label="CPU Spinner Loop"
            description="interval + RAF + random deps = your CPU commits suicide"
            active={brainOn}
            onChange={setBrainOn}
            accent="#fab387"
            hint="cpu"
          />
          <IssueToggle
            label="Feedback Chain Recursor"
            description="two effects in a toxic relationship = infinite renders"
            active={loopOn}
            onChange={setLoopOn}
            accent="#a6e3a1"
            hint="render loop"
          />
          <IssueToggle
            label="Memory Leak Listener Mesh"
            description="mousemove listeners that leak memory like a sieve"
            active={meshOn}
            onChange={setMeshOn}
            accent="#89b4fa"
            hint="dom haunt"
          />
          <IssueToggle
            label="Fetch DDOS Cannon"
            description="you accidentally DDoS your own API because you&apos;re an idiot"
            active={ddosOn}
            onChange={setDdosOn}
            accent="#f38ba8"
            hint="network"
          />
          <IssueToggle
            label="Widget Pyramid Scheme"
            description="widgets spawn widgets like cancer, intervals spawn intervals like cancer"
            active={gridOn}
            onChange={setGridOn}
            accent="#cba6f7"
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
            color: "#bac2de",
          }}
        >
          Fix these. Rewrite them properly. Stop using useEffect for everything. Your CPU will thank you. Your users will thank you. Your oncall will thank you. Just fucking fix them.
          
          <div
            style={{
              marginTop: 16,
              fontSize: 9,
              fontFamily: "monospace",
              color: "#cba6f7",
              opacity: 0.7,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            <pre style={{ margin: 0, fontFamily: "monospace" }}>
{`┌─────────────────────────────────────┐
│  (╯°□°）╯︵ ┻━┻  WHY  ┻━┻  (╯°□°）╯  │
│     WHY DID YOU DO THIS TO ME         │
└─────────────────────────────────────┘`}
            </pre>
          </div>
        </p>

        <ConspiracySection />
      </div>
    </main>
  );
}
