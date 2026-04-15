import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalAtmosphere } from "@/components/ui/GlobalAtmosphere";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eren Serdaroğlu — Full-Stack Developer",
  description:
    "Full-stack developer building products that feel as good as they work. Specializing in React, Next.js, TypeScript, and modern web experiences.",
  keywords: [
    "Eren Serdaroğlu",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Eren Serdaroğlu" }],
  creator: "Eren Serdaroğlu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eereenimo.github.io",
    title: "Eren Serdaroğlu — Full-Stack Developer",
    description:
      "Full-stack developer building products that feel as good as they work.",
    siteName: "Eren Serdaroğlu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eren Serdaroğlu — Full-Stack Developer",
    description:
      "Full-stack developer building products that feel as good as they work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-screen antialiased bg-transparent flex flex-col">
        <LanguageProvider>
          <GlobalAtmosphere />
          <Navbar />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
