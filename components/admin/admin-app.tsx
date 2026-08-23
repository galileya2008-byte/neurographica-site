"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { adminConfig } from "@/config/admin";
import { directions } from "@/config/site";
import {
  deleteMasterclass,
  deleteMaterial,
  getMasterclass,
  getMaterial,
  listCoverPaths,
  listMasterclassFiles,
  listMaterialFiles,
  saveMasterclass,
  saveMaterial,
  uploadCover,
} from "@/lib/admin/github";
import {
  emptyMasterclassForm,
  formToProduct,
  productToForm,
  type MasterclassFormState,
} from "@/lib/admin/masterclass-form";
import {
  emptyMaterialForm,
  formToMaterial,
  materialToForm,
  type MaterialFormState,
} from "@/lib/admin/material-form";
import {
  getGithubToken,
  isAdminAuthenticated,
  setAdminAuthenticated,
  setGithubToken,
} from "@/lib/admin/session";
import { slugify } from "@/lib/admin/slugify";
import { withBasePath } from "@/lib/paths";
import {
  materialTypeLabels,
  type MaterialType,
} from "@/types/material";
import {
  formatLabels,
  levelLabels,
  type DirectionId,
  type ProductFormat,
  type ProductLevel,
} from "@/types/product";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

type ContentSection = "masterclasses" | "materials";
type Mode = "list" | "create" | "edit";

type ListItem = {
  name: string;
  slug: string;
  title: string;
  sha: string;
  subtitle?: string;
};

