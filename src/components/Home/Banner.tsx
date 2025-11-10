"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarouselContent } from "@/lib/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_URL?.replace(/\/$/, "") || "";

function buildImageUrl(path?: string | null): string {
  if (!path) return "/images/banner.jpg"; // fallback local image
  if (path.startsWith("http")) return path; // already full URL
  // If backend returns `/media/...`, prepend API base
  return `${API_BASE_URL}${path}`;
}
interface CarouselImage {
  id: number;
  image: string;
  image_url: string;
}

interface CarouselContent {
  id: number;
  title: string;
  description: string;
  images: CarouselImage[];
}

const bannerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    backgroundColor: "#ffc20c",
    color: "#2f3a9a",
    transition: { duration: 0.2 },
  },
};

const dotVariants = {
  hover: {
    scale: 1.2,
    backgroundColor: "#ffc20c",
    transition: { duration: 0.2 },
  },
};

const Banner = () => {
  // Proper Embla setup: viewport ref only, no fade plugin
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapsCount, setScrollSnapsCount] = useState(0);

  const { data, isLoading, error } = useQuery<CarouselContent[]>({
    queryKey: ["carousel-content"],
    queryFn: fetchCarouselContent,
  });

  const slides = data ?? [];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  // Set up Embla events + snap count
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnapsCount(emblaApi.scrollSnapList().length);
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnapsCount(emblaApi.scrollSnapList().length);
      onSelect();
    });

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 15000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  if (isLoading) {
    return (
      <div className="text-white text-center py-16 text-lg sm:text-xl">
        Ачааллаж байна...
      </div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="text-red-500 text-center py-16 text-lg sm:text-xl">
        Мэдээлэл татаж чадсангүй
      </div>
    );
  }

  return (
    <motion.section
      className="relative py-6 sm:py-8 lg:py-12 z-10"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Embla viewport */}
      <div
        className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto relative overflow-hidden rounded-xl"
        ref={emblaRef}
      >
        {/* Embla container */}
        <div className="flex h-[250px] sm:h-[350px] lg:h-[450px]">
          {slides.map((item, index) => {
            const firstImg = item.images?.[0];

            const imageSrc = buildImageUrl(
              firstImg?.image_url || firstImg?.image || null
            );
            return (
              <div
                key={item.id}
                className="relative flex-[0_0_100%] min-w-0 h-full"
              >
                {/* Background image */}
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={item.title || `Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={1280}
                    height={600}
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 75vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
                </div>

                {/* Content overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-start"
                  variants={contentVariants}
                  initial="hidden"
                  animate={selectedIndex === index ? "visible" : "hidden"}
                >
                  <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[90%] sm:max-w-[70%]">
                    <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white drop-shadow-lg leading-tight mb-2">
                      {item.title}
                    </h1>

                    {item.description && (
                      <p className="text-xs sm:text-sm lg:text-base text-white/90 font-medium drop-shadow-md mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    <motion.a
                      href={`/content/${item.id}`}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgb(60,70,170)",
                        color: "white",
                        boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      className="inline-block px-6 py-2 bg-[rgb(47,58,154)] text-[rgb(255,194,13)] font-semibold text-sm sm:text-base rounded-lg shadow-md"
                    >
                      Дэлгэрэнгүй
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nav & Dots */}
      <div className="max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto flex items-center justify-between mt-4 px-4">
        <div className="flex gap-2">
          <motion.button
            className="bg-black/60 text-white p-2 rounded-full"
            onClick={scrollPrev}
            variants={buttonVariants}
            whileHover="hover"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
          <motion.button
            className="bg-black/60 text-white p-2 rounded-full"
            onClick={scrollNext}
            variants={buttonVariants}
            whileHover="hover"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: scrollSnapsCount }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "kosenBg scale-125"
                  : "bg-gray-500/70 scale-100"
              }`}
              onClick={() => scrollTo(index)}
              variants={dotVariants}
              whileHover="hover"
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;
