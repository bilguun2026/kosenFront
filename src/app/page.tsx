"use client";

import Card from "@/components/Home/Card";
import VideoIntroduction from "@/components/Home/VideoIntro";
import NewsCarousel from "@/components/Home/NewsCarousel";
import TechGlobe from "@/components/Home/TechGlobe";
import { motion } from "framer-motion";
import Banner from "@/components/Home/Banner";
import { useQuery } from "@tanstack/react-query";
import { fetchInfoCards } from "@/lib/api";
import { InfoCard } from "@/types/api";

const defaultCards = [
  {
    icon: "graduation",
    title: "БИДНИЙ ТУХАЙ",
    description:
      "Манай сургууль шинжлэх ухаан, технологийн урам зоригтой хамт олныг бэлтгэдэг.",
  },
  {
    icon: "teacher",
    title: "БИДНИЙ УРИА",
    description:
      "Багш, төстэй хамт олныг нэгтгэн, шинэлэг боловсролын зарчимыг дэмждэг.",
  },
  {
    icon: "university",
    title: "БИДНИЙ ЗОРИЛГО",
    description:
      "Оюутны амжилтыг дээд зэргээр дэмжиж, ирээдүйд шинэ эринд бэлтгэх зорилготой.",
  },
];

export default function Home() {
  const { data: apiCards } = useQuery<InfoCard[]>({
    queryKey: ["infoCards"],
    queryFn: fetchInfoCards,
  });

  const cards = apiCards && apiCards.length > 0
    ? apiCards.map((c) => ({ icon: c.icon, title: c.title, description: c.description }))
    : defaultCards;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col min-h-screen text-black relative">
      <Banner />
      <motion.div
        className="max-w-[95%] sm:max-w-4xl lg:max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8 z-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </motion.div>

      <VideoIntroduction />
      <NewsCarousel />
      <TechGlobe />
    </div>
  );
}
