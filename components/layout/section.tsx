import { CurvedLines } from "@/components/decor/curved-lines";
import { AutumnLeaves } from "@/components/decor/autumn-leaves";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: "default" | "warm" | "accent";
  containerSize?: "default" | "narrow" | "wide";
  lines?: "left" | "right" | "none";
  autumnDecor?: boolean;
};

const toneClasses = {
  default: "bg-transparent",
  warm: "tone-section-warm",
  accent: "tone-section-accent",
};

export function Section({
  className,
  tone = "default",
  containerSize = "default",
  lines = "none",
  autumnDecor = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("section-padding relative overflow-hidden", toneClasses[tone], className)}
      {...props}
    >
      {lines === "left" ? <CurvedLines variant="section-left" /> : null}
      {lines === "right" ? <CurvedLines variant="section-right" /> : null}
      {autumnDecor ? (
        <AutumnLeaves variant="corners" className="theme-seasonal-decor opacity-90" />
      ) : null}
      <Container size={containerSize} className="relative z-10">
        {children}
      </Container>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
