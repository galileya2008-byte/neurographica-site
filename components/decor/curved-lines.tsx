import { cn } from "@/lib/utils";

type CurvedLinesProps = {
  variant?: "hero" | "section-left" | "section-right" | "footer" | "cta";
  className?: string;
};

/**
 * Декоративные изогнутые линии в духе нейрографики — тонкие, шоколадные, ненавязчивые.
 */
export function CurvedLines({
  variant = "hero",
  className,
}: CurvedLinesProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-chocolate"
        fill="none"
      >
        {variant === "hero" && <HeroLines />}
        {variant === "section-left" && <SectionLeftLines />}
        {variant === "section-right" && <SectionRightLines />}
        {variant === "footer" && <FooterLines />}
        {variant === "cta" && <CtaLines />}
      </svg>
    </div>
  );
}

function HeroLines() {
  return (
    <>
      <path
        d="M-40 120 C 180 40, 320 200, 520 140 S 920 60, 1240 180"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
        className="line-draw line-draw-1"
      />
      <path
        d="M 80 680 C 260 560, 420 720, 600 640 S 980 520, 1180 600"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.16"
        className="line-draw line-draw-2"
      />
      <path
        d="M 900 -20 C 980 120, 860 280, 960 420 S 1100 620, 1050 780"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        className="line-draw line-draw-3"
      />
      <path
        d="M 200 380 C 340 320, 380 460, 520 420 S 740 360, 880 400"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.12"
        className="line-draw line-draw-4"
      />
    </>
  );
}

function SectionLeftLines() {
  return (
    <>
      <path
        d="M -60 100 C 120 40, 180 220, 320 180 S 520 80, 640 160"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.18"
      />
      <path
        d="M 40 520 C 160 440, 220 600, 360 540 S 560 460, 700 500"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.12"
      />
    </>
  );
}

function SectionRightLines() {
  return (
    <>
      <path
        d="M 560 80 C 720 20, 820 180, 960 120 S 1160 40, 1280 140"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.18"
      />
      <path
        d="M 480 480 C 640 400, 740 580, 880 520 S 1080 440, 1220 560"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.12"
      />
    </>
  );
}

function FooterLines() {
  return (
    <>
      <path
        d="M 0 40 C 200 10, 400 80, 600 50 S 1000 20, 1200 60"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.14"
      />
      <path
        d="M 100 120 C 300 90, 500 150, 700 110 S 1000 70, 1180 100"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.1"
      />
    </>
  );
}

function CtaLines() {
  return (
    <>
      <path
        d="M 80 60 C 240 20, 360 140, 520 100 S 760 40, 960 80"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M 160 200 C 320 160, 420 260, 580 220 S 820 180, 1000 210"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.14"
      />
    </>
  );
}
