"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchContent } from "@/lib/api";
import { Content, ContentImage, ContentText } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import { fixMediaUrls } from "@/utils/replaceMediaUrl";

type OrderedBlock =
  | (ContentText & { type: "text" })
  | (ContentImage & { type: "image" });

// Helper: sanitize + fix media URLs
function sanitizeHtml(html?: string | null): string {
  if (!html) return "";
  const fixed = fixMediaUrls(html);
  if (typeof window === "undefined") return fixed;
  return DOMPurify.sanitize(fixed);
}

function mergeAndSortContent(
  texts: ContentText[] | undefined,
  images: ContentImage[] | undefined
): OrderedBlock[] {
  const textBlocks: OrderedBlock[] = (texts ?? []).map((t) => ({
    ...t,
    type: "text",
  }));
  const imageBlocks: OrderedBlock[] = (images ?? []).map((i) => ({
    ...i,
    type: "image",
  }));
  return [...textBlocks, ...imageBlocks].sort((a, b) => a.order - b.order);
}

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const contentId = useMemo(() => Number(id), [id]);

  const {
    data: content,
    error,
    isLoading,
  } = useQuery<Content>({
    queryKey: ["content", contentId],
    queryFn: () => fetchContent(contentId),
    enabled: !isNaN(contentId),
  });

  if (isNaN(contentId)) {
    return (
      <div className="text-red-600 text-center mt-12">
        Invalid content ID.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center mt-12">Loading...</div>;
  }

  if (error || !content) {
    return (
      <div className="text-red-600 text-center mt-12">
        Failed to load content.
      </div>
    );
  }

  const MEDIA_BASE =
    process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://127.0.0.1:8000";

  const allBlocks = mergeAndSortContent(content.texts, content.images);

  // --- Take last image block as banner ---
  const imageIndexes = allBlocks
    .map((b, idx) => (b.type === "image" ? idx : -1))
    .filter((i) => i !== -1);

  const bannerIndex =
    imageIndexes.length > 0 ? imageIndexes[imageIndexes.length - 1] : -1;

  const bannerBlock =
    bannerIndex >= 0
      ? (allBlocks[bannerIndex] as ContentImage & { type: "image" })
      : null;

  const blocks = allBlocks.filter((_, idx) => idx !== bannerIndex);

  const buildImgSrc = (url: string) =>
    url.startsWith("/media") ? `${MEDIA_BASE}${url}` : url;

  return (
    <div className="max-w-6xl mx-auto my-8 sm:my-12 px-2 sm:px-4 lg:px-6 relative z-40">
      {/* Card container */}
      <div className="bg-white text-black border border-[rgb(47,58,154)] rounded-xl shadow-md overflow-hidden overflow-x-hidden">
        {/* Banner image (hero) with overlay content */}
        {bannerBlock && (
          <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-80">
            <Image
              src={buildImgSrc(bannerBlock.image_url)}
              alt={bannerBlock.text || "Banner image"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
            />
            {/* Dark gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Title + tags + description on top of banner */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md break-words">
                  {content.title}
                </h1>

                {content.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <Link href={`/contents/${tag.slug}`} key={tag.id}>
                        <span className="bg-[#2f3a9a] text-[#ffc20c] text-[10px] sm:text-xs font-medium px-3 py-1 rounded-full hover:bg-[#ffc20c] hover:text-[#2f3a9a] transition-colors">
                          {tag.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {content.description && (
                <p className="text-xs sm:text-sm lg:text-base text-white/90 max-w-4xl break-words">
                  {content.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Body content with padding */}
        <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8">
          {blocks.map((item) => {
            if (item.type === "text") {
              return (
                <div
                  key={`text-${item.id}`}
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 rich-content break-words whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(item.text),
                  }}
                />
              );
            } else {
              // Image block: image left, text right
              const imgSrc = buildImgSrc(item.image_url);

              return (
                <div
                  key={`img-${item.id}`}
                  className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-start"
                >
                  <div className="relative w-full md:w-1/2 lg:w-5/12 h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden border border-[rgb(47,58,154)] shrink-0">
                    <Image
                      src={imgSrc}
                      alt={item.text || "Content image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                    />
                  </div>

                  {item.text && (
                    <div className="md:w-1/2 lg:w-7/12">
                      <div
                        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 rich-content break-words whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(item.text),
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
