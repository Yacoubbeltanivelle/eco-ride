import { cn } from "@/lib/utils";

const platforms = [
  { name: "Uber",    logo: "/logos/vtc/uber.svg"    },
  { name: "Bolt",    logo: "/logos/vtc/bolt.svg"    },
  { name: "Heetch",  logo: "/logos/vtc/heetch.svg"  },
  { name: "FREENOW", logo: "/logos/vtc/freenow.svg" },
  { name: "allocab", logo: "/logos/vtc/allocab.svg" },
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
            "inline-flex items-center justify-center rounded-xl border border-white/10 bg-white px-3 shadow-sm",
            compact ? "h-8" : "h-10",
          )}
        >
          {/* SVG logos — plain <img> (no next/image optimization needed for SVG) */}
          <img
            src={platform.logo}
            alt={platform.name}
            className={cn("w-auto object-contain", compact ? "h-[18px]" : "h-[22px]")}
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}
