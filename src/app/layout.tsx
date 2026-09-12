import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CHOMPIFY | Digital Art by Saanvi",
  description: "Digital art portfolio and commission platform for Saanvi.",
  icons: {
    icon: [
      { url: "/icon/IMG_1146.png", type: "image/png" },
      { url: "/icon/IMG_1146.ico", type: "image/x-icon" },
    ],
    shortcut: "/icon/IMG_1146.ico",
    apple: "/icon/IMG_1146.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans bg-background text-text selection:bg-primary/20">{children}</body>
    </html>
  );
}
