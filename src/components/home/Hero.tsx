import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen h-[100svh] w-full flex items-center justify-center overflow-hidden" role="banner" aria-label="Welcome to El Meson de Pepe">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/key-west-cuban-food.webp"
                    alt="Authentic Cuban Food at El Meson de Pepe"
                    fill
                    className="object-cover"
                    priority
                    quality={80}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/70 via-black/20 to-black/80" aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 sm:px-4 max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider font-serif drop-shadow-lg">
                    <span className="block text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 font-sans tracking-widest uppercase">
                        Est. 1984
                    </span>
                    EL MESON DE PEPE
                </h1>

                <div className="h-1 w-20 sm:w-24 bg-primary mx-auto my-4 sm:my-6" />

                <p className="text-lg sm:text-xl md:text-3xl text-gray-100 font-light tracking-wide drop-shadow-md px-4">
                    Authentic <span className="text-accent font-semibold">CUBAN FOOD</span>
                    <br />
                    In Mallory Square, Key West
                </p>

                <div className="pt-6 sm:pt-8">
                    <Link
                        href="/menu"
                        className="inline-block bg-primary hover:bg-secondary text-white font-bold py-4 sm:py-5 px-12 sm:px-10 min-h-[44px] rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border-2 border-primary hover:border-secondary uppercase tracking-widest text-sm sm:text-base"
                    >
                        View Menu
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce" aria-label="Scroll down for more content">
                <ArrowDown className="text-white/80 w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
            </div>
        </section>
    );
}
