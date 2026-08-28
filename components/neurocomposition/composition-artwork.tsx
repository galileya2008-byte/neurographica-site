import { cn } from "@/lib/utils";

type CompositionArtworkProps = {
  className?: string;
  title?: string;
};

export function CompositionArtwork({
  className,
  title = "Композиционная схема курса: круг, квадрат, треугольник и сетка золотого сечения",
}: CompositionArtworkProps) {
  return (
    <svg
      viewBox="0 0 800 1000"
      role="img"
      aria-label={title}
      className={cn("h-full w-full", className)}
    >
      <title>{title}</title>
      <rect width="800" height="1000" fill="#fcfaf6" />
      <rect width="800" height="1000" fill="#ebe4d8" opacity="0.35" />

      <g stroke="#9a7b55" strokeWidth="0.75" opacity="0.28" fill="none">
        <line x1="306" y1="48" x2="306" y2="952" />
        <line x1="494" y1="48" x2="494" y2="952" />
        <line x1="48" y1="382" x2="752" y2="382" />
        <line x1="48" y1="618" x2="752" y2="618" />
      </g>

      <g stroke="#5c4033" strokeWidth="0.4" opacity="0.12" fill="none">
        {Array.from({ length: 7 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={80 + i * 106}
            y1="64"
            x2={80 + i * 106}
            y2="936"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1="64"
            y1={80 + i * 94}
            x2="736"
            y2={80 + i * 94}
          />
        ))}
      </g>

      <circle cx="494" cy="382" r="168" fill="#e4eee8" opacity="0.85" />
      <circle
        cx="494"
        cy="382"
        r="168"
        fill="none"
        stroke="#1f3a32"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <circle
        cx="494"
        cy="382"
        r="86"
        fill="none"
        stroke="#9a7b55"
        strokeWidth="1"
        opacity="0.55"
      />

      <rect
        x="148"
        y="618"
        width="196"
        height="196"
        fill="#fcfaf6"
        stroke="#5c4033"
        strokeWidth="1.5"
        opacity="0.92"
      />
      <rect
        x="168"
        y="638"
        width="156"
        height="156"
        fill="none"
        stroke="#9a7b55"
        strokeWidth="0.75"
        opacity="0.45"
      />

      <polygon
        points="306,214 470,618 142,618"
        fill="#1f3a32"
        opacity="0.08"
      />
      <polygon
        points="306,214 470,618 142,618"
        fill="none"
        stroke="#1f3a32"
        strokeWidth="1.75"
        opacity="0.8"
      />

      <path
        d="M142 720 C 240 540, 360 430, 494 382 S 640 420, 690 560"
        fill="none"
        stroke="#9a7b55"
        strokeWidth="1.25"
        opacity="0.7"
      />
      <path
        d="M220 840 C 360 780, 520 820, 660 740"
        fill="none"
        stroke="#5c4033"
        strokeWidth="0.8"
        opacity="0.28"
      />

      <circle cx="306" cy="382" r="6" fill="#9a7b55" />
      <circle cx="494" cy="618" r="5" fill="#1f3a32" opacity="0.7" />
    </svg>
  );
}
