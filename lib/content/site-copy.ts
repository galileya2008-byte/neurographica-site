import "server-only";

import fs from "fs";
import path from "path";
import { siteCopyKeys } from "@/lib/content/site-copy-schema";

export type SiteCopyMap = Record<string, string>;

const copyPath = path.join(process.cwd(), "content", "site-copy.json");

let cached: SiteCopyMap | null = null;

function readCopyFile(): SiteCopyMap {
  if (!fs.existsSync(copyPath)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(copyPath, "utf-8")) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const result: SiteCopyMap = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

export function getSiteCopy(): SiteCopyMap {
  if (cached) return cached;
  cached = readCopyFile();
  return cached;
}

/** Текст из site-copy.json с запасным значением */
export function siteCopy(key: string, fallback = ""): string {
  const value = getSiteCopy()[key];
  if (typeof value === "string" && value.trim()) return value;
  return fallback;
}

export function getSiteCopyDefaults(): SiteCopyMap {
  const copy = getSiteCopy();
  const defaults: SiteCopyMap = {};
  for (const key of siteCopyKeys) {
    defaults[key] = copy[key] ?? "";
  }
  return defaults;
}
