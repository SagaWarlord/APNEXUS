import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Lilita_One } from "next/font/google";
import "./globals.css";

// Game-title font: chunky, bold, perfect for JOBREADY heading
const lilitaOne = Lilita_One({
  variable: "--font-lilita",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Display / section heading font
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

// Body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOBREADY \u2014 A Tech Event | Build Your Base. Conquer the Code.",
  description:
    "JOBREADY is a three-round website development challenge at MMMUT Gorakhpur. Code, Build, Compete. 6 November 2026.",
  keywords: ["JOBREADY", "MMMUT", "tech event", "web development", "coding", "Gorakhpur"],
};

export const viewport: Viewport = {
  themeColor: "#1A0E00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lilitaOne.variable} ${cinzel.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/YouBlockheadOpen.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if(typeof document!=='undefined'&&document.fonts){document.fonts.load('16px "You Blockhead"');document.fonts.load('bold 16px "You Blockhead"');}`
          }}
        />
      </head>
      <body className="bg-[#1A1208] text-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
