"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { directions } from "@/config/site";
import {
  getTopicsConfig,
  saveTopicsConfig,
} from "@/lib/admin/github";
import { slugify } from "@/lib/admin/slugify";
import {
  emptyTopicForm,
  formToTopic,
  topicToForm,
  type TopicFormState,
} from "@/lib/admin/topic-form";
import { compareCardOrder } from "@/lib/card-settings";
import {
  cardColorIds,
  cardColorLabels,
  type CardColorId,
} from "@/types/card-settings";
import type { DirectionId } from "@/types/product";
import type { Topic } from "@/types/topic";

type Mode = "list" | "create" | "edit";

export function TopicManager({
  token,
  canSave,
}: {
  token: string;
  canSave: boolean;
}) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sha, setSha] = useState("");
  const [mode, setMode] = useState<Mode>("list");
  const [form, setForm] = useState<TopicFormState>(emptyTopicForm);
  const [editingId, setEditingId] = useState<string>();
  const [slugLocked, setSlugLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (canSave) void loadTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSave, token]);

  async function loadTopics() {
    setLoading(true);
    setError(undefined);
    try {
      const result = await getTopicsConfig(token.trim());
      setTopics(result.topics.slice().sort(compareCardOrder));
      setSha(result.sha);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить темы");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setForm(emptyTopicForm());
    setEditingId(undefined);
    setSlugLocked(false);
    setMessage(undefined);
    setError(undefined);
    setMode("create");
  }

  function startEdit(topic: Topic) {
    setForm(topicToForm(topic));
    setEditingId(topic.id);
    setSlugLocked(true);
    setMessage(undefined);
    setError(undefined);
    setMode("edit");
  }

  async function persist(nextTopics: Topic[], successMessage: string) {
    setLoading(true);
    setError(undefined);
    setMessage(undefined);
    try {
      await saveTopicsConfig(token.trim(), nextTopics, sha);
      const refreshed = await getTopicsConfig(token.trim());
      setTopics(refreshed.topics.slice().sort(compareCardOrder));
      setSha(refreshed.sha);
      setMessage(successMessage);
      setMode("list");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сохранить темы");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    try {
      const topic = formToTopic(form, editingId);
      if (
        mode === "create" &&
        topics.some((item) => item.slug === topic.slug)
      ) {
        throw new Error("Тема с таким slug уже существует");
      }
      const nextTopics =
        mode === "edit"
          ? topics.map((item) => (item.id === editingId ? topic : item))
          : [...topics, topic];
      await persist(
        nextTopics,
        mode === "create"
          ? "Тема добавлена. Сайт обновится через 1–2 минуты."
          : "Тема сохранена. Сайт обновится через 1–2 минуты.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Проверьте поля");
    }
  }

  async function handleDelete(topic: Topic) {
    if (!confirm(`Удалить тему «${topic.title}»?`)) return;
    await persist(
      topics.filter((item) => item.id !== topic.id),
      "Тема удалена. Сайт обновится через 1–2 минуты.",
    );
  }

  if (!canSave) {
    return <p className="text-muted">Сначала сохраните GitHub token.</p>;
  }

  return (
    <div className="space-y-6">
      {message ? (
        <p className="rounded-2xl border border-accent/20 bg-accent-light px-4 py-3 text-sm text-accent">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {mode === "list" ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl">Выбери свою тему</h2>
              <p className="mt-2 text-sm text-muted">
                Порядок: меньшее число показывает карточку выше.
              </p>
            </div>
            <Button type="button" onClick={startCreate} disabled={loading}>
              Добавить тему
            </Button>
          </div>

          {loading ? (
            <p className="text-muted">Загрузка…</p>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <ul className="divide-y divide-border">
                {topics.map((topic) => (
                  <li
                    key={topic.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {topic.badge ? `${topic.badge} · ` : ""}
                        {topic.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Порядок {topic.sortOrder ?? 1000} · /topics/{topic.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => startEdit(topic)}
                      >
                        Редактировать
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => void handleDelete(topic)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <form
          onSubmit={handleSave}
          className="space-y-6 rounded-3xl border border-border bg-card p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl">
              {mode === "create" ? "Новая тема" : "Редактирование темы"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setMode("list")}
            >
              К списку
            </Button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Название карточки">
              <input
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    title,
                    slug: slugLocked ? prev.slug : slugify(title),
                  }));
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Slug (латиницей)">
              <input
                required
                disabled={mode === "edit"}
                value={form.slug}
                onChange={(e) => {
                  setSlugLocked(true);
                  setForm((prev) => ({
                    ...prev,
                    slug: slugify(e.target.value),
                  }));
                }}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Заголовок страницы и SEO">
            <input
              required
              value={form.seoTitle}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, seoTitle: e.target.value }))
              }
              className={inputClass}
            />
          </Field>

          <Field label="SEO-описание">
            <textarea
              required
              rows={3}
              value={form.seoDescription}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  seoDescription: e.target.value,
                }))
              }
              className={textareaClass}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Короткое описание карточки">
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={textareaClass}
              />
            </Field>
            <Field label="Вступление на странице">
              <textarea
                required
                rows={4}
                value={form.intro}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, intro: e.target.value }))
                }
                className={textareaClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Направление">
              <select
                value={form.directionId}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    directionId: e.target.value as DirectionId,
                  }))
                }
                className={inputClass}
              >
                {directions.map((direction) => (
                  <option key={direction.id} value={direction.id}>
                    {direction.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ключевые фразы (каждая с новой строки)">
              <textarea
                required
                rows={4}
                value={form.keywordsText}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    keywordsText: e.target.value,
                  }))
                }
                className={textareaClass}
              />
            </Field>
          </div>

          <Field label="Slug программ по теме (необязательно, каждый с новой строки)">
            <textarea
              rows={3}
              value={form.featuredProgramSlugsText}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  featuredProgramSlugsText: e.target.value,
                }))
              }
              className={textareaClass}
            />
          </Field>

          <div className="grid gap-5 rounded-3xl border border-border/70 bg-warm/35 p-5 md:grid-cols-3">
            <Field label="Порядок (меньше — выше)">
              <input
                required
                type="number"
                min="0"
                step="1"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sortOrder: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Цвет подложки">
              <select
                value={form.cardColor}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    cardColor: e.target.value as CardColorId,
                  }))
                }
                className={inputClass}
              >
                {cardColorIds.map((color) => (
                  <option key={color} value={color}>
                    {cardColorLabels[color]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Стикер (необязательно)">
              <input
                maxLength={30}
                value={form.badge}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, badge: e.target.value }))
                }
                placeholder="Хит / Новинка"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Сохранение…" : "Сохранить тему"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setMode("list")}
            >
              Отмена
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-full border border-border bg-background px-4 text-sm font-normal outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20";

const textareaClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20";
