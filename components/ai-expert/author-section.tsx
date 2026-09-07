import { Section, SectionHeader } from "@/components/layout/section";
import { SiteImage } from "@/components/ui/site-image";
import { aiExpertCopy } from "@/lib/content/ai-expert-system";

export function AuthorSection() {
  const { author } = aiExpertCopy;

  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-chocolate/10 shadow-card lg:mx-0">
          <SiteImage
            src="/images/galina/portrait-premium.png"
            alt="Галина Оноприенко"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 80vw, 360px"
          />
        </div>

        <div>
          <SectionHeader
            eyebrow={author.eyebrow}
            title={author.title}
            className="mb-8 md:mb-10"
          />
          <div className="space-y-5">
            {author.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
