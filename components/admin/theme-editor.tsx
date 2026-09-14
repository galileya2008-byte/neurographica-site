"use client";

import { themePresets } from "@/config/theme-presets";
import { siteThemePresetIds, type SiteThemePresetId } from "@/types/site-theme";
import { Button } from "@/components/ui/button";

type ThemeEditorProps = {
  presetId: SiteThemePresetId;
  onPresetChange: (id: SiteThemePresetId) => void;
  onSave: () => void;
  loading: boolean;
  canSave: boolean;
};

export function ThemeEditor({
  presetId,
  onPresetChange,
  onSave,
  loading,
  canSave,
}: ThemeEditorProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-border bg-card p-6 md:p-8">
      <div>
        <h2 className="text-2xl">Тема сайта</h2>
        <p className="mt-2 text-sm text-muted">
          Выберите цветовую палитру. После сохранения GitHub пересоберёт сайт — изменения
          появятся через 1–2 минуты на всех страницах.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteThemePresetIds.map((id) => {
          const preset = themePresets[id];
          const active = presetId === id;
          const { colors } = preset;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onPresetChange(id)}
              className={`rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-accent ring-2 ring-accent/25"
                  : "border-border hover:border-accent/40"
              }`}
            >
              <div
                className="mb-3 flex h-16 overflow-hidden rounded-xl border border-border/80"
                aria-hidden
              >
                <span className="flex-1" style={{ background: colors.background }} />
                <span className="w-1/3" style={{ background: colors.accent }} />
                <span className="w-1/4" style={{ background: colors.warm }} />
              </div>
              <p className="font-medium">{preset.label}</p>
              <p className="mt-1 text-xs text-muted">{preset.description}</p>
              {preset.seasonalDecor ? (
                <p className="mt-2 text-xs text-accent">Декор: листья на главной</p>
              ) : (
                <p className="mt-2 text-xs text-muted">Без сезонного декора</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="button" disabled={loading || !canSave} onClick={onSave}>
          {loading ? "Сохранение…" : "Сохранить тему"}
        </Button>
      </div>
    </div>
  );
}
