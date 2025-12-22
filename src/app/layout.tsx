import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "El Meson de Pepe - Authentic Cuban Food",
  description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984.",
  metadataBase: new URL("https://www.elmeson.co"),
  openGraph: {
    title: "El Meson de Pepe - Authentic Cuban Food",
    description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984.",
    type: "website",
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" aria-label="Main content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
