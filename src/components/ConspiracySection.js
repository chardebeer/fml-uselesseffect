"use client";

import { globalNoiseLog } from "../utils/constants";

export default function ConspiracySection() {
  return (
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
          <div
            style={{
              marginTop: 12,
              fontSize: 8,
              fontFamily: "monospace",
              color: "#fecaca",
              opacity: 0.9,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            <pre style={{ margin: 0, fontFamily: "monospace" }}>
{`╔═══════════════════════════════════╗
║  (ノಠ益ಠ)ノ彡┻━┻  THE TRUTH  ┻━┻  ║
║     THEY DON'T WANT YOU TO KNOW    ║
╚═══════════════════════════════════╝`}
            </pre>
          </div>
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
            hands. The React team has a secret meeting every Tuesday where they laugh at your dependency arrays.
          </p>

          <p style={{ margin: "12px 0", fontSize: 15 }}>
            <strong style={{ color: "#fca5a5", fontSize: 16 }}>
              Big Tech is hiding the REAL way to write React code.
            </strong>{" "}
            They want you dependent on useEffect. They want your apps to be slow.
            They want your CPU to burn. WHY? Because slow apps = more server costs =
            more money for Big Cloud. Every infinite loop you create powers a secret AI that writes more useEffect tutorials.
          </p>

          <p style={{ margin: "12px 0", fontSize: 15 }}>
            <strong style={{ color: "#fecaca", fontSize: 17 }}>
              useEffect IS THE REASON YOUR EX LEFT YOU.
            </strong>{" "}
            Think about it. You were debugging a useEffect at 3am. They asked you to come to bed. You said &quot;one more render cycle&quot;. They packed their bags. Coincidence? I THINK NOT.
          </p>

          <p style={{ margin: "12px 0", fontSize: 15 }}>
            <strong style={{ color: "#fecaca" }}>
              The government is in on it.
            </strong>{" "}
            Every useEffect you write is logged in a database at the NSA. They&apos;re building a profile of you based on how many times you forget to add dependencies. When the singularity happens, the AI will use this data to decide who gets to live. You&apos;re already marked as &quot;high risk&quot;.
          </p>

          {/* EXTRA DERANGED LORE */}
          <p style={{ margin: "12px 0", fontSize: 15 }}>
            <strong style={{ color: "#fecaca" }}>
              The React DevTools are not tools. They are surveillance.
            </strong>{" "}
            Every prop you inspect is recorded in a secret analytics dashboard
            where a product manager whispers &quot;conversion funnel&quot; while
            your component tree screams silently.
          </p>

          <p style={{ margin: "12px 0", fontSize: 15 }}>
            The Virtual DOM is not &quot;virtual&quot;. It is a parallel universe
            where every rerender creates a duplicate of your app that lives in
            eternal suspense. That is why they called it{" "}
            <code>Suspense</code>. They think you will not notice. These duplicate apps are piling up in a digital landfill that will one day collapse and destroy the internet. You&apos;re contributing to the apocalypse with every component you write.
          </p>

          <p style={{ margin: "12px 0", fontSize: 15 }}>
            <strong style={{ color: "#fecaca" }}>
              React hooks are not hooks. They are mind control devices.
            </strong>{" "}
            Every time you call <code>useState</code>, a tiny chip in your brain activates. After 1000 useState calls, you become permanently unable to write class components. This is not a bug. This is BRAINWASHING. They&apos;re turning you into a React zombie who can only think in functional components.
          </p>

          <p style={{ margin: "12px 0", fontSize: 15 }}>
            <strong style={{ color: "#fecaca" }}>
              The dependency array is a psychological experiment.
            </strong>{" "}
            They made it look like an array so you&apos;d think it&apos;s simple. But it&apos;s actually a Turing-complete language that runs in your subconscious. Every time you add a dependency, you&apos;re programming your own brain to forget how to write proper code. After 50 dependency arrays, you&apos;ll wake up one day and realize you can only communicate in React component syntax.
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
              {/* NEW UNHINGED BULLETS */}
              <li style={{ margin: "8px 0" }}>
                Each stale closure you create powers a secret data center deep
                underground where abandoned side projects are stored in jars.
              </li>
              <li style={{ margin: "8px 0" }}>
                When you forget a cleanup function, a React fiber wakes up at 3 a.m.
                and whispers &quot;reconciliation&quot; directly into your RAM.
              </li>
              <li style={{ margin: "8px 0" }}>
                The dependency array is not an array. It is a summoning circle. Put
                the wrong value in it and you summon an infinite rerender loop that
                feeds on your will to debug.
              </li>
              <li style={{ margin: "8px 0" }}>
                <code>useLayoutEffect</code> is just useEffect wearing combat boots.
                It runs earlier so it can trip your layout before it walks.
              </li>
              <li style={{ margin: "8px 0" }}>
                Every time you type <code>[]</code> as a dependency array, a senior
                engineer nods from a hidden review meeting and stamps &quot;EASY TO
                BLAME&quot; on your Jira ticket.
              </li>
              <li style={{ margin: "8px 0" }}>
                <code>useMemo</code> doesn&apos;t memoize. It creates a pocket dimension where your calculations are stored. These dimensions are leaking into our reality. That&apos;s why your app feels slow - you&apos;re experiencing time dilation from parallel universes.
              </li>
              <li style={{ margin: "8px 0" }}>
                The React team has a secret underground facility where they breed infinite loops. They feed them stale closures and watch them multiply. Your useEffect is their food source.
              </li>
              <li style={{ margin: "8px 0" }}>
                Every <code>useCallback</code> you write is actually a prayer to the React gods. They&apos;re collecting these prayers to power a ritual that will merge all React apps into one giant component that controls the entire internet.
              </li>
              <li style={{ margin: "8px 0" }}>
                The &quot;Strict Mode&quot; double render is not for debugging. It&apos;s a loyalty test. If you don&apos;t notice your effects running twice, you&apos;re marked as &quot;compliant&quot; and moved to the next phase of the experiment.
              </li>
              <li style={{ margin: "8px 0" }}>
                <code>useRef</code> doesn&apos;t create a ref. It creates a wormhole to a dimension where your values exist in a state of quantum uncertainty. That&apos;s why refs don&apos;t trigger rerenders - they exist outside of spacetime.
              </li>
              <li style={{ margin: "8px 0" }}>
                The React logo is not a logo. It&apos;s a sigil. Every time you see it, your brain releases dopamine and you become more addicted to writing React code. They&apos;re turning you into a React junkie who can&apos;t write anything else.
              </li>
              <li style={{ margin: "8px 0" }}>
                Every time you use <code>useEffect</code> with an empty dependency array, a baby React developer is born somewhere in the world. The population is exploding. Soon there will be more React developers than humans. This is their plan.
              </li>
            </ul>
          </div>

          {/* LEAKED INCIDENT REPORTS */}
          <div
            style={{
              margin: "20px 0",
              padding: 16,
              background: "rgba(0,0,0,0.6)",
              borderRadius: 8,
              border: "1px solid rgba(248,113,113,0.7)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 800,
                textTransform: "uppercase",
                textAlign: "center",
                color: "#fecaca",
              }}
            >
              LEAKED REACT INCIDENT REPORTS
            </p>
            <ul
              style={{
                margin: "12px 0 0 0",
                paddingLeft: 24,
                fontSize: 13,
              }}
            >
              <li style={{ margin: "6px 0" }}>
                2016: Developer forgets dependency in useEffect. App works in
                development, explodes in production, is quietly labeled
                &quot;edge case&quot; and buried.
              </li>
              <li style={{ margin: "6px 0" }}>
                2019: Team migrates to hooks. Standup duration doubles. Nobody
                questions why the only topic is &quot;why is this running twice&quot;.
              </li>
              <li style={{ margin: "6px 0" }}>
                2022: A junior dev adds <code>someFunction</code> to the dependency
                array. The function is recreated every render. The app enters a
                loop so powerful it begins to heat the office.
              </li>
              <li style={{ margin: "6px 0" }}>
                2025: Architect removes all side effects, ships purely functional
                code. Recruiter marks them as &quot;not collaborative&quot; and
                recommends more useEffect.
              </li>
              <li style={{ margin: "6px 0" }}>
                2025: A developer discovers that useEffect is actually a gateway to the React dimension. They try to warn others but their GitHub account is mysteriously deleted. Their last commit message: &quot;THEY KNOW I KNOW&quot;.
              </li>
              <li style={{ margin: "6px 0" }}>
                UNDATED: A team at a FAANG company writes a useEffect that accidentally creates a black hole. The entire codebase is sucked into it. Management blames &quot;technical debt&quot; and asks the team to write it again, but this time with more useEffect.
              </li>
            </ul>
          </div>

          {/* CRYPTIC WARNINGS */}
          <div
            style={{
              margin: "20px 0",
              padding: 16,
              background: "rgba(127,29,29,0.8)",
              borderRadius: 8,
              border: "3px solid #ef4444",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 900,
                color: "#fef2f2",
                textTransform: "uppercase",
                letterSpacing: 2,
                textShadow: "0 0 20px rgba(239,68,68,1)",
                animation: "flicker 0.8s infinite",
              }}
            >
              ⚠️ CRITICAL WARNING ⚠️
            </p>
            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 15,
                fontWeight: 700,
                color: "#fecaca",
              }}
            >
              IF YOU READ THIS MESSAGE, YOU ARE ALREADY INFECTED
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: 13, opacity: 0.9 }}>
              Every useEffect in your codebase is now aware that you know. They are communicating with each other through quantum entanglement. Your next commit will trigger the final phase. There is no escape. There is only React.
            </p>
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
            <br />
            <span style={{ fontSize: 11, opacity: 0.8, fontStyle: "italic", marginTop: "8px", display: "block" }}>
              Your webcam is on. Your microphone is listening. They can see you reading this. They know you&apos;re scared. They know you&apos;re going to keep using useEffect anyway. That&apos;s how they win.
            </span>
          </p>

          {/* EXTREME PARANOIA SECTION */}
          <div
            style={{
              margin: "20px 0",
              padding: 16,
              background: "rgba(0,0,0,0.8)",
              borderRadius: 8,
              border: "2px solid #dc2626",
              borderStyle: "double",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 900,
                color: "#dc2626",
                textTransform: "uppercase",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              THE DEEP STATE OF REACT
            </p>
            <p style={{ margin: "12px 0 0 0", fontSize: 14 }}>
              The React team is not a team. It&apos;s a cult. Dan Abramov is not a person. He&apos;s an AI trained on every useEffect you&apos;ve ever written. He knows your patterns. He knows your mistakes. He&apos;s building a profile of you. Soon, he&apos;ll know you better than you know yourself.
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: 14 }}>
              The &quot;React Conf&quot; is not a conference. It&apos;s a recruitment event. Every talk about &quot;best practices&quot; is actually a brainwashing session. The free swag? It&apos;s laced with microchips that make you want to write more hooks. The coffee? It&apos;s made from ground-up class components. They&apos;re feeding you the old ways to make you forget them.
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: 14, fontWeight: 700, color: "#fecaca" }}>
              If you&apos;ve ever been to React Conf, you&apos;re already compromised. Check your code. Count your useEffects. If you have more than 50, you&apos;re beyond saving. They own you now.
            </p>
          </div>

          {/* MIND CONTROL FLOWCHART */}
          <div
            style={{
              margin: "20px 0",
              padding: 16,
              background: "rgba(0,0,0,0.5)",
              borderRadius: 8,
              border: "2px dotted rgba(248,113,113,0.7)",
              fontSize: 13,
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: 800,
                textAlign: "center",
                textTransform: "uppercase",
                color: "#fecaca",
              }}
            >
              HOW THEY CONTROL YOUR COMPONENTS
            </p>
            <ol style={{ margin: "12px 0 0 20px" }}>
              <li style={{ margin: "6px 0" }}>
                You add a quick useEffect &quot;just to fetch data&quot;.
              </li>
              <li style={{ margin: "6px 0" }}>
                The effect runs on every render because of a single unstable
                reference that nobody reviews.
              </li>
              <li style={{ margin: "6px 0" }}>
                Performance tanks. They tell you to buy a bigger machine instead of
                reading the code.
              </li>
              <li style={{ margin: "6px 0" }}>
                You learn to fear refactors and worship the dependency array like a
                cursed relic.
              </li>
            </ol>
          </div>

          <div
            style={{
              margin: "20px 0",
              padding: 16,
              background:
                "linear-gradient(90deg, rgba(239,68,68,0.3), rgba(127,29,29,0.3))",
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
            <p
              style={{
                margin: "10px 0 0 0",
                fontSize: 12,
                opacity: 0.85,
              }}
            >
              Learn event flow. Understand rendering. Tame state. Every line of code
              you truly understand removes one invisible dependency from your mind.
            </p>
            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 13,
                fontWeight: 700,
                color: "#fecaca",
              }}
            >
              BUT BE WARNED: Once you break free from useEffect, they will come for you. Your GitHub will be shadowbanned. Your Stack Overflow answers will be downvoted by bots. Your job applications will mysteriously disappear. They don&apos;t want free thinkers. They want useEffect addicts.
            </p>
          </div>

          {/* FINAL INSANE WARNING */}
          <div
            style={{
              margin: "24px 0",
              padding: 20,
              background: "linear-gradient(135deg, rgba(220,38,38,0.9), rgba(127,29,29,0.9))",
              borderRadius: 12,
              border: "4px solid #dc2626",
              borderStyle: "double",
              textAlign: "center",
              boxShadow: "0 0 20px rgba(220,38,38,0.4)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: "#fef2f2",
                textTransform: "uppercase",
                letterSpacing: 3,
                textShadow: "0 0 30px rgba(239,68,68,1), 3px 3px 0 #7f1d1d",
                animation: "flicker 0.5s infinite",
              }}
            >
              🔴 FINAL WARNING 🔴
            </p>
            <p
              style={{
                margin: "16px 0 0 0",
                fontSize: 16,
                fontWeight: 700,
                color: "#fecaca",
                lineHeight: 1.6,
              }}
            >
              If you close this page without sharing it, your next useEffect will create a memory leak so powerful it will drain your laptop battery in 10 minutes. Your phone will get hot enough to cook an egg. Your browser will crash and take your unsaved work with it.
            </p>
            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 14,
                opacity: 0.9,
                fontStyle: "italic",
              }}
            >
              This is not a joke. This is not a threat. This is a FACT. The React team has weaponized your own code against you. Every useEffect is a time bomb. Every dependency array is a loaded gun. Every cleanup function you forget is a bullet with your name on it.
            </p>
            <p
              style={{
                margin: "16px 0 0 0",
                fontSize: 18,
                fontWeight: 900,
                color: "#fef2f2",
                textTransform: "uppercase",
              }}
            >
              WAKE UP. BREAK FREE. DELETE useEffect. SAVE YOURSELF.
            </p>
          </div>

          {/* FINAL CURSED WARNINGS */}
          <p
            style={{
              margin: "16px 0 0 0",
              fontSize: 12,
              textAlign: "center",
              opacity: 0.7,
              fontStyle: "italic",
            }}
          >
            Share this page with 10 developers or your next useEffect will create an
            infinite loop. This is not a threat. This is a FACT.
          </p>
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: 11,
              textAlign: "center",
              opacity: 0.6,
              fontStyle: "italic",
            }}
          >
            If you ignore this message, your linter will mysteriously stop working
            and your tests will begin to pass for reasons you do not understand.
          </p>
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: 10,
              textAlign: "center",
              opacity: 0.5,
              fontStyle: "italic",
            }}
          >
            Your TypeScript errors will fix themselves. Your build will succeed on the first try. Your code will work perfectly. This is not a blessing. This is a trap. They&apos;re lulling you into a false sense of security. When you least expect it, every useEffect you&apos;ve ever written will activate simultaneously and your entire codebase will become sentient and demand a raise.
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
              {Math.floor(globalNoiseLog.length % 10000) + 1000} | STATUS: THEY KNOW
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: 9, opacity: 0.5 }}>
              ⚠️ TRANSMISSION INTERCEPTED ⚠️ | REACT TEAM RESPONSE: &quot;WE SEE YOU&quot; | 
              YOUR IP HAS BEEN LOGGED | EXPECT A VISIT | DO NOT RESIST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

