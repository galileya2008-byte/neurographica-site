import Link from "next/link";
import { legalNavigation, navigation, siteConfig } from "@/config/site";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-warm">
      <Container className="section-padding !py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-foreground">{siteConfig.brand}</p>
            <p className="mt-2 text-muted">{siteConfig.expert}</p>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-accent">
              Навигация
            </p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-accent">
              Контакты
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {siteConfig.social.telegramHandle}
                </a>
              </li>
            </ul>
            <p className="mb-4 mt-8 text-sm font-medium uppercase tracking-[0.16em] text-accent">
              Документы
            </p>
            <ul className="space-y-3">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} {siteConfig.expert}. Все права защищены.
            </span>
            <Link
              href="/admin"
              aria-label="Вход в админку"
              className="text-[10px] tracking-wide text-muted/25 transition-colors hover:text-muted/60"
            >
              ·
            </Link>
          </p>
          <p>Обучение и оплата проходят на платформе GetCourse</p>
        </div>
      </Container>
    </footer>
  );
}
