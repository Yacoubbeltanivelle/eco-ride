"use client";
import { useRef, useCallback } from "react";

interface Props {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  step?: number;
  formatValue?: (v: number) => string;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
  accentColor?: string;
}

export default function DualRangeSlider({
  min, max, valueMin, valueMax, step = 1,
  formatValue = v => String(v),
  onChangeMin, onChangeMax,
  accentColor = "var(--eco-green)",
}: Props) {
  const rangeRef = useRef<HTMLDivElement>(null);

  const pct = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max]
  );

  const leftPct = pct(valueMin);
  const rightPct = pct(valueMax);

  return (
    <div className="w-full">
      {/* Value labels */}
      <div className="flex justify-between mb-3">
        <span className="text-sm font-semibold" style={{ color: accentColor }}>
          {formatValue(valueMin)}
        </span>
        <span className="text-sm font-semibold" style={{ color: accentColor }}>
          {formatValue(valueMax)}
        </span>
      </div>

      {/* Track */}
      <div ref={rangeRef} className="relative h-1.5 rounded-full" style={{ background: "#E5E7EB" }}>
        {/* Active track */}
        <div
          className="absolute h-full rounded-full"
          style={{
            left: `${leftPct}%`,
            width: `${rightPct - leftPct}%`,
            background: accentColor,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={e => {
            const v = Number(e.target.value);
            if (v < valueMax) onChangeMin(v);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: valueMin > max - (max - min) / 2 ? 5 : 3 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={e => {
            const v = Number(e.target.value);
            if (v > valueMin) onChangeMax(v);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />

        {/* Visual thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none"
          style={{ left: `calc(${leftPct}% - 10px)`, background: accentColor }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none"
          style={{ left: `calc(${rightPct}% - 10px)`, background: accentColor }}
        />
      </div>
    </div>
  );
}
