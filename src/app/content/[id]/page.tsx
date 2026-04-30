import { Metadata } from "next";
import ContentDetailPage from "./ContentDetail";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
const MEDIA_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://localhost:8000";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/contents/${id}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const content = await res.json();

    const firstImage = content.images?.[0];
    const imageUrl = firstImage?.image_url
      ? `${MEDIA_URL}${firstImage.image_url}`
      : undefined;
    const pageUrl = `${SITE_URL}/content/${id}`;

    return {
      title: content.title ? `${content.title} | MUST KOOSEN` : "MUST KOOSEN",
      description: content.description ?? undefined,
      openGraph: {
        title: content.title,
        description: content.description ?? undefined,
        url: pageUrl,
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: content.title,
        description: content.description ?? undefined,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }: Props) {
  await params; // ensure params resolved before rendering
  return <ContentDetailPage />;
}
