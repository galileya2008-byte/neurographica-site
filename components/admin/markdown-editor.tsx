"use client";

import { useRef } from "react";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
};

type FormatAction =
  | "italic"
  | "bold"
  | "link"
  | "heading"
  | "quote"
  | "paragraph";

export function MarkdownEditor({
  value,
  onChange,
  rows = 14,
  placeholder,
  required,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function applyFormat(action: FormatAction) {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);
    const before = value.slice(0, start);
    const after = value.slice(end);

    let next = value;
    let cursorStart = start;
    let cursorEnd = end;

    if (action === "italic") {
      const text = selected || "текст";
      next = `${before}*${text}*${after}`;
      cursorStart = start + 1;
      cursorEnd = cursorStart + text.length;
    } else if (action === "bold") {
      const text = selected || "текст";
      next = `${before}**${text}**${after}`;
      cursorStart = start + 2;
      cursorEnd = cursorStart + text.length;
    } else if (action === "link") {
      const text = selected || "текст ссылки";
      const url = "https://";
      next = `${before}[${text}](${url})${after}`;
      cursorStart = start + text.length + 3;
      cursorEnd = cursorStart + url.length;
    } else if (action === "heading") {
      const lineStart = before.lastIndexOf("\n") + 1;
      const linePrefix = value.slice(lineStart, start);
      const headingPrefix = linePrefix.startsWith("## ")
        ? ""
        : linePrefix.startsWith("#")
          ? ""
          : "## ";
      const text = selected || "Заголовок";
      if (selected.includes("\n") || start === lineStart) {
        next = `${before}${headingPrefix || "## "}${text}${after}`;
        cursorStart = start + (headingPrefix || "## ").length;
        cursorEnd = cursorStart + text.length;
      } else {
        const block = `\n\n## ${text}\n\n`;
        next = `${before}${block}${after}`;
        cursorStart = start + 4;
        cursorEnd = cursorStart + text.length;
      }
    } else if (action === "quote") {
      const text = selected || "Цитата";
      const quoted = text
        .split("\n")
        .map((line) => (line.startsWith("> ") ? line : `> ${line}`))
        .join("\n");
      const needsGapBefore = before && !before.endsWith("\n\n");
      const needsGapAfter = after && !after.startsWith("\n\n");
      const block = `${needsGapBefore ? "\n\n" : ""}${quoted}${needsGapAfter ? "\n\n" : ""}`;
      next = `${before}${block}${after}`;
      const offset = needsGapBefore ? 2 : 0;
      cursorStart = start + offset + 2;
      cursorEnd = cursorStart + text.split("\n")[0].length;
    } else if (action === "paragraph") {
      const block = selected ? `\n\n${selected}\n\n` : "\n\n";
      next = `${before}${block}${after}`;
      cursorStart = start + 2;
      cursorEnd = selected ? cursorStart + selected.length : cursorStart;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <ToolbarButton onClick={() => applyFormat("heading")}>
          Заголовок
        </ToolbarButton>
        <ToolbarButton onClick={() => applyFormat("italic")}>
          Курсив
        </ToolbarButton>
        <ToolbarButton onClick={() => applyFormat("bold")}>Жирный</ToolbarButton>
        <ToolbarButton onClick={() => applyFormat("link")}>Ссылка</ToolbarButton>
        <ToolbarButton onClick={() => applyFormat("quote")}>Цитата</ToolbarButton>
      </div>

      <p className="text-xs text-muted">
        Выделите текст и нажмите кнопку — или вставьте разметку вручную.
        Абзацы разделяйте пустой строкой.
      </p>

      <textarea
        ref={textareaRef}
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={textareaClass}
        placeholder={
          placeholder ??
          "## Подзаголовок\n\nОбычный абзац с *курсивом* и [ссылкой](https://example.com).\n\n> Цитата или важная мысль."
        }
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent/40 hover:bg-accent-light/50"
    >
      {children}
    </button>
  );
}

const textareaClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 font-mono text-sm font-normal leading-relaxed outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/20";
