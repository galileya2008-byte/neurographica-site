"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { directions } from "@/config/site";
import { filterProducts } from "@/lib/domain/products";
import { ProductGrid } from "@/components/catalog/product-grid";
import { cn } from "@/lib/utils";
import {
  formatLabels,
  levelLabels,
  type CatalogFilters,
  type DirectionId,
  type Product,
  type ProductFormat,
  type ProductLevel,
} from "@/types/product";

type CatalogClientProps = {
  products: Product[];
  typeLabel: string;
};

const levelOptions: Array<ProductLevel | "all"> = [
  "all",
  "beginner",
  "intermediate",
  "advanced",
];

const formatOptions: Array<ProductFormat | "all"> = [
  "all",
  "online",
  "recorded",
  "live",
];

const sortOptions: Array<NonNullable<CatalogFilters["sort"]>> = [
  "popular",
  "newest",
  "price-asc",
  "price-desc",
];

const sortLabels: Record<NonNullable<CatalogFilters["sort"]>, string> = {
  popular: "По популярности",
  newest: "Сначала новые",
  "price-asc": "Сначала дешевле",
  "price-desc": "Сначала дороже",
};

export function CatalogClient({ products, typeLabel }: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const filters = useMemo<CatalogFilters>(
    () => ({
      q: searchParams.get("q") ?? "",
      direction: (searchParams.get("direction") as DirectionId | "all") || "all",
      level: (searchParams.get("level") as ProductLevel | "all") || "all",
      format: (searchParams.get("format") as ProductFormat | "all") || "all",
      sort: (searchParams.get("sort") as CatalogFilters["sort"]) || "popular",
    }),
    [searchParams],
  );

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  function updateParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());

    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    });

    const qs = next.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  function resetFilters() {
    setQuery("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  const hasActiveFilters =
    Boolean(filters.q) ||
    filters.direction !== "all" ||
    filters.level !== "all" ||
    filters.format !== "all" ||
    filters.sort !== "popular";

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
      <aside className="space-y-6 rounded-3xl border border-border/70 bg-card p-5 shadow-soft h-fit lg:sticky lg:top-28">
        <div>
          <label htmlFor="catalog-search" className="mb-2 block text-sm font-medium">
            Поиск
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                updateParams({ q: value || null });
              }}
              placeholder={`Найти ${typeLabel.toLowerCase()}...`}
              className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium">Направление</p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={filters.direction === "all"}
              onClick={() => updateParams({ direction: null })}
              label="Все"
            />
            {directions.map((direction) => (
              <FilterChip
                key={direction.id}
                active={filters.direction === direction.id}
                onClick={() => updateParams({ direction: direction.id })}
                label={direction.label}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="catalog-level" className="mb-2 block text-sm font-medium">
            Уровень
          </label>
          <select
            id="catalog-level"
            value={filters.level}
            onChange={(event) => updateParams({ level: event.target.value })}
            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
          >
            {levelOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Все уровни" : levelLabels[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="catalog-format" className="mb-2 block text-sm font-medium">
            Формат
          </label>
          <select
            id="catalog-format"
            value={filters.format}
            onChange={(event) => updateParams({ format: event.target.value })}
            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
          >
            {formatOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Все форматы" : formatLabels[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="catalog-sort" className="mb-2 block text-sm font-medium">
            Сортировка
          </label>
          <select
            id="catalog-sort"
            value={filters.sort}
            onChange={(event) => updateParams({ sort: event.target.value })}
            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {sortLabels[option]}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <X className="h-4 w-4" />
            Сбросить фильтры
          </button>
        ) : null}
      </aside>

      <div>
        <p className="mb-5 text-sm text-muted">
          Найдено: {filtered.length} из {products.length}
        </p>
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-warm text-muted hover:bg-accent-light hover:text-accent",
      )}
    >
      {label}
    </button>
  );
}
