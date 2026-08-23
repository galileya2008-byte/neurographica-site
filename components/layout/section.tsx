import { cn } from "@/lib/utils";
import { Container } from "./container";
import { CurvedLines } from "@/components/decor/curved-lines";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: "default" | "warm" | "accent";
  containerSize?: "default" | "narrow" | "wide";
  lines?: "left" | "right" | "none";
};

const toneClasses = {
  default: "bg-background",
  warm: "bg-warm",
  accent: "bg-accent-light/40",
};

export function Section({
  className,
  tone = "default",
  containerSize = "default",
  lines = "none",
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
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
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
