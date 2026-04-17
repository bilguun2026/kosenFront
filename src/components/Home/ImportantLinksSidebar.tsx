"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

interface SidebarProps {
  onClose: () => void;
}

const ImportantLinksSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 border-l border-gray-200"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Чухал холбоос</h2>
        <button onClick={onClose}>
          <X className="h-6 w-6 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <Link
          href="http://203.217.139.9/kteacher/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[#ffc20c]"
        >
          Багшийн веб
        </Link>
        <Link
          href="http://203.217.139.9/kouytan/Login?ReturnUrl=%2fkouytan"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[#ffc20c]"
        >
          Оюутны веб
        </Link>
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSeoIAHZlT0caSI_er5nSjJq78xWcFykIYACL22ooduu7hNKDQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[#ffc20c]"
        >
          Элсэлтийн бүртгэл
        </Link>
        <Link
          href="https://www.must.edu.mn/mn/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[#ffc20c]"
        >
          ШУТИС-ийн веб
        </Link>
        <Link
          href="https://drive.google.com/drive/folders/1DWH9v8XNHgt_4gNpBDfucuXOuCagWW4x"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-[#ffc20c]"
        >
          Жишиг даалгавар
        </Link>
      </div>
    </motion.div>
  );
};

export default ImportantLinksSidebar;