export function AdminApp() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [section, setSection] = useState<ContentSection>("masterclasses");
  const [mode, setMode] = useState<Mode>("list");
  const [items, setItems] = useState<ListItem[]>([]);
  const [masterclassForm, setMasterclassForm] = useState<MasterclassFormState>(() =>
    emptyMasterclassForm(adminConfig.covers[0]),
  );
  const [materialForm, setMaterialForm] = useState<MaterialFormState>(() =>
    emptyMaterialForm(adminConfig.covers[0]),
  );
  const [editingSha, setEditingSha] = useState<string | undefined>();
  const [editingPublishedAt, setEditingPublishedAt] = useState<string | undefined>();
  const [slugLocked, setSlugLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [covers, setCovers] = useState<string[]>([...adminConfig.covers]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setToken(getGithubToken());
    setReady(true);
  }, []);

  const canSave = useMemo(() => token.trim().length > 0, [token]);

  async function refreshCovers(currentToken = token) {
    if (!currentToken.trim()) {
      setCovers([...adminConfig.covers]);
      return;
    }
    try {
      const paths = await listCoverPaths(currentToken.trim());
      setCovers(paths);
    } catch {
      setCovers([...adminConfig.covers]);
    }
  }

  async function refreshList(
    currentToken = token,
    currentSection: ContentSection = section,
  ) {
    if (!currentToken.trim()) {
      setItems([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (currentSection === "masterclasses") {
        const files = await listMasterclassFiles(currentToken.trim());
        const detailed = await Promise.all(
          files.map(async (file) => {
            const { product, sha } = await getMasterclass(
              currentToken.trim(),
              file.name,
            );
            return {
              name: file.name,
              slug: product.slug,
              title: product.title,
              sha,
            };
          }),
        );
        setItems(detailed.sort((a, b) => a.title.localeCompare(b.title, "ru")));
      } else {
        const files = await listMaterialFiles(currentToken.trim());
        const detailed = await Promise.all(
          files.map(async (file) => {
            const { material, sha } = await getMaterial(
              currentToken.trim(),
              file.name,
            );
            return {
              name: file.name,
              slug: material.slug,
              title: material.title,
              sha,
              subtitle: materialTypeLabels[material.type],
            };
          }),
        );
        setItems(detailed.sort((a, b) => a.title.localeCompare(b.title, "ru")));
      }
      await refreshCovers(currentToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить список");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    if (password === adminConfig.password) {
      setAdminAuthenticated(true);
      setAuthed(true);
      setError(null);
      setPassword("");
    } else {
      setError("Неверный пароль");
    }
  }

  function handleLogout() {
    setAdminAuthenticated(false);
    setAuthed(false);
  }

  function saveToken() {
    setGithubToken(token);
    setMessage("Токен GitHub сохранён в этом браузере");
    void refreshList(token);
  }

  function switchSection(next: ContentSection) {
    if (next === section && mode === "list") return;
    setSection(next);
    setMode("list");
    setEditingSha(undefined);
    setEditingPublishedAt(undefined);
    setSlugLocked(false);
    setMessage(null);
    setError(null);
    void refreshList(token, next);
  }

  async function handleCoverUpload(file: File | null) {
    if (!file) return;
    if (!canSave) {
      setError("Сначала сохраните GitHub token");
      return;
    }

    const preferredName =
      section === "masterclasses"
        ? masterclassForm.slug || masterclassForm.title || file.name
        : materialForm.slug || materialForm.title || file.name;

    setUploadingCover(true);
    setError(null);
    setMessage(null);
    try {
      const path = await uploadCover(token.trim(), file, preferredName);
      setCovers((prev) => Array.from(new Set([path, ...prev])));
      if (section === "masterclasses") {
        setMasterclassForm((prev) => ({ ...prev, cover: path }));
      } else {
        setMaterialForm((prev) => ({ ...prev, cover: path }));
      }
      setMessage("Обложка загружена. После сохранения сайт обновится за 1–2 минуты.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить обложку");
    } finally {
      setUploadingCover(false);
    }
  }

  function startCreate() {
    setMode("create");
    setEditingSha(undefined);
    setEditingPublishedAt(undefined);
    setSlugLocked(false);
    if (section === "masterclasses") {
      setMasterclassForm(emptyMasterclassForm(adminConfig.covers[0]));
    } else {
      setMaterialForm(emptyMaterialForm(adminConfig.covers[0]));
    }
    setMessage(null);
    setError(null);
  }

  async function startEdit(item: ListItem) {
    setLoading(true);
    setError(null);
    try {
      if (section === "masterclasses") {
        const { product, sha } = await getMasterclass(token.trim(), item.name);
        setMasterclassForm(productToForm(product));
        setCovers((prev) => Array.from(new Set([product.cover, ...prev])));
        setEditingSha(sha);
        setEditingPublishedAt(product.publishedAt);
      } else {
        const { material, sha } = await getMaterial(token.trim(), item.name);
        setMaterialForm(materialToForm(material));
        if (material.cover) {
          setCovers((prev) => Array.from(new Set([material.cover!, ...prev])));
        }
        setEditingSha(sha);
        setEditingPublishedAt(material.publishedAt);
      }
      setSlugLocked(true);
      setMode("edit");
      await refreshCovers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось открыть запись");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!canSave) {
      setError("Сначала сохраните GitHub token");
      return;
    }

    try {
      setLoading(true);
      if (section === "masterclasses") {
        const product = formToProduct(masterclassForm, {
          publishedAt: editingPublishedAt,
        });
        await saveMasterclass(token.trim(), product, editingSha);
        setMessage(
          mode === "create"
            ? "Мастер-класс добавлен. Сайт обновится через 1–2 минуты."
            : "Изменения сохранены. Сайт обновится через 1–2 минуты.",
        );
      } else {
        const material = formToMaterial(materialForm, {
          publishedAt: editingPublishedAt,
        });
        await saveMaterial(token.trim(), material, editingSha);
        setMessage(
          mode === "create"
            ? "Материал добавлен. Сайт обновится через 1–2 минуты."
            : "Изменения сохранены. Сайт обновится через 1–2 минуты.",
        );
      }
      setMode("list");
      await refreshList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сохранить");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item: ListItem) {
    const label = section === "masterclasses" ? "мастер-класс" : "материал";
    if (!confirm(`Удалить ${label} «${item.title}»?`)) return;
    setLoading(true);
    setError(null);
    try {
      if (section === "masterclasses") {
        await deleteMasterclass(token.trim(), item.slug, item.sha);
        setMessage("Мастер-класс удалён. Сайт обновится через 1–2 минуты.");
      } else {
        await deleteMaterial(token.trim(), item.slug, item.sha);
        setMessage("Материал удалён. Сайт обновится через 1–2 минуты.");
      }
      await refreshList();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось удалить");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed && token) {
      void refreshList(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  if (!ready) {
    return (
      <section className="section-padding pt-32">
        <Container size="narrow">
          <p className="text-muted">Загрузка…</p>
        </Container>
      </section>
    );
  }

  if (!authed) {
    return (
      <section className="section-padding pt-32">
        <Container size="narrow">
          <h1 className="text-4xl">Админка</h1>
          <p className="mt-3 text-muted">
            Единый вход для мастер-классов и полезных материалов.
          </p>
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6"
          >
            <label className="block text-sm font-medium">
              Пароль
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4"
                autoComplete="current-password"
              />
            </label>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <Button type="submit">Войти</Button>
          </form>
        </Container>
      </section>
    );
  }

  const sectionLabel =
    section === "masterclasses" ? "Мастер-классы" : "Полезные материалы";
  const createLabel =
    section === "masterclasses" ? "Добавить мастер-класс" : "Добавить материал";
  const emptyLabel =
    section === "masterclasses"
      ? "Пока нет мастер-классов."
      : "Пока нет полезных материалов.";
  const catalogHref =
    section === "masterclasses" ? "/masterclasses" : "/materials";

  return (
    <section className="section-padding pt-32">
      <Container size="wide">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl">Админка</h1>
            <p className="mt-2 text-muted">
              Мастер-классы и полезные материалы в одном месте. После сохранения
              GitHub сам обновит сайт.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={catalogHref} variant="secondary">
              Открыть на сайте
            </Button>
            <Button type="button" variant="ghost" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <SectionTab
            active={section === "masterclasses"}
            onClick={() => switchSection("masterclasses")}
          >
            Мастер-классы
          </SectionTab>
          <SectionTab
            active={section === "materials"}
            onClick={() => switchSection("materials")}
          >
            Полезные материалы
          </SectionTab>
        </div>

        <div className="mb-8 rounded-3xl border border-border bg-warm/60 p-5">
          <p className="text-sm font-medium">1. GitHub token</p>
          <p className="mt-2 text-sm text-muted">
            Создайте Personal Access Token (classic) с правом{" "}
            <strong>repo</strong> на{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              github.com/settings/tokens
            </a>
            , вставьте сюда и нажмите «Сохранить токен». Токен хранится только в
            вашем браузере.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_..."
              className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm"
            />
            <Button type="button" onClick={saveToken}>
              Сохранить токен
            </Button>
          </div>
        </div>

        {message ? (
          <p className="mb-4 rounded-2xl border border-accent/20 bg-accent-light px-4 py-3 text-sm text-accent">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {mode === "list" ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl">{sectionLabel}</h2>
              <Button
                type="button"
                onClick={startCreate}
                disabled={!canSave || loading}
              >
                {createLabel}
              </Button>
            </div>

            {!canSave ? (
              <p className="text-muted">Сначала сохраните GitHub token.</p>
            ) : loading ? (
              <p className="text-muted">Загрузка…</p>
            ) : items.length === 0 ? (
              <p className="text-muted">{emptyLabel}</p>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted">
                          /{item.slug}
                          {item.subtitle ? ` · ${item.subtitle}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => void startEdit(item)}
                        >
                          Редактировать
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => void handleDelete(item)}
                        >
                          Удалить
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : section === "masterclasses" ? (
          <MasterclassEditor
            mode={mode}
            form={masterclassForm}
            setForm={setMasterclassForm}
            slugLocked={slugLocked}
            setSlugLocked={setSlugLocked}
            covers={covers}
            uploadingCover={uploadingCover}
            canSave={canSave}
            loading={loading}
            onCoverUpload={handleCoverUpload}
            onSave={handleSave}
            onCancel={() => {
              setMode("list");
              setError(null);
            }}
          />
        ) : (
          <MaterialEditor
            mode={mode}
            form={materialForm}
            setForm={setMaterialForm}
            slugLocked={slugLocked}
            setSlugLocked={setSlugLocked}
            covers={covers}
            uploadingCover={uploadingCover}
            canSave={canSave}
            loading={loading}
            onCoverUpload={handleCoverUpload}
            onSave={handleSave}
            onCancel={() => {
              setMode("list");
              setError(null);
            }}
          />
        )}

        <p className="mt-10 text-sm text-muted">
          Админка:{" "}
          <Link href="/admin" className="text-accent hover:underline">
            /admin
          </Link>
          . Не добавляйте её в меню сайта.
        </p>
      </Container>
    </section>
  );
}

function SectionTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-accent text-accent-foreground"
          : "bg-warm text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function MasterclassEditor({
  mode,
  form,
  setForm,
  slugLocked,
  setSlugLocked,
  covers,
  uploadingCover,
  canSave,
  loading,
  onCoverUpload,
  onSave,
  onCancel,
}: {
  mode: Mode;
  form: MasterclassFormState;
  setForm: React.Dispatch<React.SetStateAction<MasterclassFormState>>;
  slugLocked: boolean;
  setSlugLocked: (value: boolean) => void;
  covers: string[];
  uploadingCover: boolean;
  canSave: boolean;
  loading: boolean;
  onCoverUpload: (file: File | null) => void;
  onSave: (event: React.FormEvent) => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={onSave}
      className="space-y-6 rounded-3xl border border-border bg-card p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl">
          {mode === "create" ? "Новый мастер-класс" : "Редактирование мастер-класса"}
        </h2>
        <Button type="button" variant="ghost" onClick={onCancel}>
          К списку
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Название">
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
        <Field label="Slug (латиница в URL)">
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugLocked(true);
              setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
            }}
            className={inputClass}
            disabled={mode === "edit"}
          />
        </Field>
      </div>

      <Field label="Короткое описание">
        <textarea
          required
          rows={2}
          value={form.shortDescription}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, shortDescription: e.target.value }))
          }
          className={textareaClass}
        />
      </Field>

      <Field label="Полное описание">
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          className={textareaClass}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Стоимость, ₽">
          <input
            required
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Длительность">
          <input
            value={form.duration}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, duration: e.target.value }))
            }
            className={inputClass}
          />
        </Field>
      </div>

      <CoverPicker
        cover={form.cover}
        covers={covers}
        uploadingCover={uploadingCover}
        canSave={canSave}
        onSelect={(cover) => setForm((prev) => ({ ...prev, cover }))}
        onUpload={onCoverUpload}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Уровень">
          <select
            value={form.level}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                level: e.target.value as ProductLevel,
              }))
            }
            className={inputClass}
          >
            {(Object.keys(levelLabels) as ProductLevel[]).map((level) => (
              <option key={level} value={level}>
                {levelLabels[level]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Формат">
          <select
            value={form.format}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                format: e.target.value as ProductFormat,
              }))
            }
            className={inputClass}
          >
            {(Object.keys(formatLabels) as ProductFormat[]).map((format) => (
              <option key={format} value={format}>
                {formatLabels[format]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Ссылка на GetCourse">
        <input
          required
          value={form.getcourseUrl}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, getcourseUrl: e.target.value }))
          }
          className={inputClass}
        />
      </Field>

      <fieldset>
        <legend className="mb-3 text-sm font-medium">Направления</legend>
        <div className="flex flex-wrap gap-2">
          {directions.map((direction) => {
            const active = form.directions.includes(direction.id as DirectionId);
            return (
              <button
                key={direction.id}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    directions: active
                      ? prev.directions.filter((id) => id !== direction.id)
                      : [...prev.directions, direction.id as DirectionId],
                  }))
                }
                className={`rounded-full px-3 py-1.5 text-xs ${
                  active ? "bg-accent text-accent-foreground" : "bg-warm text-muted"
                }`}
              >
                {direction.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPopular}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isPopular: e.target.checked }))
            }
          />
          Популярный
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))
            }
          />
          На главной в программах/акцентах
        </label>
      </div>

      <Field label="Для кого (каждый пункт с новой строки)">
        <textarea
          required
          rows={4}
          value={form.audienceText}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, audienceText: e.target.value }))
          }
          className={textareaClass}
        />
      </Field>

      <Field label="Что будет на занятии (каждый пункт с новой строки)">
        <textarea
          required
          rows={4}
          value={form.agendaText}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, agendaText: e.target.value }))
          }
          className={textareaClass}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="FAQ — вопрос (необязательно)">
          <input
            value={form.faqQuestion}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, faqQuestion: e.target.value }))
            }
            className={inputClass}
          />
        </Field>
        <Field label="FAQ — ответ">
          <input
            value={form.faqAnswer}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, faqAnswer: e.target.value }))
            }
            className={inputClass}
          />
        </Field>
      </div>

      <EditorActions loading={loading} canSave={canSave} onCancel={onCancel} />
    </form>
  );
}

function MaterialEditor({
  mode,
  form,
  setForm,
  slugLocked,
  setSlugLocked,
  covers,
  uploadingCover,
  canSave,
  loading,
  onCoverUpload,
  onSave,
  onCancel,
}: {
  mode: Mode;
  form: MaterialFormState;
  setForm: React.Dispatch<React.SetStateAction<MaterialFormState>>;
  slugLocked: boolean;
  setSlugLocked: (value: boolean) => void;
  covers: string[];
  uploadingCover: boolean;
  canSave: boolean;
  loading: boolean;
  onCoverUpload: (file: File | null) => void;
  onSave: (event: React.FormEvent) => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={onSave}
      className="space-y-6 rounded-3xl border border-border bg-card p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl">
          {mode === "create" ? "Новый материал" : "Редактирование материала"}
        </h2>
        <Button type="button" variant="ghost" onClick={onCancel}>
          К списку
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Название">
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
        <Field label="Slug (латиница в URL)">
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugLocked(true);
              setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
            }}
            className={inputClass}
            disabled={mode === "edit"}
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Тип материала">
          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                type: e.target.value as MaterialType,
              }))
            }
            className={inputClass}
          >
            {(Object.keys(materialTypeLabels) as MaterialType[]).map((type) => (
              <option key={type} value={type}>
                {materialTypeLabels[type]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Время чтения, минут">
          <input
            required
            inputMode="numeric"
            value={form.readingMinutes}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, readingMinutes: e.target.value }))
            }
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Краткое описание (анонс)">
        <textarea
          required
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          className={textareaClass}
        />
      </Field>

      <Field label="Текст материала (абзацы разделяйте пустой строкой)">
        <textarea
          required
          rows={12}
          value={form.contentText}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, contentText: e.target.value }))
          }
          className={textareaClass}
          placeholder={"Первый абзац.\n\nВторой абзац.\n\nТретий абзац."}
        />
      </Field>

      <CoverPicker
        cover={form.cover}
        covers={covers}
        uploadingCover={uploadingCover}
        canSave={canSave}
        optional
        onSelect={(cover) => setForm((prev) => ({ ...prev, cover }))}
        onClear={() => setForm((prev) => ({ ...prev, cover: "" }))}
        onUpload={onCoverUpload}
      />

      <EditorActions loading={loading} canSave={canSave} onCancel={onCancel} />
    </form>
  );
}

function CoverPicker({
  cover,
  covers,
  uploadingCover,
  canSave,
  optional = false,
  onSelect,
  onClear,
  onUpload,
}: {
  cover: string;
  covers: string[];
  uploadingCover: boolean;
  canSave: boolean;
  optional?: boolean;
  onSelect: (cover: string) => void;
  onClear?: () => void;
  onUpload: (file: File | null) => void;
}) {
  return (
    <div className="space-y-4 rounded-3xl border border-border/70 bg-warm/40 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium">
            Обложка{optional ? " (необязательно)" : ""}
          </p>
          <p className="mt-1 text-sm text-muted">
            JPG, PNG или WEBP до 5 МБ. Можно выбрать готовую или загрузить новую.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {optional && cover ? (
            <Button type="button" variant="ghost" size="sm" onClick={onClear}>
              Убрать обложку
            </Button>
          ) : null}
          <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground">
            {uploadingCover ? "Загрузка…" : "Загрузить обложку"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploadingCover || !canSave}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                e.target.value = "";
                onUpload(file);
              }}
            />
          </label>
        </div>
      </div>

      {cover ? (
        <div className="relative aspect-[4/3] max-w-sm overflow-hidden rounded-2xl border border-border bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverPreviewSrc(cover)}
            alt="Выбранная обложка"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {covers.map((item) => {
          const active = cover === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`overflow-hidden rounded-2xl border text-left transition ${
                active
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border hover:border-accent/40"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverPreviewSrc(item)}
                alt={item.split("/").pop() ?? "cover"}
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="block truncate px-2 py-1.5 text-[11px] text-muted">
                {item.split("/").pop()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EditorActions({
  loading,
  canSave,
  onCancel,
}: {
  loading: boolean;
  canSave: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Button type="submit" disabled={loading || !canSave}>
        {loading ? "Сохранение…" : "Сохранить"}
      </Button>
      <Button type="button" variant="secondary" onClick={onCancel}>
        Отмена
      </Button>
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

function coverPreviewSrc(path: string): string {
  const { owner, repo, branch } = adminConfig.github;
  if (path.startsWith("/images/")) {
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public${path}`;
  }
  return withBasePath(path);
}

const inputClass =
  "mt-0 h-11 w-full rounded-full border border-border bg-background px-4 text-sm font-normal outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20";

const textareaClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20";
