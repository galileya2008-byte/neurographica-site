"use client";

import { useMemo, useState } from "react";
import { siteCopyGroups } from "@/lib/content/site-copy-schema";
import { Button } from "@/components/ui/button";

type SiteCopyEditorProps = {
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSave: () => void;
  loading: boolean;
  canSave: boolean;
};

export function SiteCopyEditor({
  values,
  onChange,
  onSave,
  loading,
  canSave,
}: SiteCopyEditorProps) {
  const [activeGroupId, setActiveGroupId] = useState(siteCopyGroups[0]?.id ?? "");
  const activeGroup = useMemo(
    () => siteCopyGroups.find((group) => group.id === activeGroupId) ?? siteCopyGroups[0],
    [activeGroupId],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
        <h2 className="text-2xl">Тексты сайта</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Точечные правки маркетинговых блоков. После сохранения GitHub пересоберёт
          сайт — изменения появятся через 1–2 минуты. Программы, мастер-классы,
          статьи и темы по-прежнему правятся в своих разделах админки.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {siteCopyGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActiveGroupId(group.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeGroup?.id === group.id
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-foreground hover:border-accent/40"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {activeGroup ? (
        <div className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div>
            <h3 className="text-xl">{activeGroup.label}</h3>
            <p className="mt-1 text-sm text-muted">{activeGroup.description}</p>
          </div>

          {activeGroup.fields.map((field) => (
            <label key={field.key} className="block space-y-2">
              <span className="text-sm font-medium">{field.label}</span>
              {field.hint ? (
                <span className="block text-xs text-muted">{field.hint}</span>
              ) : null}
              {field.multiline ? (
                <textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm"
                />
              )}
            </label>
          ))}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" disabled={loading || !canSave} onClick={onSave}>
              {loading ? "Сохранение…" : "Сохранить тексты"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
