"use client";

import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
    // Event date: 17th February 2026, 8:30 AM IST
    const festDate = new Date("2026-02-17T08:30:00+05:30");

    return (
        <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4a843]/5 rounded-full blur-[120px]" />

            {/* Content */}
            <div className="relative z-10 container-main text-center pt-24 pb-16">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#d4a843]/10 border border-[#d4a843]/30 rounded-full px-5 py-2 mb-10 animate-fade-in">
                    <svg className="w-4 h-4 text-[#d4a843]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-[13px] text-[#d4a843] font-medium">SDC Mysuru Annual Fest</span>
                </div>

                {/* Main Title */}
                <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 animate-slide-up">
                    <span className="text-white">SHRESHTA</span>
                    <span className="text-gold-gradient ml-4">2026</span>
                </h1>

                {/* Description */}
                <p
                    className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 animate-slide-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    Experience the grandest intercollegiate fest featuring competitions in
                    <br className="hidden md:block" />
                    Technology, Management, Sports & Culture.
                </p>

                {/* Date & Location */}
                <div
                    className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-slide-up"
                    style={{ animationDelay: "0.15s" }}
                >
                    <div className="flex items-center gap-2 text-zinc-400">
                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>February 17, 2026</span>
                    </div>
                    <div className="w-1 h-1 bg-zinc-600 rounded-full hidden md:block" />
                    <div className="flex items-center gap-2 text-zinc-400">
                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>SDC Mysuru</span>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="mb-14 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <CountdownTimer targetDate={festDate} />
                </div>

                {/* Stats */}
                <div
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-slide-up"
                    style={{ animationDelay: "0.25s" }}
                >
                    {[
                        { value: "15+", label: "Events" },
                        { value: "50+", label: "Colleges" },
                        { value: "1000+", label: "Participants" },
                        { value: "₹50K+", label: "Prize Pool" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-gold-gradient">{stat.value}</div>
                            <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <Link href="#events" className="flex flex-col items-center gap-2 text-zinc-600 hover:text-[#d4a843] transition-colors">
                    <span className="text-xs uppercase tracking-widest">Explore</span>
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
