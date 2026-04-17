"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface TechGridProps {
  onRegisterClick: () => void;
}

const TechGrid: React.FC<TechGridProps> = ({ onRegisterClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes (Three.js code is commented out)
    const timeout = setTimeout(() => setIsLoading(false), 2000);

    const handleResize = () => {
      if (mountRef.current && containerRef.current) {
        // Placeholder for resize logic if Three.js is re-enabled
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [onRegisterClick]);

  return (
    <section
      className="relative w-full max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto min-h-[350px] sm:min-h-[400px] bg-white text-black z-10 overflow-hidden my-8 sm:my-12 lg:my-16 rounded-xl shadow-2xl border-[1px] border-[rgb(47,58,154)]"
      style={{
        backgroundImage: `url("/images/MUST.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-[rgb(47,58,154)] z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-[rgb(255,194,13)] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-base sm:text-lg font-medium text-white">
              Ачааллаж байна...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Commented out Three.js canvas */}
      {/* <div ref={containerRef} className="absolute inset-1">
        <div ref={mountRef} className="w-full h-full" />
      </div> */}

      <motion.div className="absolute inset-0 bg-[rgb(47,58,154)] opacity-40"></motion.div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center h-full py-8 sm:py-12">
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[rgb(255,194,13)] max-w-[90%] sm:max-w-[80%]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MUST KOSEN: Инженерийн Ирээдүйг Бүтээ!
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-[90%] sm:max-w-[80%] lg:max-w-3xl line-clamp-3 text-[#ffffff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Японы KOSEN загвараар практик инженерчлэлийн боловсрол эзэмшиж,
          Монголын аж үйлдвэрийн хөгжилд хувь нэмрээ оруул.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 max-w-[95%] sm:max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { title: "200+", subtitle: "Оюутнууд" },
            { title: "4", subtitle: "Чиглэл" },
            { title: "10+", subtitle: "Клуб" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-[rgb(47,58,154)] p-3 sm:p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[rgb(255,194,13)]">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base">{item.subtitle}</p>
            </div>
          ))}
        </motion.div>
        <motion.button
          onClick={onRegisterClick}
          className="mt-6 sm:mt-8 bg-[rgb(255,194,13)] text-[rgb(47,58,154)] font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:brightness-110 transition-all duration-300 text-sm sm:text-base"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Одоо бүртгүүл
        </motion.button>
      </div>
    </section>
  );
};

export default TechGrid;
