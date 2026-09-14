import { cn } from "@/lib/utils";

type AutumnLeavesProps = {
  variant?: "hero" | "corners";
  className?: string;
};

/**
 * Тонкий осенний декор — стилизованные листья, золото и шоколад, 5–8% opacity.
 */
export function AutumnLeaves({
  variant = "corners",
  className,
}: AutumnLeavesProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        {variant === "hero" ? <HeroLeaves /> : <CornerLeaves />}
      </svg>
    </div>
  );
}

function HeroLeaves() {
  return (
    <>
      <g className="text-gold" opacity="0.07">
        <Leaf x={980} y={60} rotate={-18} scale={1.1} />
        <Leaf x={1040} y={140} rotate={24} scale={0.85} />
      </g>
      <g className="text-chocolate" opacity="0.06">
        <Leaf x={40} y={520} rotate={12} scale={0.95} />
        <Leaf x={120} y={620} rotate={-30} scale={0.75} />
      </g>
      <g className="text-gold" opacity="0.05">
        <Leaf x={860} y={640} rotate={-8} scale={0.7} />
      </g>
    </>
  );
}

function CornerLeaves() {
  return (
    <>
      <g className="text-gold" opacity="0.08">
        <Leaf x={1020} y={24} rotate={-22} scale={1} />
        <Leaf x={1100} y={96} rotate={16} scale={0.72} />
      </g>
      <g className="text-chocolate" opacity="0.06">
        <Leaf x={24} y={620} rotate={28} scale={0.88} />
        <Leaf x={96} y={700} rotate={-14} scale={0.65} />
      </g>
    </>
  );
}

function Leaf({
  x,
  y,
  rotate,
  scale,
}: {
  x: number;
  y: number;
  rotate: number;
  scale: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 C 8 -18, 28 -22, 36 -6 C 42 8, 34 24, 18 30 C 6 34, -8 26, -12 12 C -14 0, -6 -10, 0 0 Z"
        fill="currentColor"
      />
      <path
        d="M0 0 L 0 26"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.55"
      />
      <path
        d="M0 4 C 6 10, 12 14, 18 16 M0 8 C 5 12, 10 15, 14 16 M0 12 C 4 14, 8 16, 10 16"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.35"
      />
    </g>
  );
}
