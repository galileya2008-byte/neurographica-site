import { cn } from "@/lib/utils";

export const memoryPairIds = [
  "line",
  "join",
  "circle",
  "leaf",
  "star",
  "gate",
] as const;

export type MemoryPairId = (typeof memoryPairIds)[number];

export const memoryPairLabels: Record<MemoryPairId, string> = {
  line: "Линия",
  join: "Сопряжение",
  circle: "Круг внимания",
  leaf: "Золотой лист",
  star: "Намерение",
  gate: "Новая дверь",
};

type MarkProps = {
  className?: string;
};

export function MemoryMark({
  id,
  className,
}: {
  id: MemoryPairId;
  className?: string;
}) {
  const shared = cn("h-10 w-10 text-accent", className);

  switch (id) {
    case "line":
      return (
        <svg viewBox="0 0 48 48" className={shared} aria-hidden>
          <path
            d="M6 34 C14 10, 22 42, 30 16 C36 2, 42 28, 44 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "join":
      return (
        <svg viewBox="0 0 48 48" className={shared} aria-hidden>
          <path
            d="M8 36 L22 14 L40 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="22" cy="14" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "circle":
      return (
        <svg viewBox="0 0 48 48" className={shared} aria-hidden>
          <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 48 48" className={shared} aria-hidden>
          <path
            d="M24 8 C34 14, 38 26, 24 40 C10 26, 14 14, 24 8 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path d="M24 12 L24 36" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 48 48" className={shared} aria-hidden>
          <path
            d="M24 6 L28 18 L40 18 L30 26 L34 38 L24 30 L14 38 L18 26 L8 18 L20 18 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "gate":
      return (
        <svg viewBox="0 0 48 48" className={shared} aria-hidden>
          <path
            d="M12 40 V18 C12 10, 36 10, 36 18 V40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="30" cy="28" r="1.6" fill="currentColor" />
        </svg>
      );
  }
}
