"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { yandexMetrika } from "@/config/analytics";
import { navigation, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primaryNavigation = [
  { label: "Нейрографика", href: "/masterclasses" },
  { label: "ИИ для экспертов", href: "/programs/ai-dlya-ekspertov" },
  { label: "Материалы", href: "/materials" },
  { label: "Бесплатно", href: "/podarki" },
  { label: "Обо мне", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const focusable = () => Array.from(mobileMenu.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const items = [menuButton.current, ...focusable()].filter((item): item is HTMLElement => Boolean(item));
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        isScrolled
          ? "border-border/70 bg-background/95 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-background/90 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 container-padding lg:h-[5.5rem]">
        <Link
          href="/"
          className="group min-w-0 max-w-[210px] shrink-0 self-center"
        >
          <span className="block font-display text-[1.1rem] font-medium leading-none tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[1.2rem]">
            {siteConfig.brand}
          </span>
          <span className="mt-1.5 block text-[10px] leading-none tracking-[0.16em] text-muted uppercase sm:text-[11px]">
            {siteConfig.expert}
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-5 xl:flex xl:gap-7"
          aria-label="Основная навигация"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              aria-current={pathname.replace(/\/$/, "") === item.href ? "page" : undefined}
              className="nav-link inline-flex h-11 items-center whitespace-nowrap text-sm leading-none text-foreground/75 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <div className="hidden xl:block">
            <Button
              href="/topics"
              size="sm"
              metrikaGoal={yandexMetrika.goals.ctaMasterclasses}
            >
              Выбрать занятие
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-chocolate/15 bg-card/80 text-foreground backdrop-blur-sm xl:hidden"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            ref={menuButton}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border/50 bg-background/95 backdrop-blur-xl xl:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 container-padding py-6"
            ref={mobileMenu}
            id="mobile-navigation"
            aria-label="Мобильная навигация"
          >
            {[...primaryNavigation, ...navigation.filter((item) => ["/topics", "/faq", "/contacts"].includes(item.href))].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="rounded-2xl px-4 py-3 text-lg text-foreground transition-colors hover:bg-warm/80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              href="/masterclasses"
              className="mt-4 w-full"
              metrikaGoal={yandexMetrika.goals.ctaMasterclasses}
            >
              Выбрать занятие
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
