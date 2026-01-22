"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

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

    const categoryLinks = [
        { name: "IT Events", href: "/#it-events", color: "#8b5cf6", count: 4 },
        { name: "Management", href: "/#management-events", color: "#f59e0b", count: 5 },
        { name: "Cultural", href: "/#cultural-events", color: "#ec4899", count: 4 },
        { name: "Sports", href: "/#sports-events", color: "#10b981", count: 2 },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.04]"
                    : "bg-transparent"
                }`}
        >
            <nav className="container-main">
                <div className="flex items-center justify-between h-16 lg:h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow">
                            <span className="text-white font-bold text-[11px] tracking-tight">SDC</span>
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-white font-semibold text-[15px] tracking-tight">SHRESHTA 2026</p>
                            <p className="text-[11px] text-zinc-500 -mt-0.5">SDC Mysuru</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-[14px] text-zinc-400 hover:text-white transition-colors rounded-lg"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Categories Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <button className="px-4 py-2 text-[14px] text-zinc-400 hover:text-white transition-colors rounded-lg flex items-center gap-1.5">
                                Categories
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-[#16161a] border border-white/[0.06] rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-slide-down">
                                    <div className="p-2">
                                        {categoryLinks.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={cat.href}
                                                className="flex items-center justify-between px-3 py-2.5 text-[14px] text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: cat.color }}
                                                    />
                                                    {cat.name}
                                                </div>
                                                <span className="text-[12px] text-zinc-600 bg-white/[0.04] px-2 py-0.5 rounded-md">
                                                    {cat.count}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center">
                        <Link href="/#register" className="btn btn-primary text-[14px]">
                            Register Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 -mr-2 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-white/[0.04] py-4 animate-fade-in">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-2.5 text-[15px] text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-2 pb-1 px-3">
                                <p className="text-[11px] font-medium text-zinc-600 uppercase tracking-wider">Categories</p>
                            </div>
                            {categoryLinks.map((cat) => (
                                <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="flex items-center gap-2.5 px-3 py-2.5 text-[15px] text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                    {cat.name}
                                </Link>
                            ))}
                            <div className="pt-4 px-3">
                                <Link
                                    href="/#register"
                                    className="btn btn-primary w-full text-[14px]"
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
