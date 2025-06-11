export function fixMediaUrls(html: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000";
  return html.replace(/src=(["']?)\/media\//g, `src=$1${baseUrl}/media/`);
}
