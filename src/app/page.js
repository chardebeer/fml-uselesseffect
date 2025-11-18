"use client";

import { useState } from "react";
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
    <main className="main-container">
      <BackgroundOrbs />
      <div className="bg-overlay" />
      <div className="content-wrapper">
        <header className="header">
          <div className="header-title-row">
            <span className="header-emoji">💻</span>
            <h1 className={`header-title ${hasChaos ? "chaos" : ""}`}>
              this is what happens when you use useEffect like a fucking moron
            </h1>
            <span className="header-emoji-fire">🔥</span>
          </div>
          {hasChaos && (
            <>
              <div className="kaomoji-box">
                <pre>
{`(╯°□°）╯︵ ┻━┻  (ノಠ益ಠ)ノ彡┻━┻  ┬─┬ノ( º _ ºノ)
(ง'̀-'́)ง  ༼つ◕_◕༽つ  (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧  (҂⌣̀_⌣́)
(ノಥ,_｣ಥ)ノ彡┻━┻  (ノＴ_Ｔ)ノ彡┻━┻  ┬─┬ ノ( @_@ノ)`}
                </pre>
              </div>

              <div className="ascii-rage-banner">
                <pre>
{String.raw`
  ###############################################
  #   USEEFFECT HELLFIRE INITIALIZED           #
  #   SIDE EFFECT STORM LEVEL: MAXIMUM         #
  #   CLEANUP FUNCTIONS NOT FOUND              #
  ###############################################
          \   ^__^
           \  (xx)\_______   your CPU
              (__)\       )\  is not fine
                  ||----w |
                  ||     ||`}
                </pre>
              </div>
            </>
          )}
          <p className="header-description">
            These are real bugs I&apos;ve seen in production. Every time you think
            &quot;I&apos;ll just useEffect it&quot;, you&apos;re making one of these.
            Stop it. You&apos;re killing your app.
          </p>

          {/* default state clarity banner */}
          <div className={`status-banner ${hasChaos ? "chaos" : "safe"}`}>
            <span className="status-chip">
              {hasChaos ? "chaos mode - you did this" : "nothing broken yet"}
            </span>
            {!hasChaos && (
              <span className="status-text">
                Everything is off. No leaks. No infinite loops. No memory
                issues. Your computer is fine.
              </span>
            )}
            {hasChaos && (
              <span className="status-text chaos">
                You flipped a switch. Now your app is broken and your CPU is
                crying. This is what you wanted, right?
              </span>
            )}
          </div>

          {/* corruption meter with real world labels */}
          <div className="corruption-meter">
            <span className="corruption-label">
              <span style={{ fontSize: 14 }}>📊</span> corruption meter
            </span>
            <div className="corruption-bar-container">
              <div
                className={`corruption-bar-fill ${chaosTone}`}
                style={{ transform: `scaleX(${chaos / 12})` }}
              />
              <div className="corruption-bar-shimmer" />
            </div>
            <span
              className={`corruption-stage ${
                chaos > 8 ? "critical" : ""
              }`}
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
            <span className="corruption-stats">
              <span
                className={`status-dot ${
                  chaos === 0 ? "safe" : "danger"
                }`}
              />
              global noise: {globalNoiseLog.length} entries
            </span>

            {hasChaos && (
              <div className="ascii-corruption-readout">
                <pre>
{String.raw`
   CPU THERMAL READOUT

   [████████████████████]  100%
   [██████████████░░░░░░]   78%
   [██████████░░░░░░░░░░]   54%
   [███░░░░░░░░░░░░░░░░]   12%

   ░ log:
   ░  useEffect loop detected
   ░  abandoned cleanup
   ░  runaway fetch storm
   ░  ghost event listeners`}
                </pre>
              </div>
            )}
          </div>

          {/* hydration note */}
          <div className="hydration-note">
            <span className="hydration-chip">
              <span style={{ fontSize: 10 }}>💧</span> hydration gossip
            </span>
            <span>
              Background orbs used <code>Math.random()</code> in render, React
              yelled about hydration. Fixed with deterministic PRNG. The bug
              wasn&apos;t React, it was side effects in render. Classic.
            </span>
          </div>

          {hasChaos && (
            <div className="ascii-console-dump">
              <pre>
{String.raw`
  > tail -f useEffect.log

  [WARN]  memory leak suspected.......................(╯°□°）╯
  [WARN]  dependency array missing...................┻━┻
  [ERROR] infinite render loop engaged...............(ノಠ益ಠ)ノ彡
  [ERROR] 4096 anonymous listeners attached..........┻━┻
  [FATAL] you "fixed it" by adding another useEffect  (ノ°益°)ノ 彡┻━┻`}
              </pre>
            </div>
          )}
        </header>

        <section className="toggle-grid">
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

        <section className="panel-grid">
          {brainOn && <CpuSpinnerLoop enabled={brainOn} />}
          {loopOn && <FeedbackChainRecursor enabled={loopOn} />}
          {meshOn && <MemoryLeakListenerMesh enabled={meshOn} />}
          {ddosOn && <FetchDdosCannon enabled={ddosOn} />}
          <WidgetPyramidScheme enabled={gridOn} />
        </section>

        {hasChaos && (
          <section className="ascii-hazard-wall">
            <pre>
{String.raw`
   ╔══════════════════════════════════════════════╗
   ║         SIDE EFFECT HAZARD WALL              ║
   ╠══════════════════════════════════════════════╣
   ║  ☠ useEffect in render                       ║
   ║  ☠ timers without cleanup                    ║
   ║  ☠ fetch in every single render              ║
   ║  ☠ event listeners bound in a loop           ║
   ║  ☠ state sync with props with no guards      ║
   ╚══════════════════════════════════════════════╝

        /\         /\         /\         /\
       /  \  /\   /  \  /\   /  \  /\   /  \
      /    \/  \ /    \/  \ /    \/  \ /    \
     / CPU  \    /  FAN  \    /  RAM  \    /
`}
            </pre>
          </section>
        )}

        <p className="footer-text">
          Fix these. Rewrite them properly. Stop using useEffect for everything.
          Your CPU will thank you. Your users will thank you. Your oncall will
          thank you. Just fucking fix them.
          
          <div className="ascii-box">
            <pre>
{`┌─────────────────────────────────────┐
│  (╯°□°）╯︵ ┻━┻  WHY  ┻━┻  (╯°□°）╯  │
│     WHY DID YOU DO THIS TO ME        │
└─────────────────────────────────────┘`}
            </pre>

            <pre>
{String.raw`
        .-.
       /   \\
      /  .  \\   your stack trace
      |  :  |   now looks like
      |  :  |   modern art
      |  :  |
      '.___.'   (ಥ﹏ಥ)

   (ノಠ益ಠ)ノ彡┻━┻   (ノಠ益ಠ)ノ彡┻━┻   (ノಠ益ಠ)ノ彡┻━┻`}
            </pre>
          </div>
        </p>

        <ConspiracySection />
      </div>
    </main>
  );
}
