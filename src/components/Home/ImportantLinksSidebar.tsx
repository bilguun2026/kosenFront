"use client";

import { X, Link2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Urls } from "@/types/api";
import { fetchUrls } from "@/lib/api";

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
};

interface SidebarProps {
  onClose: () => void;
}

const ImportantLinksSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const {
    data: urls,
    error,
    isLoading,
  } = useQuery<Urls[]>({
    queryKey: ["urls"],
    queryFn: fetchUrls,
    enabled: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className="flex-1 bg-black/40 backdrop-blur-sm"
      />

      {/* Sidebar */}
      <motion.div
        className="h-full w-80 sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="relative flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
                <Link2 className="h-5 w-5 text-[#ffc20c]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Чухал холбоос
                </h2>
                <p className="text-[11px] text-slate-300">
                  Таны байнга ашиглах веб хаягууд
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-[#ffc20c] via-amber-400 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-xl bg-slate-200/70 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              Холбоосуудыг ачааллахад алдаа гарлаа. Дараа дахин оролдоно уу.
            </div>
          )}

          {!isLoading && !error && (!urls || urls.length === 0) && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center">
              <p className="text-xs font-medium text-slate-700">
                Одоогоор бүртгэгдсэн холбоос алга байна.
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Админаар дамжуулан чухал холбоос нэмэх боломжтой.
              </p>
            </div>
          )}

          {!isLoading &&
            !error &&
            urls &&
            urls.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm hover:border-[#ffc20c]/60 hover:shadow-md hover:-translate-y-[1px] transition-transform "
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-slate-800 group-hover:text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400 truncate">
                    {item.url}
                  </p>
                </div>
                <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-[#ffc20c]" />
              </Link>
            ))}
        </div>

        {/* Footer hint */}
        <div className="border-t border-slate-200 bg-white px-4 py-2.5 text-[11px] text-slate-500">
          <span className="font-medium text-slate-700">Tip:</span> Холбоос дээр
          дармагц шинэ цонхонд нээгдэнэ.
        </div>
      </motion.div>
    </div>
  );
};

export default ImportantLinksSidebar;
