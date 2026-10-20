import fs from "fs";
import path from "path";

const dirs = ["content/masterclasses", "content/programs"];
const products = [];

for (const d of dirs) {
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".json"))) {
    products.push(JSON.parse(fs.readFileSync(path.join(d, f), "utf8")));
  }
}

function isPlaceholder(raw) {
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");
    if (host !== "getcourse.ru") return false;
    const p = url.pathname.replace(/\/+$/, "") || "/";
    return p === "/" || p === "";
  } catch {
    return true;
  }
}

const need = [];
const ok = [];

for (const p of products) {
  const row = {
    slug: p.slug,
    title: p.title,
    price: p.price,
    url: p.getcourseUrl,
  };
  if (isPlaceholder(p.getcourseUrl)) need.push(row);
  else ok.push(row);
}

console.log("Configured purchase URLs:", ok.length);
for (const x of ok) console.log(`  OK  ${x.slug} → ${x.url}`);
console.log("Need owner link (Telegram fallback):", need.length);
for (const x of need) console.log(`  NEED ${x.slug} (${x.price} ₽) → ${x.url}`);
