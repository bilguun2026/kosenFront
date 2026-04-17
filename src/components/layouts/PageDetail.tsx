"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPage } from "@/lib/api";
import { Page } from "@/types/api";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import DOMPurify from "dompurify";

interface PageDetailProps {
  pageId: string;
}

export default function PageDetail({ pageId }: PageDetailProps) {
  const {
    data: page,
    isLoading,
    error,
  } = useQuery<Page, Error>({
    queryKey: ["page", pageId],
    queryFn: () => fetchPage(pageId),
  });

  if (isLoading || error || !page) {
    const message = error
      ? `Error loading page: ${error.message}`
      : !page
      ? "Page not found"
      : "Loading...";

    const bgColor = error
      ? "bg-red-50 border-red-600 text-red-700"
      : "bg-yellow-50 border-yellow-600 text-yellow-700";

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className={`border-l-4 p-8 rounded-lg shadow-sm ${bgColor}`}>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    );
  }

  // Sanitize HTML content to prevent XSS attacks
  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        "p",
        "div",
        "span",
        "b",
        "i",
        "u",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "br",
        "a",
        "img",
        "table",
        "tr",
        "td",
        "th",
        "tbody",
        "thead",
        "tfoot",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "class", "style"],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <motion.div
        className="rounded-2xl shadow-xl p-10 border relative z-40"
        style={{
          backgroundColor: "rgb(255,255,255)",
          borderColor: "rgb(47,58,154)",
          color: "rgb(0,0,0)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {page.contents.length > 0 ? (
          <div className="space-y-12">
            {page.contents.map((content) => {
              const items = [
                ...content.images.map((img) => ({
                  type: "image" as const,
                  data: img,
                })),
                ...content.texts.map((txt) => ({
                  type: "text" as const,
                  data: txt,
                })),
              ];
              items.sort((a, b) => a.data.order - b.data.order);

              return (
                <section
                  key={content.id}
                  className="border-b border-[rgb(255,194,13)] last:border-none pb-10 last:pb-0"
                >
                  <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-semibold">{content.title}</h2>
                    {content.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {content.tags.map((tag) => (
                          <Link
                            key={tag.id}
                            href={`/contents/${tag.slug}`}
                            className="bg-[#2f3a9a] text-[#ffc20c] text-sm font-medium px-3 py-1 rounded-full hover:bg-[#ffc20c] hover:text-[#2f3a9a] transition-colors"
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 space-y-6">
                    {items.map((item) => {
                      if (item.type === "image") {
                        const image = item.data;
                        return (
                          <div key={`image-${image.id}`} className="mt-6">
                            {image.image_url ? (
                              <Image
                                src={image.image}
                                alt={image.text || content.title}
                                width={672}
                                height={378}
                                className="rounded-lg shadow-sm object-cover w-full max-w-3xl mx-auto"
                              />
                            ) : (
                              <div className="w-full max-w-3xl h-48 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                                <p className="text-gray-500">
                                  Image not available
                                </p>
                              </div>
                            )}
                            {image.text && (
                              <p className="mt-2 text-sm italic text-center">
                                {image.text}
                              </p>
                            )}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`text-${item.data.id}`}
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(item.data.text),
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-[rgb(255,194,13)]">
            No content available for this page.
          </p>
        )}
      </motion.div>

      {page.children.length > 0 && (
        <motion.div
          className="mt-12 rounded-2xl shadow-xl p-8 relative z-40"
          style={{
            backgroundColor: "rgb(255,255,255)",
            border: "1px solid rgb(47,58,154)",
            color: "rgb(47,58,154)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-black">
            Бусад хуудсууд
          </h3>
          <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-6">
            {page.children.map((child) => (
              <motion.div
                key={child.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white border rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/page/${child.slug}`}
                  className="font-medium text-black hover:text-[rgb(255,194,13)]"
                >
                  {child.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
