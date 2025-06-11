"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Generate shapes with random initial positions and sizes
const generateShapes = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `shape-${index}`,
    type: index % 2 === 0 ? "circle" : "triangle",
    size: 15 + Math.random() * 15,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  }));

const TechBackground: React.FC = () => {
  const shapes = useMemo(() => generateShapes(0), []); // Set a higher number like 20 if needed

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-transparent">
      <div className="relative w-full h-full">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute ${
              shape.type === "circle"
                ? "rounded-full kosenBg1"
                : "kosenBg1 triangle"
            }`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              boxShadow: "0 0 10px rgba(47, 58, 154, 0.6)", // shadow in kosenBg1 tone
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100, 0],
              y: [0, (Math.random() - 0.5) * 100, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Background Grid using kosen color */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,58,154,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(47,58,154,0.07)_1px,transparent_1px)] bg-[length:50px_50px] animate-circuit" />
      </div>
    </div>
  );
};

export default TechBackground;
