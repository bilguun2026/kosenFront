// components/ClientProviders.tsx
"use client";

import { QueryProvider } from "@/lib/queryClient";
import HeaderWithData from "@/components/layouts/HeaderWithData";
import TechBackground from "@/components/layouts/TechBackground";
import Footer from "@/components/layouts/footer";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <HeaderWithData />
      <TechBackground />
      {children}
      <Footer />
    </QueryProvider>
  );
}
