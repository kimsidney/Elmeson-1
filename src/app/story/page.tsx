import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Story - Family Tradition & Cuban Heritage",
  description: "Learn about El Meson de Pepe's history, founded by Pepe Diaz in 1984. Discover our family's journey from Cuba to Key West and our commitment to authentic Cuban cuisine.",
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
  openGraph: {
    title: "Our Story - Family Tradition & Cuban Heritage | El Meson de Pepe",
    description: "Learn about El Meson de Pepe's history, founded by Pepe Diaz in 1984. Discover our family's journey from Cuba to Key West.",
    url: "https://www.elmesondepepe.com/story",
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "El Meson de Pepe - Our Story",
      },
    ],
  },
  alternates: {
    canonical: "/story",
  },
};

export default function StoryPage() {
    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Home", url: "/" },
                { name: "Our Story", url: "/story" },
            ]} />
            <div className="bg-white min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary font-serif mb-4">Our Story</h1>
                    <p className="text-gray-600 text-lg">Family Tradition & Cuban Heritage</p>
                    <div className="h-1 w-24 bg-secondary mx-auto mt-6" />
                </div>

                <div className="space-y-12">
                    <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/hero.webp"
                            alt="The Diaz Family"
                            fill
                            className="object-cover"
                            loading="lazy"
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 768px"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                            El Meson de Pepe's Chef/Owner, Pepe Diaz, a native of Cuba, has lived in Key West, Florida for many years.
                            His passion for the culinary arts has been a driving force in establishing El Meson de Pepe as a landmark
                            for authentic Cuban cuisine in the Florida Keys.
                        </p>
                        <p>
                            In 1984, the Diaz family opened their first restaurant, bringing with them the cherished recipes of their homeland.
                            Today, located right next to the Mallory Square Sunset Celebration, El Meson de Pepe continues to offer a
                            unique dining experience that celebrates the spirit of Havana.
                        </p>
                        <p>
                            We are dedicated to quality, authenticity, and the preservation of our Cuban heritage. From our famous Salsa bands
                            to our signature Mojitos, every detail is crafted to transport you to the vibrant streets of Cuba.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
