"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { Tag, ContentList } from "@/types/api";
import { fetchTags, fetchContents } from "@/lib/api";
import NewsCard, { NewsCardProps } from "./NewsCard";
import NewsCardSkeleton from "./newsCardSkeleton";

// === Style Constants ===

// === Variants ===
const tagCardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

// === TagCard ===
interface TagCardProps {
  tag: Tag;
  index: number;
  selectedTagIndex: number;
  handleTagSelect: (index: number) => void;
  handleSeeAllClick: () => void;
}

const TagCard: React.FC<TagCardProps> = ({
  tag,
  index,
  selectedTagIndex,
  handleTagSelect,
  handleSeeAllClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = selectedTagIndex === index;

  return (
    <motion.div
      custom={index}
      variants={tagCardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleTagSelect(index)}
      className={`relative cursor-pointer px-4 py-2 rounded-lg border-[2px] text-sm font-medium whitespace-nowrap z-20 ${
        isActive
          ? "text-[#2f3a9a] border-[#2f3a9a] bg-white"
          : "text-[#223175] border-transparent bg-[#f3f4f6]"
      }`}
    >
      <span>{tag.name}</span>

      <motion.div
        className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#2f3a9a] rounded-full"
        whileHover={{ width: "50%", x: "-50%" }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="see-all"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              e.stopPropagation();
              handleSeeAllClick();
            }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-xs text-white bg-[#2f3a9a] px-3 py-1.5 rounded-lg shadow-lg z-50"
          >
            Бүгдийг харах
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// === NewsCarousel ===
const NewsCarousel: React.FC = () => {
  const router = useRouter();
  const [selectedTagIndex, setSelectedTagIndex] = useState(0);

  const {
    data: tags = [],
    isLoading: tagsLoading,
    error: tagsError,
  } = useQuery<Tag[], Error>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
  });

  const selectedTagSlug = tags[selectedTagIndex]?.slug;

  const {
    data: contents = [],
    isLoading: contentsLoading,
    error: contentsError,
  } = useQuery<ContentList[], Error>({
    queryKey: ["contents", selectedTagSlug],
    queryFn: () => fetchContents(selectedTagSlug),
    enabled: !!selectedTagSlug,
    staleTime: 1000 * 60 * 5,
  });

  const [topicEmblaRef, topicEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [newsEmblaRef, newsEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });

  const newsCards: NewsCardProps[] = contents.map((content) => ({
    id: content.id,
    title: content.title,
    imageUrl: content.image?.image_url || "/fallback.jpg",
    date: content.created_at,
    tag: content.tags?.[0]?.name || "General",
    category: content.tags?.[0]?.name || "General",
    description: content.description || "",
  }));

  const filteredCards = tags.length
    ? newsCards.filter((card) => card.tag === tags[selectedTagIndex]?.name)
    : newsCards;

  const handleTagSelect = (index: number) => {
    setSelectedTagIndex(index);
    topicEmblaApi?.scrollTo(index);
  };

  const handleSeeAllClick = () => {
    const slug = tags[selectedTagIndex]?.slug;
    if (slug) router.push(`/contents/${slug}`);
  };

  useEffect(() => {
    newsEmblaApi?.reInit();
  }, [filteredCards, newsEmblaApi]);

  useEffect(() => {
    if (!topicEmblaApi) return;
    const onSelect = () =>
      setSelectedTagIndex(topicEmblaApi.selectedScrollSnap() || 0);
    topicEmblaApi.on("select", onSelect);
    return () => {
      topicEmblaApi.off("select", onSelect);
    };
  }, [topicEmblaApi]);

  if (tagsLoading || contentsLoading) {
    return (
      <div className="w-full">
        <SkeletonUI />
      </div>
    );
  }

  if (tagsError || contentsError) {
    return (
      <div className="w-full py-12 text-center text-red-500">
        Алдаа гарлаа: {(tagsError || contentsError)?.message}
      </div>
    );
  }

  if (!tags.length) {
    return (
      <div className="w-full py-12 text-center text-gray-500">
        Ямар ч төрөл байхгүй байна.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <style jsx>{`
        .embla {
          overflow: visible;
        }
        .embla__container {
          display: flex;
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow: visible;
        }
        .embla__container::-webkit-scrollbar {
          display: none;
        }
        .embla__slide {
          flex: 0 0 auto;
          position: relative;
        }
      `}</style>

      <div className="max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto py-8">
        <div className="flex flex-col gap-6">
          {/* Tags */}
          <motion.div
            className="bg-white p-6 border border-[#2f3a9a] rounded-2xl shadow-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="embla" ref={topicEmblaRef}>
              <div className="embla__container flex gap-4 snap-x snap-mandatory">
                {tags.map((tag, index) => (
                  <TagCard
                    key={tag.id}
                    tag={tag}
                    index={index}
                    selectedTagIndex={selectedTagIndex}
                    handleTagSelect={handleTagSelect}
                    handleSeeAllClick={handleSeeAllClick}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="w-full h-px bg-[#2f3a9a] my-2" />
          </div>

          {/* News Cards */}
          <div className="embla" ref={newsEmblaRef}>
            <div className="embla__container flex gap-4">
              {filteredCards.length ? (
                filteredCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="embla__slide flex-shrink-0 w-[80%] xs:w-[70%] sm:w-[50%] md:w-[35%] lg:w-[25%] xl:w-[22%]"
                  >
                    <NewsCard {...card} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-6 text-gray-500 text-sm">
                  Энэ төрөлд одоогоор мэдээлэл байхгүй байна.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === Skeleton UI ===
const SkeletonUI = () => (
  <div className="max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto py-8">
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 border border-[#2f3a9a] rounded-2xl shadow-md">
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[80%] xs:w-[70%] sm:w-[50%] md:w-[35%] lg:w-[25%] xl:w-[22%]"
          >
            <NewsCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default NewsCarousel;
