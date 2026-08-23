import { adminConfig } from "@/config/admin";
import type { Product } from "@/types/product";

type GithubContentFile = {
  name: string;
  path: string;
  sha: string;
  download_url: string | null;
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
