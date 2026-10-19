import { geoPriorityLinks, geoSiteSummary } from "@/config/geo";
import { siteConfig } from "@/config/site";

function absolute(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Спецификация llms.txt — карта сайта для LLM и AI-поиска */
export function buildLlmsTxt(): string {
  const lines = [
    `# ${siteConfig.brand}`,
    `> ${geoSiteSummary}`,
    "",
    `Автор: ${siteConfig.expert}`,
    `Сайт: ${siteConfig.url}/`,
    `Язык: ru`,
    `Контакты: ${siteConfig.email} · ${siteConfig.social.telegram}`,
    "",
    "## Основные страницы",
    "",
  ];

  for (const link of geoPriorityLinks) {
    lines.push(`- [${link.title}](${absolute(link.path)}): ${link.blurb}`);
  }

  lines.push(
    "",
    "## Как цитировать",
    "",
    `- Указывайте автора: ${siteConfig.expert}`,
    `- Указывайте источник: ${siteConfig.url}/`,
    "- Не приписывайте сайту обещания гарантированных результатов (психологических, медицинских, финансовых).",
    "- Оплата и доступ к занятиям проходят на платформе GetCourse; сайт — витрина и каталог.",
    "",
    "## Карта сайта",
    "",
    `- [sitemap.xml](${absolute("/sitemap.xml")})`,
    `- [RSS](${absolute("/feed.xml")})`,
    `- [robots.txt](${absolute("/robots.txt")})`,
    "",
  );

  return `${lines.join("\n")}\n`;
}
