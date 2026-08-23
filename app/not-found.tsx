import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-padding pt-32">
      <Container size="narrow" className="text-center">
        <p className="font-display text-7xl text-accent/30">404</p>
        <h1 className="mt-4 text-4xl">Страница не найдена</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          Возможно, страница была перемещена или ещё не создана.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">На главную</Button>
          <Link href="/masterclasses" className="text-accent hover:underline">
            Перейти к мастер-классам
          </Link>
        </div>
      </Container>
    </section>
  );
}
