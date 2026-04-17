"use client";

import React from "react";
import VideoSection from "@/components/Home/Video";
import { fetchVideos } from "@/lib/api";
import { Video } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const VideoIntroduction: React.FC = () => {
  const {
    data: videos = [],
    isLoading,
    error,
  } = useQuery<Video[]>({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  if (isLoading) {
    return <p>Агуулга ачааллаж байна...</p>;
  }

  if (error) {
    return <p>Алдаа гарлаа: {error.message}</p>;
  }

  return (
    <section className="relative z-40 bg-[#eeefff] py-16 px-4 sm:px-6 lg:px-12">
      <div className="w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Video Section */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
          {videos.length > 0 ? (
            videos.map((video: any) => (
              <VideoSection
                key={video.id}
                title={video.title}
                videoSource={video.video_file || video.url}
              />
            ))
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

          {/* Engineering Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 bg-blue-600 rounded-full mr-3"></span>
                Барилгын инженерчлэл
              </li>
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 bg-blue-600 rounded-full mr-3"></span>
                Механик инженерчлэл
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full mr-3 bg-[#ffc20c]"></span>
                Мэдээллийн технологи
              </li>
              <li className="flex items-center">
                <span className="w-3.5 h-3.5 rounded-full mr-3 bg-[#ffc20c]"></span>
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
