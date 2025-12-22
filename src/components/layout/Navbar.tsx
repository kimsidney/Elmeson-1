"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    
    // Determine if navbar should be transparent (only on home page initially)
    // Default to transparent on home page until scroll is detected
    const isTransparent = pathname === "/" && !isScrolled;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

    // Keyboard navigation for desktop dropdowns
    const handleDropdownKeyDown = (e: React.KeyboardEvent, itemName: string, item: typeof NAV_ITEMS[0]) => {
        if (!item.dropdown) return;

        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                setDropdownOpen(dropdownOpen === itemName ? null : itemName);
                break;
            case "Escape":
                e.preventDefault();
                setDropdownOpen(null);
                (e.currentTarget as HTMLElement).focus();
                break;
            case "ArrowDown":
                e.preventDefault();
                if (dropdownOpen !== itemName) {
                    setDropdownOpen(itemName);
                } else {
                    const firstLink = dropdownRefs.current[itemName]?.querySelector("a") as HTMLElement;
                    firstLink?.focus();
                }
                break;
        }
    };

    // Keyboard navigation within dropdown menu
    const handleDropdownMenuKeyDown = (e: React.KeyboardEvent, itemName: string, index: number) => {
        const dropdown = NAV_ITEMS.find(item => item.name === itemName)?.dropdown;
        if (!dropdown) return;

        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setDropdownOpen(null);
                const button = document.querySelector(`button[aria-expanded="true"]`) as HTMLElement;
                button?.focus();
                break;
            case "ArrowDown":
                e.preventDefault();
                const nextIndex = index < dropdown.length - 1 ? index + 1 : 0;
                const nextLink = dropdownRefs.current[itemName]?.children[nextIndex]?.querySelector("a") as HTMLElement;
                nextLink?.focus();
                break;
            case "ArrowUp":
                e.preventDefault();
                const prevIndex = index > 0 ? index - 1 : dropdown.length - 1;
                const prevLink = dropdownRefs.current[itemName]?.children[prevIndex]?.querySelector("a") as HTMLElement;
                prevLink?.focus();
                break;
            case "Home":
                e.preventDefault();
                const firstLink = dropdownRefs.current[itemName]?.children[0]?.querySelector("a") as HTMLElement;
                firstLink?.focus();
                break;
            case "End":
                e.preventDefault();
                const lastLink = dropdownRefs.current[itemName]?.children[dropdown.length - 1]?.querySelector("a") as HTMLElement;
                lastLink?.focus();
                break;
        }
    };

    // Focus trap for mobile menu
    useEffect(() => {
        if (!isOpen) return;

        const mobileMenu = mobileMenuRef.current;
        if (!mobileMenu) return;

        const focusableElements = mobileMenu.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleTabKey);
        firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleTabKey);
        };
    }, [isOpen]);

    // Return focus to menu button when mobile menu closes
    useEffect(() => {
        if (!isOpen && menuButtonRef.current) {
            menuButtonRef.current.focus();
        }
    }, [isOpen]);

    // Close dropdowns on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Scroll detection for transparent navbar on home page
    useEffect(() => {
        // Only apply transparent navbar on home page
        if (pathname !== "/") {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const heroSection = document.querySelector('section[role="banner"]');
            
            if (heroSection) {
                const heroHeight = heroSection.getBoundingClientRect().height;
                // Add a small threshold (50px) to trigger transition slightly before leaving hero
                setIsScrolled(scrollY > heroHeight - 50);
            } else {
                // If hero section not found, check if we're at the top
                setIsScrolled(scrollY > 50);
            }
        };

        // Check initial scroll position immediately
        // Use a small delay to ensure DOM is ready
        const checkInitial = () => {
            if (window.scrollY === 0) {
                setIsScrolled(false);
            }
            handleScroll();
        };
        
        // Run immediately and after a short delay to catch any layout shifts
        checkInitial();
        const timeoutId = setTimeout(checkInitial, 100);

        // Debounce scroll events for better performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [pathname]);
    
    return (
        <nav 
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isTransparent 
                    ? "bg-black/50 backdrop-blur-md border-transparent" 
                    : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            }`} 
            role="navigation" 
            aria-label="Main navigation"
        >
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
                                                className={`transition-all duration-300 px-2 py-2 rounded-md text-xs font-medium uppercase tracking-wide flex items-center space-x-1 min-h-[44px] whitespace-nowrap ${
                                                    isTransparent 
                                                        ? "text-white hover:text-gray-200" 
                                                        : "text-gray-700 hover:text-primary"
                                                }`}
                                                style={isTransparent ? { color: 'white' } : undefined}
                                                aria-expanded={dropdownOpen === item.name}
                                                aria-haspopup="true"
                                                onKeyDown={(e) => handleDropdownKeyDown(e, item.name, item)}
                                            >
                                                <span className={`text-xs font-medium`} style={isTransparent ? { color: 'white' } : undefined}>{item.name}</span>
                                                <ChevronDown 
                                                    size={16} 
                                                    className="transition-colors duration-300"
                                                    style={isTransparent ? { color: 'white' } : { color: '#4B5563' }}
                                                    strokeWidth={2}
                                                    aria-hidden="true" 
                                                />
                                            </button>
                                            {dropdownOpen === item.name && (
                                                <div className="absolute left-0 top-full pt-2">
                                                    <div
                                                        ref={(el) => {
                                                            dropdownRefs.current[item.name] = el;
                                                        }}
                                                        className="w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                                                        role="menu"
                                                    >
                                                        {item.dropdown.map((subItem, index) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                role="menuitem"
                                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors min-h-[44px] flex items-center"
                                                                onKeyDown={(e) => handleDropdownMenuKeyDown(e, item.name, index)}
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
                                            className={`transition-all duration-300 px-2 py-2 rounded-md text-xs font-medium uppercase tracking-wide min-h-[44px] flex items-center whitespace-nowrap ${
                                                isTransparent 
                                                    ? "hover:text-gray-200" 
                                                    : "hover:text-primary"
                                            }`}
                                            style={isTransparent ? { color: 'white' } : { color: '#374151' }}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <Link 
                            href="https://www.facebook.com/ElMesonKeyWest/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`transition-all duration-300 p-2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                isTransparent 
                                    ? "hover:text-gray-200 hover:bg-white/10" 
                                    : "hover:text-primary hover:bg-gray-100"
                            }`}
                            style={isTransparent ? { color: 'white' } : { color: '#374151' }}
                            aria-label="Visit us on Facebook"
                        >
                            <Facebook size={24} strokeWidth={1.5} aria-hidden="true" />
                        </Link>
                        <Link 
                            href="https://www.instagram.com/elmesondepepe/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`transition-all duration-300 p-2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                isTransparent 
                                    ? "hover:text-gray-200 hover:bg-white/10" 
                                    : "hover:text-primary hover:bg-gray-100"
                            }`}
                            style={isTransparent ? { color: 'white' } : { color: '#374151' }}
                            aria-label="Visit us on Instagram"
                        >
                            <Instagram size={24} strokeWidth={1.5} aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            ref={menuButtonRef}
                            onClick={() => setIsOpen(!isOpen)}
                            className={`transition-all duration-300 p-3 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center ${
                                isTransparent 
                                    ? "hover:text-gray-200" 
                                    : "hover:text-primary"
                            }`}
                            style={isTransparent ? { color: 'white' } : { color: '#374151' }}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen ? (
                                <X size={26} strokeWidth={2} aria-hidden="true" />
                            ) : (
                                <Menu size={26} strokeWidth={2} aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    id="mobile-menu"
                    ref={mobileMenuRef}
                    className="lg:hidden bg-white border-b border-gray-200 h-[calc(100vh-80px)] overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Main navigation menu"
                >
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.name} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                {item.dropdown ? (
                                    <>
                                        <button
                                            onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Escape") {
                                                    setDropdownOpen(null);
                                                }
                                            }}
                                            className="text-gray-800 hover:text-primary w-full text-left px-4 py-4 rounded-md text-lg font-medium flex items-center justify-between min-h-[50px] active:bg-gray-50"
                                            aria-expanded={dropdownOpen === item.name}
                                            aria-haspopup="true"
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDown size={20} className={`transition-transform duration-200 ${dropdownOpen === item.name ? 'rotate-180' : ''}`} aria-hidden="true" />
                                        </button>
                                        {dropdownOpen === item.name && (
                                            <div className="pl-6 space-y-1 bg-gray-50/50 rounded-lg mb-2" role="menu">
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        role="menuitem"
                                                        className="text-gray-600 hover:text-primary block px-4 py-3 rounded-md text-base min-h-[44px] flex items-center"
                                                        onClick={() => setIsOpen(false)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Escape") {
                                                                setDropdownOpen(null);
                                                            }
                                                        }}
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
