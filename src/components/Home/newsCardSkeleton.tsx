"use client";

import { motion } from "framer-motion";

const MAIN_BLUE = "#2f3a9a";
const DARK_BLUE = "#223175";

const NewsCardSkeleton: React.FC = () => {
  return (
    <motion.div
      className="w-full max-w-md mx-auto h-[30rem] rounded-2xl overflow-hidden border animate-pulse"
      style={{ borderColor: MAIN_BLUE }}
    >
      <div className="flex flex-col h-full bg-white">
        {/* Image Placeholder (65%) */}
        <div className="relative h-[65%] w-full bg-gray-200" />

        {/* Content Placeholder (35%) */}
        <div className="flex flex-col justify-between h-[35%] p-4">
          <div>
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-full mb-1" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            {/* Optional second line */}
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCardSkeleton;
