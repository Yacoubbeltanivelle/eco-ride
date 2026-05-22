interface ScoreKey {
  key: "economie" | "confort" | "vtc" | "ecologie" | "disponibilite";
  label: string;
  icon: string;
}

const keys: ScoreKey[] = [
  { key: "economie",     label: "Économie",     icon: "€" },
  { key: "confort",      label: "Confort",       icon: "◎" },
  { key: "vtc",         label: "VTC",           icon: "✓" },
  { key: "ecologie",    label: "Écologie",      icon: "⌀" },
  { key: "disponibilite", label: "Dispo",       icon: "◷" },
];

interface Props {
  score: Record<string, number>;
  compact?: boolean;
}

export default function VehicleScore({ score, compact = false }: Props) {
  const avg = Math.round((Object.values(score).reduce((a, b) => a + b, 0) / Object.values(score).length) * 10) / 10;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold" style={{ color: "var(--eco-green)" }}>{avg}/5</span>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(n => (
            <div
              key={n}
              className="w-4 h-1 rounded-full"
              style={{ background: n <= Math.round(avg) ? "var(--eco-green)" : "var(--eco-mint-soft)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900">Score ECO RIDE</h3>
        <div
          className="px-3 py-1 rounded-full text-sm font-bold"
          style={{ background: "var(--eco-mint-soft)", color: "var(--eco-green)" }}
        >
          {avg} / 5
        </div>
      </div>

      <div className="space-y-3.5">
        {keys.map(({ key, label }) => {
          const val = score[key] ?? 0;
          const pct = (val / 5) * 100;
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-600 font-medium">{label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div
                      key={n}
                      className="w-2 h-2 rounded-full transition-colors"
                      style={{ background: n <= val ? "var(--eco-green)" : "var(--eco-mint-soft)" }}
                    />
                  ))}
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--eco-mint-soft)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    background: val >= 4
                      ? "var(--eco-green-neon)"
                      : val >= 3
                      ? "var(--eco-green)"
                      : "rgba(15,107,58,0.4)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
