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

function mergeAndSortContent(
  texts: ContentText[],
  images: ContentImage[]
): OrderedBlock[] {
  const textBlocks: OrderedBlock[] = texts.map((t) => ({ ...t, type: "text" }));
  const imageBlocks: OrderedBlock[] = images.map((i) => ({
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
      <div className="text-red-600 text-center mt-12">Invalid content ID.</div>
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white text-black border border-[rgb(47,58,154)] rounded-xl shadow-md my-12 space-y-6 relative z-40">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        {content.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <Link href={`/contents/${tag.slug}`} key={tag.id}>
                <span className="bg-[#2f3a9a] text-[#ffc20c] text-sm font-medium px-3 py-1 rounded-full hover:bg-[#ffc20c] hover:text-[#2f3a9a] transition-colors">
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {content.description && (
        <p className="text-base text-gray-600">{content.description}</p>
      )}

      {mergeAndSortContent(content.texts, content.images).map((item) => {
        if (item.type === "text") {
          return (
            <div
              key={`text-${item.id}`}
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(fixMediaUrls(item.text)),
              }}
            />
          );
        } else {
          return (
            <div key={`img-${item.id}`} className="space-y-2">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-[rgb(47,58,154)]">
                <Image
                  src={
                    item.image_url.startsWith("/media")
                      ? `http://localhost:8000/${item.image_url}`
                      : item.image_url
                  }
                  alt={item.text || "Content image"}
                  fill
                  className="object-cover"
                />
              </div>
              {item.text && (
                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(fixMediaUrls(item.text)),
                  }}
                />
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
