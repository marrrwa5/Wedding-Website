import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lora, Playfair_Display, Scheherazade_New } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad & Zahra — Wedding Invitation",
  description: "You are warmly invited to celebrate the union of Mohammad & Zahra",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="ltr"
      className={`h-full ${cormorant.variable} ${lora.variable} ${playfair.variable} ${scheherazade.variable}`}
    >
      <head>
        {/* Preload custom Arabic fonts to eliminate invisible-text flash */}
        <link rel="preload" href="/fonts/AlKanz.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/KanzAlMarjaan.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        {/* Preload critical first-screen video */}
        <link rel="preload" href="/images/Basmalah_Video.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}
