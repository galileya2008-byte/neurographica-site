import type { Metadata } from "next";
import { Mail, Send } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты",
  description: `Связаться с ${siteConfig.expert}: email и Telegram.`,
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <section className="section-padding pt-32">
      <Container size="narrow">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Контакты
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">Связаться со мной</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Если у вас есть вопрос о мастер-классах, программах или формате обучения —
          напишите удобным способом. Отвечаю лично.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-card"
          >
            <Mail className="h-6 w-6 text-accent" />
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-muted">
              Email
            </p>
            <p className="mt-2 text-lg text-foreground group-hover:text-accent">
              {siteConfig.email}
            </p>
          </a>

          <a
            href={siteConfig.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-card"
          >
            <Send className="h-6 w-6 text-accent" />
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-muted">
              Telegram
            </p>
            <p className="mt-2 text-lg text-foreground group-hover:text-accent">
              {siteConfig.social.telegramHandle}
            </p>
          </a>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-muted">
          Оплата и доступ к материалам проходят на платформе GetCourse. По вопросам
          оплаты и доступа также можно написать на email или в Telegram.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`mailto:${siteConfig.email}`}>Написать на email</Button>
          <Button href={siteConfig.social.telegram} variant="secondary">
            Написать в Telegram
          </Button>
        </div>
      </Container>
    </section>
  );
}
