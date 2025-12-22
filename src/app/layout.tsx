import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: {
    default: "El Meson de Pepe - Authentic Cuban Food | Key West Restaurant",
    template: "%s | El Meson de Pepe",
  },
  description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984. Authentic Cuban cuisine, live Salsa music, and sunset celebrations.",
  keywords: ["Cuban food", "Key West restaurant", "Mallory Square", "authentic Cuban cuisine", "Key West dining", "Cuban restaurant", "El Meson de Pepe", "Key West Cuban food"],
  authors: [{ name: "El Meson de Pepe" }],
  creator: "El Meson de Pepe",
  publisher: "El Meson de Pepe",
  metadataBase: new URL("https://www.elmeson.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.elmeson.co",
    siteName: "El Meson de Pepe",
    title: "El Meson de Pepe - Authentic Cuban Food | Key West Restaurant",
    description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984.",
    images: [
      {
        url: "/images/el-meson-de-pepe-key-west-logo.webp",
        width: 1200,
        height: 630,
        alt: "El Meson de Pepe - Authentic Cuban Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Meson de Pepe - Authentic Cuban Food | Key West Restaurant",
    description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984.",
    images: ["/images/el-meson-de-pepe-key-west-logo.webp"],
    creator: "@elmesondepepe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-verification-code",
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OrganizationSchema } from "@/lib/schema";

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
        <OrganizationSchema />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" aria-label="Main content">{children}</main>
        <Footer />
        <Script
          id="sa-dynamic-optimization"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var script = document.createElement("script");script.setAttribute("nowprocket", "");script.setAttribute("nitro-exclude", "");script.src = "https://seo.ymbs.pro/scripts/dynamic_optimization.js";script.dataset.uuid = "f1f7b153-6650-4384-b863-b4f3c9330d09";script.id = "sa-dynamic-optimization-loader";document.head.appendChild(script);`,
          }}
        />
      </body>
    </html>
  );
}
