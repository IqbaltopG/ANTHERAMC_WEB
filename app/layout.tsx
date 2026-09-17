import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SeasonStrip } from "@/components/SeasonStrip";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} | Minecraft RPG Network`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.tagline,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  openGraph: {
    title: `${siteConfig.name} | Minecraft RPG Network`,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>
        <SeasonStrip />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
