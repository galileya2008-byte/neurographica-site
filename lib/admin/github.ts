import { adminConfig } from "@/config/admin";
import type { Product } from "@/types/product";
import { slugify } from "@/lib/admin/slugify";

type GithubContentFile = {
  name: string;
  path: string;
  sha: string;
  download_url: string | null;
  type?: string;
};

type GithubFileResponse = {
  sha: string;
  content: string;
  encoding: string;
};

function getApiBase() {
  const { owner, repo } = adminConfig.github;
  return `https://api.github.com/repos/${owner}/${repo}`;
}

function decodeBase64Utf8(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function githubFetch(path: string, token: string, init?: RequestInit) {
  const response = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `GitHub API error: ${response.status}`;
    try {
      const payload = await response.json();
      if (payload?.message) message = payload.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function listMasterclassFiles(token: string): Promise<GithubContentFile[]> {
  const { masterclassesPath, branch } = adminConfig.github;
  const data = await githubFetch(
    `/contents/${masterclassesPath}?ref=${branch}`,
    token,
  );

  if (!Array.isArray(data)) return [];
  return data.filter((item: GithubContentFile) => item.name.endsWith(".json"));
}

export async function listCoverPaths(token: string): Promise<string[]> {
  const { coversRepoPath, coversPublicPath, branch } = adminConfig.github;
  try {
    const data = await githubFetch(
      `/contents/${coversRepoPath}?ref=${branch}`,
      token,
    );

    if (!Array.isArray(data)) return [...adminConfig.covers];

    const uploaded = data
      .filter(
        (item: GithubContentFile) =>
          item.type === "file" &&
          /\.(png|jpe?g|webp)$/i.test(item.name) &&
          item.name !== ".gitkeep",
      )
      .map((item: GithubContentFile) => `${coversPublicPath}/${item.name}`);

    return Array.from(new Set([...adminConfig.covers, ...uploaded]));
  } catch {
    return [...adminConfig.covers];
  }
}

export async function uploadCover(
  token: string,
  file: File,
  preferredName?: string,
): Promise<string> {
  const { maxBytes, accept } = adminConfig.coverUpload;
  if (!(accept as readonly string[]).includes(file.type)) {
    throw new Error("Допустимы только JPG, PNG или WEBP");
  }
  if (file.size > maxBytes) {
    throw new Error("Файл слишком большой. Максимум 5 МБ");
  }

  const extension =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";

  const baseName =
    slugify(preferredName || file.name.replace(/\.[^.]+$/, "")) || "cover";
  const filename = `${baseName}-${Date.now()}.${extension}`;
  const { coversRepoPath, coversPublicPath, branch } = adminConfig.github;
  const content = await fileToBase64(file);

  await githubFetch(`/contents/${coversRepoPath}/${filename}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add cover image: ${filename}`,
      content,
      branch,
    }),
  });

  return `${coversPublicPath}/${filename}`;
}

export async function getMasterclass(
  token: string,
  filename: string,
): Promise<{ product: Product; sha: string }> {
  const { masterclassesPath, branch } = adminConfig.github;
  const data = (await githubFetch(
    `/contents/${masterclassesPath}/${filename}?ref=${branch}`,
    token,
  )) as GithubFileResponse;

  return {
    product: JSON.parse(decodeBase64Utf8(data.content)) as Product,
    sha: data.sha,
  };
}

export async function saveMasterclass(
  token: string,
  product: Product,
  sha?: string,
): Promise<void> {
  const { masterclassesPath, branch } = adminConfig.github;
  const filename = `${product.slug}.json`;
  const content = encodeBase64Utf8(`${JSON.stringify(product, null, 2)}\n`);

  await githubFetch(`/contents/${masterclassesPath}/${filename}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: sha
        ? `Update masterclass: ${product.title}`
        : `Add masterclass: ${product.title}`,
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function deleteMasterclass(
  token: string,
  slug: string,
  sha: string,
): Promise<void> {
  const { masterclassesPath, branch } = adminConfig.github;

  await githubFetch(`/contents/${masterclassesPath}/${slug}.json`, token, {
    method: "DELETE",
    body: JSON.stringify({
      message: `Delete masterclass: ${slug}`,
      sha,
      branch,
    }),
  });
}
