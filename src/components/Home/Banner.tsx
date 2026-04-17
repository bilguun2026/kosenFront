"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { useQuery } from "@tanstack/react-query";
import { fetchCarouselContent } from "@/lib/api";

interface CarouselContent {
  id: number;
  title: string;
  description: string;
  images: { id: number; image: string; image_url: string }[];
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading, error } = useQuery<CarouselContent[]>({
    queryKey: ["carousel-content"],
    queryFn: fetchCarouselContent,
  });

  const slides = (data || []).map((item) => ({
    image: item.images?.[0]?.image ?? "/images/banner.jpg",
    content: (
      <div className="relative w-full h-full">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent z-0 rounded-xl" />

        {/* Slide content */}
        <motion.div
          className="relative z-10 w-full h-full flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8 py-8 space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-white drop-shadow-lg leading-tight max-w-[90%] sm:max-w-[80%]">
            {item.title}
          </h1>

          {item.description && (
            <p className="text-xs sm:text-sm lg:text-base text-white font-medium drop-shadow-md max-w-[90%] sm:max-w-[80%] line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <motion.a
              href={`/content/${item.id}`}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(60,70,170)",
                color: "white",
                boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="inline-block px-6 py-2 bg-[rgb(47,58,154)] text-[rgb(255,194,13)] font-semibold text-sm sm:text-base rounded-lg shadow-md"
            >
              Дэлгэрэнгүй
            </motion.a>
          </div>
        </motion.div>
      </div>
    ),
  }));

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 15000);

    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  if (isLoading) {
    return (
      <div className="text-white text-center py-16 text-lg sm:text-xl">
        Ачааллаж байна...
      </div>
    );
  }

  if (error) {
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
      <div
        className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto relative overflow-hidden rounded-xl"
        ref={emblaRef}
      >
        <div className="relative h-[250px] sm:h-[350px] lg:h-[450px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`embla__slide absolute top-0 left-0 w-full h-full ${
                selectedIndex === index ? "embla__slide--is-selected" : ""
              }`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={1280}
                  height={600}
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 75vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center w-full"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                {slide.content}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav & Dots */}
      <div className="max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto flex items-center justify-between mt-4 px-4">
        <div className="flex gap-2">
          <motion.button
            className="bg-black/50 text-white p-2 rounded-full"
            onClick={scrollPrev}
            variants={buttonVariants}
            whileHover="hover"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
          <motion.button
            className="bg-black/50 text-white p-2 rounded-full"
            onClick={scrollNext}
            variants={buttonVariants}
            whileHover="hover"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        </div>
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "kosenBg scale-125"
                  : "bg-gray-500 scale-100"
              }`}
              onClick={() => scrollTo(index)}
              variants={dotVariants}
              whileHover="hover"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .embla__slide {
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .embla__slide--is-selected {
          opacity: 1;
        }
      `}</style>
    </motion.section>
  );
};

export default Banner;
