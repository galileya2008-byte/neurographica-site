import type { LessonMark } from "@/lib/content/neurocomposition";

type LessonMarkIconProps = {
  mark: LessonMark;
};

export function LessonMarkIcon({ mark }: LessonMarkIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      className="h-11 w-11 text-accent"
      fill="none"
    >
      {mark === "alphabet" ? (
        <>
          <circle cx="16" cy="18" r="8" stroke="currentColor" strokeWidth="1.4" />
          <rect x="26" y="26" width="14" height="14" stroke="currentColor" strokeWidth="1.4" />
          <path d="M24 8 L34 28 H14 Z" stroke="currentColor" strokeWidth="1.4" />
        </>
      ) : null}
      {mark === "triangle" ? (
        <path
          d="M24 7 L42 39 H6 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ) : null}
      {mark === "squares" ? (
        <>
          <rect x="8" y="8" width="13" height="13" stroke="currentColor" strokeWidth="1.3" />
          <rect x="27" y="8" width="13" height="13" stroke="currentColor" strokeWidth="1.3" />
          <rect x="8" y="27" width="13" height="13" stroke="currentColor" strokeWidth="1.3" />
          <rect x="27" y="27" width="13" height="13" stroke="currentColor" strokeWidth="1.3" />
        </>
      ) : null}
      {mark === "golden" ? (
        <>
          <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="1.2" />
          <line x1="27.4" y1="8" x2="27.4" y2="40" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="27.4" x2="40" y2="27.4" stroke="currentColor" strokeWidth="1" />
          <circle cx="27.4" cy="20.3" r="2" fill="currentColor" />
        </>
      ) : null}
      {mark === "rhythm" ? (
        <>
          <rect x="8" y="28" width="5" height="12" stroke="currentColor" strokeWidth="1.2" />
          <rect x="16" y="20" width="5" height="20" stroke="currentColor" strokeWidth="1.2" />
          <rect x="24" y="14" width="5" height="26" stroke="currentColor" strokeWidth="1.2" />
          <rect x="32" y="8" width="5" height="32" stroke="currentColor" strokeWidth="1.2" />
        </>
      ) : null}
      {mark === "contrast" ? (
        <>
          <circle cx="18" cy="24" r="10" fill="currentColor" opacity="0.9" />
          <circle cx="30" cy="24" r="10" stroke="currentColor" strokeWidth="1.4" />
        </>
      ) : null}
      {mark === "depth" ? (
        <>
          <rect x="10" y="16" width="20" height="20" stroke="currentColor" strokeWidth="1.3" />
          <rect x="18" y="10" width="20" height="20" stroke="currentColor" strokeWidth="1.3" />
        </>
      ) : null}
      {mark === "curve" ? (
        <path
          d="M8 34 C 16 34, 18 12, 28 12 S 36 34, 42 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}
