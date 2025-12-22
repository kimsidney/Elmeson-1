import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import InfoSection from "@/components/home/InfoSection";
import MenuPreview from "@/components/home/MenuPreview";
import Location from "@/components/home/Location";
import { RestaurantSchema, BreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "El Meson de Pepe - Authentic Cuban Food | Key West Restaurant",
  description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984. Authentic Cuban cuisine, live Salsa music, and sunset celebrations.",
  openGraph: {
    title: "El Meson de Pepe - Authentic Cuban Food | Key West Restaurant",
    description: "Experience the authentic taste of Cuba at El Meson de Pepe in Mallory Square, Key West. Family owned and operated since 1984.",
    url: "https://www.elmeson.co",
    images: [
      {
        url: "/images/key-west-cuban-food.webp",
        width: 1200,
        height: 630,
        alt: "Authentic Cuban Food at El Meson de Pepe",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <RestaurantSchema />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }]} />
      <Hero />
      <InfoSection />
      <MenuPreview />
      <Location />
    </>
  );
}
