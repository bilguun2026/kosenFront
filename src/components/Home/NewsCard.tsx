/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export interface NewsCardProps {
  id?: number;
  title: string;
  imageUrl: string;
  date: string;
  tag: string;
  category: string;
  description: string;
}

const MAIN_BLUE = "#2f3a9a";
const DARK_BLUE = "#223175";

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  imageUrl,
  date,
  description,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/content/${id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="w-full max-w-md mx-auto h-[30rem] cursor-pointer rounded-2xl overflow-hidden border"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ boxShadow: `0 8px 24px ${MAIN_BLUE}33` }}
      style={{ borderColor: MAIN_BLUE }}
    >
      <div className="flex flex-col h-full bg-white">
        {/* Image (65%) */}
        <div className="relative h-[65%] w-full overflow-hidden">
          <img
            src={
              imageUrl.startsWith("/media")
                ? `http://localhost:8000/${imageUrl}`
                : imageUrl
            }
            alt={title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/koocen.png";
            }}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(47,58,154,0.6)] to-transparent z-10" />
        </div>

        {/* Content (35%) */}
        <div className="flex flex-col justify-between h-[35%] p-4">
          <div>
            <h2
              className="text-lg font-semibold text-[--dark-blue] text-ellipsis line-clamp-2"
              style={{ color: DARK_BLUE }}
            >
              {title}
            </h2>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {description || "Дэлгэрэнгүй мэдээллийг дарж уншина уу."}
            </p>
          </div>
          <div
            className="flex justify-between items-center pt-3 border-t text-sm"
            style={{ borderColor: MAIN_BLUE, color: MAIN_BLUE }}
          >
            <span>{date}</span>
            {/* Optional category */}
            {/* <span className="bg-[--main-blue]/10 text-[--main-blue] px-3 py-1 rounded-full font-medium">
              {category}
            </span> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
