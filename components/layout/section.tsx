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
  default: "bg-transparent",
  warm: "bg-[radial-gradient(ellipse_at_top_left,_rgb(252_250_246/0.7),_transparent_55%),linear-gradient(180deg,_rgb(235_228_216/0.92),_rgb(235_228_216/0.7))]",
  accent:
    "bg-[radial-gradient(ellipse_at_bottom_right,_rgb(154_123_85/0.08),_transparent_50%),linear-gradient(180deg,_rgb(228_238_232/0.55),_rgb(228_238_232/0.28))]",
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
