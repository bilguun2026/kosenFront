import { Geist, Roboto } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import ClientProviders from "@/lib/clientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSans3 = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MUST KOOSEN",
  description: "Мust Koosen сургуулийн албан ёсны вэб сайт",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body
        className={`${geistSans.variable} ${sourceSans3.className} antialiased min-h-screen`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
