import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type PlaceholderPageProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function PlaceholderPage({
  title,
  description,
  primaryHref = "/",
  primaryLabel = "На главную",
}: PlaceholderPageProps) {
  return (
    <section className="section-padding pt-32">
      <Container size="narrow" className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Раздел в разработке
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
        <div className="mt-8">
          <Button href={primaryHref}>{primaryLabel}</Button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Страница будет наполнена на следующем этапе.{" "}
          <Link href="/" className="text-accent underline-offset-4 hover:underline">
            Вернуться на главную
          </Link>
        </p>
      </Container>
    </section>
  );
}
