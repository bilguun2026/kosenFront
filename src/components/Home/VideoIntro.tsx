"use client";

import React, { useCallback } from "react";
import VideoSection from "@/components/Home/Video";
import { fetchVideos } from "@/lib/api";
import { Video } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VideoIntroduction: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const {
    data: videos = [],
    isLoading,
    error,
  } = useQuery<Video[], Error>({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  if (isLoading) return <p>Агуулга ачааллаж байна...</p>;
  if (error) return <p>Алдаа гарлаа: {error.message}</p>;

  return (
    <section className="relative z-40 bg-[#eeefff] py-16 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Video Section with Carousel */}
        <div className="relative w-full">
          {videos.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-md" ref={emblaRef}>
                <div className="flex">
                  {videos.map((video: Video) => {
                    const src = video.video_file || video.url || "";
                    return (
                      <div key={video.id} className="flex-[0_0_100%] min-w-0">
                        <div className="aspect-video">
                          <VideoSection
                            title={video.title}
                            videoSource={src}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {videos.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#2f3a9a] rounded-full p-2 shadow-md z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#2f3a9a] rounded-full p-2 shadow-md z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <p>Видео оруулаагүй байна.</p>
          )}
        </div>

        {/* Text Section */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            ВИДЕО ТАНИЛЦУУЛГА
          </h2>
          <p className="text-lg sm:text-xl mb-8 leading-relaxed text-gray-600">
            Манай сургууль инженерийн чиглэлээр өргөн хүрээтэй боловсролыг санал
            болгодог. Эдгээр дөрвөн гол чиглэл нь мэргэжлийн ур чадвар, практик
            дадлага болон дэвшилтэт технологийг хамарч, ирээдүйн чадавхийг бий
            болгоно.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 bg-blue-600 rounded-full mr-3" />
                Барилгын инженерчлэл
              </li>
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 bg-blue-600 rounded-full mr-3" />
                Механик инженерчлэл
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full mr-3 bg-[#ffc20c]" />
                Мэдээллийн технологи
              </li>
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full mr-3 bg-[#ffc20c]" />
                Цахилгааны инженерчлэл
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntroduction;
