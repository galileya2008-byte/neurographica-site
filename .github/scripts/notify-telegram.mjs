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
  FORCE_TOPIC_SLUG,
} = process.env;

if (!TELEGRAM_CHANNEL_ID) {
  throw new Error("TELEGRAM_CHANNEL_ID is not configured");
}
if (!TELEGRAM_BOT_TOKEN && DRY_RUN !== "true") {
  throw new Error("TELEGRAM_BOT_TOKEN is not configured");
}

const TOPICS_PATH = "content/topics.json";
const DEFAULT_TOPIC_COVER = "/media/ai-expert/hero-poster.jpg";
const FALLBACK_TOPIC_COVER = "/images/galina/portrait-premium.png";

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
    case "guide":
      return { eyebrow: "Новый гид", button: "Читать на сайте" };
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

async function publishPost({ type, title, excerpt, pagePath, cover }) {
  const labels = publicationLabels(type);
  const pageUrl = absoluteUrl(pagePath);
  const caption = [
    `<b>${escapeHtml(labels.eyebrow)}</b>`,
    "",
    `<b>${escapeHtml(title)}</b>`,
    "",
    escapeHtml(truncate(excerpt, 560)),
  ].join("\n");
  const replyMarkup = {
    inline_keyboard: [[{ text: labels.button, url: pageUrl }]],
  };

  if (cover) {
    try {
      await telegramRequest("sendPhoto", {
        chat_id: TELEGRAM_CHANNEL_ID,
        photo: absoluteUrl(cover),
        caption,
        parse_mode: "HTML",
        reply_markup: replyMarkup,
      });
      return pageUrl;
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
  return pageUrl;
}

function readTopicsAt(ref) {
  try {
    const raw = execFileSync("git", ["show", `${ref}:${TOPICS_PATH}`], {
      encoding: "utf8",
    });
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function readCurrentTopics() {
  return JSON.parse(readFileSync(path.resolve(TOPICS_PATH), "utf8"));
}

/**
 * Новые топики = slug, которого не было в BEFORE_SHA.
 * На первый push репозитория не спамим всеми существующими темами.
 */
function getAddedTopicSlugs() {
  if (!AFTER_SHA) return [];
  const isInitialPush = !BEFORE_SHA || /^0+$/.test(BEFORE_SHA);
  if (isInitialPush) {
    console.log("Initial push detected — skipping auto topic fan-out");
    return [];
  }

  const beforeSlugs = new Set(readTopicsAt(BEFORE_SHA).map((topic) => topic.slug));
  return readCurrentTopics()
    .filter((topic) => topic.slug && !beforeSlugs.has(topic.slug))
    .map((topic) => topic.slug);
}

function getAddedMaterialFiles() {
  if (!AFTER_SHA) return [];

  const isInitialPush = !BEFORE_SHA || /^0+$/.test(BEFORE_SHA);
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

function topicCover(topic) {
  const featured = topic.featuredProgramSlugs ?? [];
  if (featured.includes("ai-dlya-ekspertov")) {
    return DEFAULT_TOPIC_COVER;
  }
  return FALLBACK_TOPIC_COVER;
}

function loadTopicPost(slug) {
  const topic = readCurrentTopics().find((item) => item.slug === slug);
  if (!topic) {
    throw new Error(`Topic not found: ${slug}`);
  }

  return {
    type: "guide",
    title: topic.seoTitle || topic.title,
    excerpt: topic.seoDescription || topic.description || topic.intro,
    pagePath: `/topics/${slug}/`,
    cover: topicCover(topic),
  };
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
  console.log(
    `Telegram bot @${me.result.username} can post to ${TELEGRAM_CHANNEL_ID}`,
  );
}

await validateBotAccess();

const publishedSlugs = new Set();
let published = 0;

async function publishTopicSlug(slug, reason) {
  if (publishedSlugs.has(slug)) return;
  const post = loadTopicPost(slug);
  const url = await publishPost(post);
  publishedSlugs.add(slug);
  published += 1;
  console.log(`Published topic (${reason}): ${post.title} → ${url}`);
}

if (FORCE_TOPIC_SLUG) {
  await publishTopicSlug(FORCE_TOPIC_SLUG.trim(), "forced");
}

for (const slug of getAddedTopicSlugs()) {
  await publishTopicSlug(slug, "new in topics.json");
}

const files = getAddedMaterialFiles();
for (const file of files) {
  const material = JSON.parse(readFileSync(path.resolve(file), "utf8"));
  await publishPost({
    type: material.type,
    title: material.title,
    excerpt: material.excerpt,
    pagePath: `/materials/${material.slug}/`,
    cover: material.cover,
  });
  console.log(`Published material: ${material.title}`);
  published += 1;
}

if (published === 0) {
  console.log("No new publications to send");
}
