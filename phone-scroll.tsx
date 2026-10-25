"use client";

import { useEffect } from "react";

// Makes the phone mockup scroll by itself like someone using the app.
// Pauses for a few seconds whenever a visitor touches or scrolls it.
export default function PhoneScroll() {
  useEffect(() => {
    const v = document.getElementById("appscroll");
    const dot = document.getElementById("touch");
    if (!v || !dot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let userUntil = 0;
    let stopped = false;
    const bump = () => {
      userUntil = Date.now() + 6000;
    };
    const events = ["touchstart", "wheel", "pointerdown", "keydown"] as const;
    events.forEach((ev) => v.addEventListener(ev, bump, { passive: true }));

    const ease = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const scrollToY = (target: number, dur: number) =>
      new Promise<void>((resolve) => {
        const start = v.scrollTop;
        const change = target - start;
        const t0 = performance.now();
        const frame = (now: number) => {
          if (stopped || Date.now() < userUntil) return resolve();
          const p = Math.min((now - t0) / dur, 1);
          v.scrollTop = start + change * ease(p);
          if (p < 1) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
      });

    (async () => {
      while (!stopped) {
        await sleep(1500);
        if (stopped) break;
        if (Date.now() < userUntil) {
          await sleep(700);
          continue;
        }
        const max = v.scrollHeight - v.clientHeight;
        const pos = v.scrollTop;
        if (pos >= max - 4) {
          await sleep(1500);
          await scrollToY(0, 1800);
          continue;
        }
        const next = Math.min(pos + Math.round(v.clientHeight * 0.7), max);
        dot.classList.add("on");
        await scrollToY(next, 1100);
        dot.classList.remove("on");
      }
    })();

    return () => {
      stopped = true;
      events.forEach((ev) => v.removeEventListener(ev, bump));
    };
  }, []);

  return null;
}
