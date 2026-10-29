"use client";

import * as React from "react";
import Image from "next/image";

type Fit = "cover" | "contain";

type CompareProps = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** CSS aspect-ratio of the frame, e.g. "1 / 1" or "4 / 3" */
  ratio?: string;
  beforeFit?: Fit;
  afterFit?: Fit;
  /** Starting divider position, 0–100 */
  initial?: number;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Before/after image comparison with a draggable divider.
 * Pointer: drag or click anywhere on the frame.
 * Keyboard: focus the handle, then ←/→ (Shift for larger steps), Home/End.
 */
export function Compare({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  ratio = "1 / 1",
  beforeFit = "cover",
  afterFit = "cover",
  initial = 50,
}: CompareProps) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState(clamp(initial));
  const [dragging, setDragging] = React.useState(false);

  const setFromClientX = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromClientX(e.clientX);
  };

  const endDrag = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const next: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      Home: 0,
      End: 100,
    };
    if (e.key in next) {
      e.preventDefault();
      setPos(clamp(next[e.key]));
    }
  };

  const fitClass = (fit: Fit) =>
    fit === "contain" ? "object-contain" : "object-cover";
  const sizes = "(max-width: 688px) calc(100vw - 3rem), 640px";

  return (
    <figure className="not-prose my-8">
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ aspectRatio: ratio, ["--pos" as string]: `${pos}%` }}
        className={`relative w-full select-none touch-pan-y overflow-hidden rounded-lg bg-surface ring-1 ring-inset ring-line ${
          dragging ? "cursor-grabbing" : "cursor-ew-resize"
        }`}
      >
        {/* After (bottom layer) */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes={sizes}
          draggable={false}
          className={`pointer-events-none ${fitClass(afterFit)}`}
        />

        {/* Before (top layer, clipped to the left of the divider) */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            beforeFit === "contain" ? "bg-[#080808]" : ""
          }`}
          style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes={sizes}
            draggable={false}
            className={fitClass(beforeFit)}
          />
        </div>

        {/* Labels fade as the divider covers them */}
        <span
          aria-hidden="true"
          className="meta pointer-events-none absolute top-3 left-3 rounded-md bg-bg/85 px-2 py-0.5 text-ink ring-1 ring-line backdrop-blur transition-opacity duration-200"
          style={{ opacity: pos < 18 ? 0 : 1 }}
        >
          {beforeLabel}
        </span>
        <span
          aria-hidden="true"
          className="meta pointer-events-none absolute top-3 right-3 rounded-md bg-bg/85 px-2 py-0.5 text-ink ring-1 ring-line backdrop-blur transition-opacity duration-200"
          style={{ opacity: pos > 82 ? 0 : 1 }}
        >
          {afterLabel}
        </span>

        {/* Divider + handle */}
        <div
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: "var(--pos)" }}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()} images`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% ${beforeLabel.toLowerCase()}`}
            onKeyDown={onKeyDown}
            className={`absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1c1b19] shadow-md ring-1 ring-black/10 transition-transform duration-200 ease-out-soft motion-reduce:transition-none ${
              dragging ? "scale-110" : "hover:scale-105"
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7.5 6 3.5 10l4 4M12.5 6l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>
    </figure>
  );
}
