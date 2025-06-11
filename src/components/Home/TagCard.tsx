import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TagCardProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TagCard({ tag, isSelected, onClick }: TagCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className={`relative group cursor-pointer text-sm font-medium rounded-full transition-colors duration-300 px-4 py-1.5 border-2 border-[#2f3a9a] ${
        isSelected
          ? "bg-[#2f3a9a] text-white"
          : "bg-white text-[#2f3a9a] hover:bg-[#2f3a9a] hover:text-white"
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tag}

      {/* Hover underline */}
      <motion.div
        className="absolute bottom-1 left-1/2 h-0.5 bg-[#2f3a9a] rounded-full"
        initial={{ width: 0 }}
        animate={{
          width: isHovered ? "50%" : 0,
          x: "-50%",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Dropdown on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-xs text-white bg-[#2f3a9a] px-3 py-1.5 rounded-lg shadow-lg z-50"
          >
            Бүгдийг харах
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
