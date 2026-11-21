import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const topics = JSON.parse(fs.readFileSync("content/topics.json", "utf8"));
const html = (route) => fs.readFileSync(path.join("out", route, "index.html"), "utf8");
const visibleHtml = (source) => source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const mainHtml = (route) => visibleHtml(html(route)).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
const productLinks = (source) => [...new Set([...source.matchAll(/href="(\/(?:masterclasses|programs)\/[^"?/#]+)\/?"/g)].map((match) => match[1].replace(/\/$/, "")))].sort();

const customGuides = new Set([
  "ii-dlya-ekspertov", "kak-ekspertu-prodvigatsya-samostoyatelno", "fotosessiya-dlya-biznesa-eksperta",
]);

for (const topic of topics) {
  for (const [type, slugs] of [["masterclasses", topic.masterclassSlugs], ["programs", topic.programSlugs]]) {
    for (const slug of slugs ?? []) {
      const product = JSON.parse(fs.readFileSync(`content/${type}/${slug}.json`, "utf8"));
      assert.notEqual(new URL(product.getcourseUrl).hostname, "getcourse.ru", `Unconfigured purchase in ${topic.slug}: ${slug}`);
    }
  }
  if (customGuides.has(topic.slug)) continue;
  const main = mainHtml(`topics/${topic.slug}`);
  assert.ok(main, `Missing page content: ${topic.slug}`);
  const expected = [
    ...topic.masterclassSlugs.map((slug) => `/masterclasses/${slug}`),
    ...topic.programSlugs.map((slug) => `/programs/${slug}`),
  ].sort();
  assert.deepEqual(productLinks(main), expected, `Wrong recommendation links: ${topic.slug}`);
  if (!expected.length) assert.ok(main.includes("Отдельное занятие по этой теме сейчас не опубликовано"));
}

for (const catalog of ["masterclasses", "programs"]) {
  const expected = fs.readdirSync(`content/${catalog}`).filter((file) => file.endsWith(".json"))
    .map((file) => `/${catalog}/${JSON.parse(fs.readFileSync(`content/${catalog}/${file}`, "utf8")).slug}`).sort();
  assert.deepEqual(productLinks(mainHtml(catalog)), expected, `${catalog}: missing cards without JavaScript`);
}

const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, new Set(urls).size, "Duplicate sitemap URL");

const aiPage = html("programs/ai-dlya-ekspertov");
const schemas = [...aiPage.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .flatMap((match) => JSON.parse(match[1]));
const course = schemas.find((schema) => schema["@type"]?.includes?.("Course"));
assert.ok(course?.about.includes("ИИ и продвижение эксперта"), "Incorrect AI course subject");
assert.ok(!course.about.includes("нейрографика"), "Unrelated subject on AI course");
assert.ok(fs.readFileSync("out/llms.txt", "utf8").includes("26 уроков"));
console.log(`Verified ${topics.length} topic configurations, 8 rendered topic selections, both HTML catalogs, AI schema, llms.txt and unique sitemap URLs.`);
