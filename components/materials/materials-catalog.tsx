"use client";

import { useMemo, useState } from "react";
import {
  materialTypeIds,
  materialTypeLabels,
  type Material,
  type MaterialType,
} from "@/types/material";
import { MaterialCard } from "@/components/materials/material-card";
import { cn } from "@/lib/utils";

type MaterialsCatalogProps = {
  materials: Material[];
};

export function MaterialsCatalog({ materials }: MaterialsCatalogProps) {
  const [type, setType] = useState<MaterialType | "all">("all");

  const filtered = useMemo(() => {
    if (type === "all") return materials;
    return materials.filter((item) => item.type === type);
  }, [materials, type]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip
          label="Все материалы"
          active={type === "all"}
          onClick={() => setType("all")}
        />
        {materialTypeIds.map((id) => (
          <FilterChip
            key={id}
            label={materialTypeLabels[id]}
            active={type === id}
            onClick={() => setType(id)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-warm/50 px-6 py-16 text-center text-muted">
          В этой категории пока нет материалов.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
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
        "rounded-full px-4 py-2 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-warm text-muted hover:bg-accent-light hover:text-accent",
      )}
    >
      {label}
    </button>
  );
}
