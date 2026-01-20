"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/#events" },
        { name: "Schedule", href: "/#schedule" },
        { name: "Contact", href: "/#contact" },
    ];

    const eventLinks = [
        { name: "IT", href: "/#it-events" },
        { name: "Management", href: "/#management-events" },
        { name: "Cultural", href: "/#cultural-events" },
        { name: "Sports", href: "/#sports-events" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-[#09090b]/95 backdrop-blur-md border-b border-white/5"
                    : "bg-transparent"
                }`}
        >
            <nav className="container-main">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SDC</span>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-white font-semibold text-sm">SDC Fest 2026</p>
                            <p className="text-[11px] text-zinc-500">Shesha College Mysore</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Events Dropdown */}
                        <div className="relative group">
                            <button className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1">
                                Categories
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-48 bg-[#18181b] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-2">
                                    {eventLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                                        >
                                            {link.name} Events
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/#register"
                            className="btn btn-primary text-sm"
                        >
                            Register Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-white/5 py-4 animate-fade-in">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="px-4 py-2 text-xs font-medium text-zinc-600 uppercase tracking-wider">
                                Event Categories
                            </div>
                            {eventLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name} Events
                                </Link>
                            ))}
                            <div className="pt-4 px-4">
                                <Link
                                    href="/#register"
                                    className="btn btn-primary w-full"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
