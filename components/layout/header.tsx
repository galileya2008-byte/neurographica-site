"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-b border-border/50 bg-background/75 shadow-soft backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid h-[4.75rem] max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 container-padding lg:h-20">
        <Link
          href="/"
          className="group min-w-0 justify-self-start self-center"
        >
          <span className="block font-display text-xl font-medium leading-none tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-[1.35rem]">
            {siteConfig.brand}
          </span>
          <span className="mt-1.5 block text-[10px] leading-none tracking-[0.18em] text-muted uppercase sm:text-[11px]">
            {siteConfig.expert}
          </span>
        </Link>

        <nav
          className="hidden items-center justify-center gap-6 xl:gap-7 lg:flex"
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex h-10 items-center whitespace-nowrap text-[13px] leading-none tracking-[0.02em] text-foreground/75 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <div className="hidden lg:block">
            <Button href="/masterclasses" size="sm">
              Выбрать мастер-класс
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-chocolate/15 bg-card/80 text-foreground backdrop-blur-sm lg:hidden"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 container-padding py-6"
            aria-label="Мобильная навигация"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-lg text-foreground transition-colors hover:bg-warm/80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/masterclasses" className="mt-4 w-full">
              Выбрать мастер-класс
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
