"use client";

import { useEffect, useState } from "react";

// Purely illustrative — cycles through example names to show the
// interaction pattern. It does not call the search API; the real,
// functional search lives in the DomainSearch section below.
const EXAMPLES = ["yourbrand.com", "mynewsite.co.uk", "coolshop.org"];
const TYPE_MS = 90;
const HOLD_MS = 1400;
const ERASE_MS = 40;

export function HeroGraphic() {
  const [text, setText] = useState(EXAMPLES[0]);
  const [showCheck, setShowCheck] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    let exampleIndex = 0;
    let charIndex = 0;
    let phase: "typing" | "holding" | "erasing" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const target = EXAMPLES[exampleIndex];

      if (phase === "typing") {
        charIndex++;
        setText(target.slice(0, charIndex));
        if (charIndex >= target.length) {
          setShowCheck(true);
          phase = "holding";
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
        timer = setTimeout(tick, TYPE_MS);
        return;
      }

      if (phase === "holding") {
        setShowCheck(false);
        phase = "erasing";
        timer = setTimeout(tick, ERASE_MS);
        return;
      }

      // erasing
      charIndex--;
      setText(target.slice(0, charIndex));
      if (charIndex <= 0) {
        exampleIndex = (exampleIndex + 1) % EXAMPLES.length;
        charIndex = 0;
        phase = "typing";
        timer = setTimeout(tick, TYPE_MS);
        return;
      }
      timer = setTimeout(tick, ERASE_MS);
    }

    timer = setTimeout(tick, TYPE_MS);
    return () => clearTimeout(timer);
  }, []);

  const displayText = reduced ? EXAMPLES[0] : text;
  const displayCheck = reduced ? true : showCheck;

  return (
    <svg
      viewBox="0 0 480 400"
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="Illustration of a domain lookup result inside a floating browser card"
    >
      <defs>
        <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="cardShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0f172a" floodOpacity="0.18" />
        </filter>
      </defs>

      <circle cx="350" cy="90" r="130" fill="url(#blob1)" filter="url(#soft)" />
      <circle cx="90" cy="300" r="110" fill="url(#blob2)" filter="url(#soft)" />

      {/* back card */}
      <g transform="rotate(-6 210 210)">
        <rect x="60" y="110" width="300" height="200" rx="20" fill="white" opacity="0.85" />
      </g>

      {/* front card */}
      <g filter="url(#cardShadow)">
        <rect x="90" y="70" width="320" height="230" rx="20" fill="white" />
      </g>

      {/* browser chrome dots */}
      <circle cx="114" cy="94" r="4.5" fill="#f87171" />
      <circle cx="130" cy="94" r="4.5" fill="#fbbf24" />
      <circle cx="146" cy="94" r="4.5" fill="#34d399" />

      {/* animated domain result row */}
      <rect x="112" y="116" width="180" height="10" rx="5" fill="#cbd5e1" />
      <text x="112" y="146" fontFamily="ui-monospace, monospace" fontSize="15" fill="#0f172a">
        {displayText}
        <tspan opacity={displayCheck || reduced ? 0 : 1}>▏</tspan>
      </text>
      {displayCheck && (
        <>
          <circle cx="368" cy="141" r="12" fill="#16a34a" fillOpacity="0.12" />
          <path
            d="M362 141l4 4 8-8"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </>
      )}

      {/* abstract bar chart */}
      <rect x="112" y="230" width="20" height="46" rx="4" fill="url(#bar)" opacity="0.55" />
      <rect x="142" y="210" width="20" height="66" rx="4" fill="url(#bar)" opacity="0.75" />
      <rect x="172" y="190" width="20" height="86" rx="4" fill="url(#bar)" />
      <rect x="202" y="222" width="20" height="54" rx="4" fill="url(#bar)" opacity="0.65" />

      {/* small globe glyph, bottom right of card */}
      <g transform="translate(320 216)" stroke="#2563eb" strokeWidth="1.6" fill="none" opacity="0.8">
        <circle cx="20" cy="20" r="18" />
        <ellipse cx="20" cy="20" rx="8" ry="18" />
        <path d="M2 20h36" />
      </g>
    </svg>
  );
}
