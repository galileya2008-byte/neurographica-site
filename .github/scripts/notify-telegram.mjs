import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const {
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHANNEL_ID,
  SITE_URL = "https://siteneirogalina.ru",
  BEFORE_SHA,
  AFTER_SHA,
  DRY_RUN,
} = process.env;

if (!TELEGRAM_CHANNEL_ID) {
  throw new Error("TELEGRAM_CHANNEL_ID is not configured");
}
if (!TELEGRAM_BOT_TOKEN && DRY_RUN !== "true") {
  throw new Error("TELEGRAM_BOT_TOKEN is not configured");
}
if (!AFTER_SHA) {
  throw new Error("AFTER_SHA is not configured");
}

function getAddedMaterialFiles() {
  const isInitialPush =
    !BEFORE_SHA || /^0+$/.test(BEFORE_SHA);
  const args = isInitialPush
    ? [
        "diff-tree",
        "--no-commit-id",
        "--name-only",
        "--diff-filter=A",
        "-r",
        AFTER_SHA,
        "--",
        "content/materials",
      ]
    : [
        "diff",
        "--name-only",
        "--diff-filter=A",
        BEFORE_SHA,
        AFTER_SHA,
        "--",
        "content/materials",
      ];

  const output = execFileSync("git", args, { encoding: "utf8" }).trim();
  return output
    ? output.split(/\r?\n/).filter((file) => file.endsWith(".json"))
    : [];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function absoluteUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function publicationLabels(type) {
  switch (type) {
    case "podcast":
      return { eyebrow: "Новый подкаст", button: "Слушать на сайте" };
    case "news":
      return { eyebrow: "Новость", button: "Читать на сайте" };
    case "article":
      return { eyebrow: "Новая статья", button: "Читать на сайте" };
    default:
      return { eyebrow: "Новая публикация", button: "Открыть на сайте" };
  }
}

async function telegramRequest(method, body) {
  if (DRY_RUN === "true") {
    console.log(`[dry-run] ${method}`, JSON.stringify(body, null, 2));
    return { ok: true };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const result = await response.json();
  if (!response.ok || !result.ok) {
    throw new Error(
      `Telegram ${method} failed: ${result.description ?? response.status}`,
    );
  }
  return result;
}

async function publishMaterial(material) {
  const labels = publicationLabels(material.type);
  const pageUrl = absoluteUrl(`/materials/${material.slug}/`);
  const caption = [
    `<b>${escapeHtml(labels.eyebrow)}</b>`,
    "",
    `<b>${escapeHtml(material.title)}</b>`,
    "",
    escapeHtml(truncate(material.excerpt, 560)),
  ].join("\n");
  const replyMarkup = {
    inline_keyboard: [
      [{ text: labels.button, url: pageUrl }],
    ],
  };

  if (material.cover) {
    try {
      await telegramRequest("sendPhoto", {
        chat_id: TELEGRAM_CHANNEL_ID,
        photo: absoluteUrl(material.cover),
        caption,
        parse_mode: "HTML",
        reply_markup: replyMarkup,
      });
      return;
    } catch (error) {
      console.warn(`Could not send cover, falling back to text: ${error.message}`);
    }
  }

  await telegramRequest("sendMessage", {
    chat_id: TELEGRAM_CHANNEL_ID,
    text: caption,
    parse_mode: "HTML",
    link_preview_options: {
      url: pageUrl,
      prefer_large_media: true,
    },
    reply_markup: replyMarkup,
  });
}

async function validateBotAccess() {
  if (DRY_RUN === "true") return;

  const me = await telegramRequest("getMe", {});
  const membership = await telegramRequest("getChatMember", {
    chat_id: TELEGRAM_CHANNEL_ID,
    user_id: me.result.id,
  });
  const member = membership.result;
  const canPublish =
    member.status === "creator" ||
    (member.status === "administrator" && member.can_post_messages !== false);

  if (!canPublish) {
    throw new Error(
      `Bot @${me.result.username} must be a channel administrator with permission to post messages`,
    );
  }
  console.log(`Telegram bot @${me.result.username} can post to ${TELEGRAM_CHANNEL_ID}`);
}

await validateBotAccess();

const files = getAddedMaterialFiles();
if (files.length === 0) {
  console.log("No new publications to send");
  process.exit(0);
}

for (const file of files) {
  const material = JSON.parse(readFileSync(path.resolve(file), "utf8"));
  await publishMaterial(material);
  console.log(`Published to Telegram: ${material.title}`);
}
