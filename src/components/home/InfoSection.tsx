import Image from "next/image";
import Link from "next/link";

export default function InfoSection() {
    return (
        <section className="py-16 md:py-24 bg-gray-50 text-gray-800 overflow-hidden" aria-label="About our authentic Cuban food">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 space-y-6 md:space-y-8 order-2 md:order-1">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary font-serif tracking-wide">
                                Authentic Cuban Food
                            </h2>
                            <div className="h-1 w-20 bg-secondary" />
                        </div>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                            For over 30 years, <span className="text-secondary font-semibold">El Meson de Pepe</span> has been dedicated to preserving the rich culinary heritage of Cuba. Located in the heart of Mallory Square, we bring you the flavors of Old Havana with our authentic recipes, passed down through generations of the Diaz family.
                        </p>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                            Join us for a sunset dinner, sip on our famous mojitos, and enjoy the rhythm of our live Salsa band every evening.
                        </p>
                        <div className="pt-4 md:pt-6">
                            <Link
                                href="/story"
                                className="inline-block text-primary hover:text-secondary font-bold uppercase tracking-widest border-b-2 border-primary hover:border-secondary transition-colors pb-1 py-3"
                            >
                                Read Our Story
                            </Link>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="flex-1 relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl md:skew-y-2 lg:skew-y-3 hover:skew-y-0 transition-all duration-500 ease-out order-1 md:order-2">
                        <Image
                            src="/images/food_intro.png"
                            alt="Authentic Cuban Cuisine"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                            quality={85}
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" aria-hidden="true" />
                    </div>

                </div>
            </div>
        </section>
    );
}
