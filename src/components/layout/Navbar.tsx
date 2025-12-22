"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Facebook, Instagram, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    {
        name: "Our Story",
        href: "/story",
        dropdown: [
            { name: "Restaurant", href: "/story" },
            { name: "History of Key West and Cuba", href: "/story/history" },
            { name: "Pepe's Key West Blog", href: "/story/blog" },
        ]
    },
    { name: "Private Parties", href: "/parties" },
    { name: "Sunset Celebration", href: "/sunset" },
    { name: "Patio Bar", href: "/patio" },
    { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (itemName: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setDropdownOpen(itemName);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdownOpen(null);
        }, 200); // 200ms delay before closing
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" role="navigation" aria-label="Main navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center" aria-label="El Meson de Pepe Home">
                            <Image
                                src="/images/el-meson-de-pepe-key-west-logo.webp"
                                alt="El Meson de Pepe"
                                width={180}
                                height={60}
                                className="h-10 sm:h-12 w-auto"
                                priority
                                quality={90}
                                sizes="(max-width: 640px) 120px, 180px"
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-4 xl:space-x-5 flex-nowrap">
                            {NAV_ITEMS.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.dropdown ? (
                                        <>
                                            <button
                                                className="text-gray-700 hover:text-primary transition-colors duration-200 px-2 py-2 rounded-md text-xs font-medium uppercase tracking-wide flex items-center space-x-1 min-h-[44px] whitespace-nowrap"
                                                aria-expanded={dropdownOpen === item.name}
                                                aria-haspopup="true"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown size={16} aria-hidden="true" />
                                            </button>
                                            {dropdownOpen === item.name && (
                                                <div className="absolute left-0 top-full pt-2">
                                                    <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                                                        {item.dropdown.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors min-h-[44px] flex items-center"
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-gray-700 hover:text-primary transition-colors duration-200 px-2 py-2 rounded-md text-xs font-medium uppercase tracking-wide min-h-[44px] flex items-center whitespace-nowrap"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link href="https://www.facebook.com/ElMesonKeyWest/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Visit us on Facebook">
                            <Facebook size={20} aria-hidden="true" />
                        </Link>
                        <Link href="https://www.instagram.com/elmesondepepe/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Visit us on Instagram">
                            <Instagram size={20} aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-primary p-3 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.name} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                {item.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                                            className="text-gray-800 hover:text-primary w-full text-left px-4 py-4 rounded-md text-lg font-medium flex items-center justify-between min-h-[50px] active:bg-gray-50"
                                            aria-expanded={dropdownOpen === item.name}
                                            aria-haspopup="true"
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDown size={20} className={`transition-transform duration-200 ${dropdownOpen === item.name ? 'rotate-180' : ''}`} aria-hidden="true" />
                                        </button>
                                        {dropdownOpen === item.name && (
                                            <div className="pl-6 space-y-1 bg-gray-50/50 rounded-lg mb-2">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="text-gray-600 hover:text-primary block px-4 py-3 rounded-md text-base min-h-[44px] flex items-center"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-gray-800 hover:text-primary block px-4 py-4 rounded-md text-lg font-medium min-h-[50px] flex items-center active:bg-gray-50"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-center space-x-8 pt-8 pb-8">
                            <Link href="https://www.facebook.com/ElMesonKeyWest/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary p-3 bg-gray-100 rounded-full" aria-label="Visit us on Facebook">
                                <Facebook size={28} aria-hidden="true" />
                            </Link>
                            <Link href="https://www.instagram.com/elmesondepepe/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary p-3 bg-gray-100 rounded-full" aria-label="Visit us on Instagram">
                                <Instagram size={28} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
