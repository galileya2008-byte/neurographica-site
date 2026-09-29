import { rewardsConfig } from "@/lib/content/rewards";
import { cn } from "@/lib/utils";

type ActivityWheelProps = {
  bonuses: number;
};

export function ActivityWheel({ bonuses }: ActivityWheelProps) {
  const steps = rewardsConfig.rewardThreshold / rewardsConfig.dailyBonus;
  const filled = Math.min(steps, Math.floor(bonuses / rewardsConfig.dailyBonus));
  const progress = Math.min(1, bonuses / rewardsConfig.rewardThreshold);
  const dash = 2 * Math.PI * 42;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgb(154_123_85/0.18),transparent_62%)]" />
      <svg viewBox="0 0 120 120" className="relative h-full w-full">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          className="text-chocolate/15"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          className="text-warm"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          className="text-gold"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={dash}
          strokeDashoffset={dash * (1 - progress)}
          transform="rotate(-90 60 60)"
        />
        {Array.from({ length: steps }, (_, index) => {
          const angle = (index / steps) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 60 + Math.cos(rad) * 42;
          const y = 60 + Math.sin(rad) * 42;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3.2"
              className={cn(index < filled ? "fill-gold" : "fill-card stroke-chocolate/20")}
              strokeWidth="1"
            />
          );
        })}
        <path
          d="M18 72 C32 40, 48 88, 64 46 C76 18, 92 70, 104 52"
          fill="none"
          stroke="currentColor"
          className="text-accent/35"
          strokeWidth="1.2"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">бонусы</p>
        <p className="mt-1 font-display text-5xl leading-none text-accent">{bonuses}</p>
        <p className="mt-2 text-sm text-muted">из {rewardsConfig.rewardThreshold}</p>
      </div>
    </div>
  );
}
