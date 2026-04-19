import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BootScreen from "@/components/ui/BootScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GlobalHUD from "@/components/ui/GlobalHUD";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sahil Sharma — IoT Engineer & Full-Stack Developer",
  description:
    "Personal portfolio of Sahil Sharma — B.Tech ECE student specializing in IoT, embedded systems, flexible sensor research, and full-stack development. Google Student Ambassador 2026.",
  keywords: ["Sahil Sharma", "IoT", "Embedded Systems", "Full Stack Developer", "ESP32", "Portfolio"],
  openGraph: {
    title: "Sahil Sharma — Cosmic Portfolio",
    description: "Navigating the star system of engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ background: '#030014', color: '#e2e8f0' }}
      >
        <BootScreen />
        <GlobalHUD />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
