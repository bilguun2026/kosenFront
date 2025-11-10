"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useContentsByTag, useTags, useTagSlug } from "@/hooks/useContents";
import DOMPurify from "dompurify";
import { fixMediaUrls } from "@/utils/replaceMediaUrl";

export default function ContentsClient() {
  const router = useRouter();
  const slug = useTagSlug();

  const { data: tags = [], isLoading: loadingTags } = useTags();
  const { data: contents = [], isLoading: loadingContents } =
    useContentsByTag(slug);

  if (loadingTags || loadingContents) {
    return <p className="text-center text-gray-400">Уншиж байна...</p>;
  }

  const MEDIA_BASE =
    process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://127.0.0.1:8000";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white text-black relative z-40 h-screen">
      {/* Tag Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.slug}
            onClick={() => router.push(`/contents/${tag.slug}`)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border 
              ${
                slug === tag.slug
                  ? "bg-[rgb(47,58,154)] text-[rgb(255,194,13)]"
                  : "bg-white text-[rgb(47,58,154)] border-[rgb(47,58,154)] hover:bg-gray-100"
              }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contents.length === 0 ? (
          <p className="col-span-full text-[rgb(255,194,13)] font-medium">
            Хоосон байна. Энэ тагт мэдээлэл алга.
          </p>
        ) : (
          contents.map((content) => {
            const imgSrc =
              content.image?.image_url &&
              content.image.image_url.startsWith("/media")
                ? `${MEDIA_BASE}${content.image.image_url}`
                : content.image?.image_url || "/images/koocen.png";

            return (
              <Link
                href={`/content/${content.id}`}
                key={content.id}
                className="group block rounded-2xl overflow-hidden border border-[rgb(47,58,154)] bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={content.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-black line-clamp-2">
                    {content.title}
                  </h2>

                  {/* CKEditor HTML description – тоотой/цэгтэй жагсаалт хадгална */}
                  {content.description && (
                    <div
                      className="text-sm text-gray-700 rich-content line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          fixMediaUrls(content.description)
                        ),
                      }}
                    />
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500">
                      {content.created_at}
                    </span>
                    {content.tags?.[0] && (
                      <span className="text-xs font-medium text-[rgb(255,194,13)] bg-[rgb(47,58,154)] px-2 py-1 rounded-full">
                        {content.tags[0].name}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
