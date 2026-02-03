"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Events", path: "/events" },
        { name: "Gallery", path: "/gallery" },
        { name: "Sponsors", path: "/sponsors" },
        { name: "UDAN", path: "/udan" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black">

            <div className="w-full container mx-auto px-4 md:px-15">
                <div className="flex items-center justify-between h-20 w-full">


                    <Link href="/" className="relative h-20 w-40 sm:w-40 md:w-60 shrink-0">
                        <Image
                            src="/AT.png"
                            alt="Technorion Antaragni Parakram 2026"
                            fill
                            className="object-contain object-left"
                            priority
                            style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))" }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`relative text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${pathname === link.path ? "text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                {pathname === link.path && (
                                    <motion.span
                                        layoutId=""
                                        className="absolute left-0 bottom-1 block h-0.5 w-full bg-white"
                                    />
                                )}
                            </Link>
                        ))}

                        <img className="h-10 w-auto ml-4 lg:h-13 lg:w-27" src="https://antaragni.co.in/assets/newlogo-CaJDsZv3.png" alt="College Logo" />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white focus:outline-none z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 md:hidden bg-black op z-40 flex flex-col opacity: 0.25;"
                    >
                        {/* Links in Mobile Menu */}
                        <div className="flex flex-col items-center justify-center grow space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-2xl font-bold uppercase tracking-tighter ${pathname === link.path ? "text-white" : "text-gray-500"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* FIX 4: Added the College Logo at the bottom of the mobile menu to match your image */}
                        <div className="p-10 flex justify-center border-t border-white/10">
                            <img
                                src="https://antaragni.co.in/assets/newlogo-CaJDsZv3.png"
                                alt="College Logo"
                                className="h-15 w-30 "
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
