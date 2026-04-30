const API_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL?.replace(/\/$/, "") || "";

export function buildImageUrl(path?: string | null): string {
  if (!path) return "/images/banner.jpg";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}
