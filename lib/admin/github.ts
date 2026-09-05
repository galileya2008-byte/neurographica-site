import { adminConfig } from "@/config/admin";
import type { Material } from "@/types/material";
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

    if (response.status === 401 || response.status === 403) {
      throw new Error(
        "GitHub не принял токен. Нужен Personal Access Token (classic) с правом repo.",
      );
    }
    if (response.status === 404) {
      throw new Error(
        "Репозиторий или путь не найден. Проверьте доступ токена к neurographica-site.",
      );
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

function resolveImageExtension(file: File): "jpg" | "png" | "webp" {
  const type = file.type.toLowerCase();
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/jpeg" || type === "image/jpg") return "jpg";

  const name = file.name.toLowerCase();
  if (name.endsWith(".png")) return "png";
  if (name.endsWith(".webp")) return "webp";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "jpg";

  throw new Error("Допустимы только JPG, PNG или WEBP");
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
  const { maxBytes } = adminConfig.coverUpload;
  if (file.size > maxBytes) {
    throw new Error("Файл слишком большой. Максимум 5 МБ");
  }

  const extension = resolveImageExtension(file);
  const baseName =
    slugify(preferredName || file.name.replace(/\.[^.]+$/, "")) || "cover";
  const filename = `${baseName}-${Date.now()}.${extension}`;
  const { coversRepoPath, coversPublicPath, branch } = adminConfig.github;
  const content = await fileToBase64(file);
  const repoPath = `${coversRepoPath}/${filename}`;

  await githubFetch(`/contents/${repoPath}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: `Add cover image: ${filename}`,
      content,
      branch,
    }),
  });

  // Убеждаемся, что файл реально появился в репозитории
  const verify = await githubFetch(`/contents/${repoPath}?ref=${branch}`, token);
  if (!verify || typeof verify !== "object" || !("sha" in verify)) {
    throw new Error("Обложка не сохранилась в GitHub. Попробуйте ещё раз.");
  }

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

export async function listProgramFiles(token: string): Promise<GithubContentFile[]> {
  const { programsPath, branch } = adminConfig.github;
  const data = await githubFetch(`/contents/${programsPath}?ref=${branch}`, token);

  if (!Array.isArray(data)) return [];
  return data.filter((item: GithubContentFile) => item.name.endsWith(".json"));
}

export async function getProgram(
  token: string,
  filename: string,
): Promise<{ product: Product; sha: string }> {
  const { programsPath, branch } = adminConfig.github;
  const data = (await githubFetch(
    `/contents/${programsPath}/${filename}?ref=${branch}`,
    token,
  )) as GithubFileResponse;

  return {
    product: JSON.parse(decodeBase64Utf8(data.content)) as Product,
    sha: data.sha,
  };
}

export async function saveProgram(
  token: string,
  product: Product,
  sha?: string,
): Promise<void> {
  const { programsPath, branch } = adminConfig.github;
  const filename = `${product.slug}.json`;
  const content = encodeBase64Utf8(`${JSON.stringify(product, null, 2)}\n`);

  await githubFetch(`/contents/${programsPath}/${filename}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: sha ? `Update program: ${product.title}` : `Add program: ${product.title}`,
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function deleteProgram(
  token: string,
  slug: string,
  sha: string,
): Promise<void> {
  const { programsPath, branch } = adminConfig.github;

  await githubFetch(`/contents/${programsPath}/${slug}.json`, token, {
    method: "DELETE",
    body: JSON.stringify({
      message: `Delete program: ${slug}`,
      sha,
      branch,
    }),
  });
}

export async function listMaterialFiles(token: string): Promise<GithubContentFile[]> {
  const { materialsPath, branch } = adminConfig.github;
  const data = await githubFetch(
    `/contents/${materialsPath}?ref=${branch}`,
    token,
  );

  if (!Array.isArray(data)) return [];
  return data.filter((item: GithubContentFile) => item.name.endsWith(".json"));
}

export async function getMaterial(
  token: string,
  filename: string,
): Promise<{ material: Material; sha: string }> {
  const { materialsPath, branch } = adminConfig.github;
  const data = (await githubFetch(
    `/contents/${materialsPath}/${filename}?ref=${branch}`,
    token,
  )) as GithubFileResponse;

  return {
    material: JSON.parse(decodeBase64Utf8(data.content)) as Material,
    sha: data.sha,
  };
}

export async function saveMaterial(
  token: string,
  material: Material,
  sha?: string,
): Promise<void> {
  const { materialsPath, branch } = adminConfig.github;
  const filename = `${material.slug}.json`;
  const content = encodeBase64Utf8(`${JSON.stringify(material, null, 2)}\n`);

  await githubFetch(`/contents/${materialsPath}/${filename}`, token, {
    method: "PUT",
    body: JSON.stringify({
      message: sha
        ? `Update material: ${material.title}`
        : `Add material: ${material.title}`,
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function deleteMaterial(
  token: string,
  slug: string,
  sha: string,
): Promise<void> {
  const { materialsPath, branch } = adminConfig.github;

  await githubFetch(`/contents/${materialsPath}/${slug}.json`, token, {
    method: "DELETE",
    body: JSON.stringify({
      message: `Delete material: ${slug}`,
      sha,
      branch,
    }),
  });
}
