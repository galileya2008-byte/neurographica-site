export function isDirectAudioUrl(url?: string): boolean {
  if (!url) return false;
  return /\.(mp3|m4a|wav|ogg|oga)(?:\?.*)?$/i.test(url);
}

export function audioMimeType(url?: string): string {
  if (!url) return "audio/mpeg";
  if (/\.ogg(?:\?.*)?$/i.test(url) || /\.oga(?:\?.*)?$/i.test(url)) {
    return "audio/ogg";
  }
  if (/\.m4a(?:\?.*)?$/i.test(url)) return "audio/mp4";
  if (/\.wav(?:\?.*)?$/i.test(url)) return "audio/wav";
  return "audio/mpeg";
}

export function absoluteMediaUrl(siteUrl: string, value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}
