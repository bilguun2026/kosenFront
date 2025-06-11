"use client";

import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUniversity,
} from "react-icons/fa";
import { IconType } from "react-icons";
import Card from "@/components/Home/Card";
import VideoIntroduction from "@/components/Home/VideoIntro";
import NewsCarousel from "@/components/Home/NewsCarousel";
import RegistrationForm from "@/components/Home/registration";
import TechGlobe from "@/components/Home/TechGlobe";
import { useState } from "react";
import { motion } from "framer-motion";
import Banner from "@/components/Home/Banner";

interface CardData {
  icon: IconType;
  title: string;
  description: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cards: CardData[] = [
    {
      icon: FaGraduationCap,
      title: "БИДНИЙ ТУХАЙ",
      description:
        "Манай сургууль шинжлэх ухаан, технологийн урам зоригтой хамт олныг бэлтгэдэг.",
    },
    {
      icon: FaChalkboardTeacher,
      title: "БИДНИЙ УРИА",
      description:
        "Багш, төстэй хамт олныг нэгтгэн, шинэлэг боловсролын зарчимыг дэмждэг.",
    },
    {
      icon: FaUniversity,
      title: "БИДНИЙ ЗОРИЛГО",
      description:
        "Оюутны амжилтыг дээд зэргээр дэмжиж, ирээдүйд шинэ эринд бэлтгэх зорилготой.",
    },
  ];

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
      <TechGlobe onRegisterClick={() => setIsModalOpen(true)} />

      {/* Registration Modal */}
      {isModalOpen && (
        <RegistrationForm onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
