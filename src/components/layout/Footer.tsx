import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

// Custom TikTok icon component since lucide-react doesn't include it
const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 text-gray-800 py-12 lg:py-16" role="contentinfo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">

                    {/* Brand & Socials */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-primary tracking-wider font-serif mb-2">EL MESON DE PEPE</h3>
                            <p className="text-base text-gray-600 max-w-xs mx-auto md:mx-0 leading-relaxed">
                                Authentic Cuban food in the heart of Mallory Square. Preserving the legacy of Pepe Diaz and family since 1984.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="https://www.facebook.com/ElMesonKeyWest/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors p-2 -m-2 min-h-[44px] min-w-[44px] flex items-center justify-center transform hover:scale-110 duration-200" aria-label="Visit us on Facebook">
                                <Facebook size={24} aria-hidden="true" />
                            </Link>
                            <Link href="https://www.instagram.com/elmesondepepe/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors p-2 -m-2 min-h-[44px] min-w-[44px] flex items-center justify-center transform hover:scale-110 duration-200" aria-label="Visit us on Instagram">
                                <Instagram size={24} aria-hidden="true" />
                            </Link>
                            <Link href="https://www.linkedin.com/company/el-meson-de-pepe" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors p-2 -m-2 min-h-[44px] min-w-[44px] flex items-center justify-center transform hover:scale-110 duration-200" aria-label="Visit us on LinkedIn">
                                <Linkedin size={24} aria-hidden="true" />
                            </Link>
                            <Link href="https://www.tiktok.com/@elmesondepepe" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors p-2 -m-2 min-h-[44px] min-w-[44px] flex items-center justify-center transform hover:scale-110 duration-200" aria-label="Visit us on TikTok">
                                <TikTokIcon size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <h4 className="text-lg font-bold text-secondary uppercase tracking-widest border-b-2 border-primary/20 pb-1">Navigate</h4>
                        <div className="flex flex-col space-y-3 text-base text-gray-600 items-center md:items-start">
                            <Link href="/menu" className="hover:text-primary transition-colors py-1 min-h-[44px] flex items-center">Menu</Link>
                            <Link href="/story" className="hover:text-primary transition-colors py-1 min-h-[44px] flex items-center">Our Story</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors py-1 min-h-[44px] flex items-center">Make a Reservation</Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-start space-y-6 md:col-span-2 lg:col-span-1">
                        <h4 className="text-lg font-bold text-secondary uppercase tracking-widest border-b-2 border-primary/20 pb-1">Visit Us</h4>
                        <div className="space-y-4 text-base text-gray-600 w-full max-w-xs md:max-w-none">
                            <div className="flex items-start space-x-4 justify-center md:justify-start">
                                <MapPin size={22} className="mt-1 text-primary flex-shrink-0" />
                                <span className="text-center md:text-left">410 Wall Street, Mallory Square<br />Key West, FL 33040</span>
                            </div>
                            <div className="flex items-center space-x-4 justify-center md:justify-start">
                                <Phone size={22} className="text-primary flex-shrink-0" aria-hidden="true" />
                                <a href="tel:+13052952620" className="hover:text-primary transition-colors py-2 min-h-[44px] flex items-center" aria-label="Call us at 305-295-2620">
                                    305-295-2620
                                </a>
                            </div>
                            <div className="flex items-center space-x-4 justify-center md:justify-start">
                                <Mail size={22} className="text-primary flex-shrink-0" aria-hidden="true" />
                                <a href="mailto:info@elmesondepepe.com" className="hover:text-primary transition-colors py-2 min-h-[44px] flex items-center break-all" aria-label="Email us at info@elmesondepepe.com">
                                    info@elmesondepepe.com
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-16 border-t border-gray-300 pt-8 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} El Meson de Pepe. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
