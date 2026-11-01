import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JOBREADY — Build Your Base. Conquer the Code.",
  description:
    "JobReady is a three-round website development challenge at MMMUT, Gorakhpur. Build your frontend, power it with a backend, and showcase your creation. 6 November 2026.",
  keywords: ["JobReady", "MMMUT", "hackathon", "web development", "coding competition", "Gorakhpur"],
  openGraph: {
    title: "JOBREADY — Build Your Base. Conquer the Code.",
    description: "A three-round website development challenge at MMMUT, Gorakhpur. 6 November 2026.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1E10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#0F1E10] text-[#FFF8E1] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
