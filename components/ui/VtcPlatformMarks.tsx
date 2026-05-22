import { cn } from "@/lib/utils";

const platforms = [
  { name: "Uber", mark: "Uber", style: "font-semibold tracking-normal" },
  { name: "Bolt", mark: "Bolt", style: "font-black tracking-normal" },
  { name: "Heetch", mark: "Heetch", style: "font-extrabold tracking-normal" },
  { name: "Freenow", mark: "FREENOW", style: "font-black tracking-[0.08em]" },
  { name: "Allocab", mark: "allocab", style: "font-bold tracking-normal" },
];

interface Props {
  className?: string;
  compact?: boolean;
}

export default function VtcPlatformMarks({ className, compact = false }: Props) {
  return (
    <div
      aria-label="Plateformes VTC compatibles"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {platforms.map((platform) => (
        <span
          key={platform.name}
          className={cn(
            "inline-flex items-center rounded-xl border border-white/10 bg-white px-3 text-sm text-gray-950 shadow-sm",
            compact ? "h-8" : "h-10",
            platform.style,
          )}
        >
          {platform.mark}
        </span>
      ))}
    </div>
  );
}
