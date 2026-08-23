/** Prefix absolute asset paths for GitHub Pages basePath. */
export function withBasePath(path: string): string {
  if (!path || path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) {
    return `${base}/${path}`;
  }

  return `${base}${path}`;
}
