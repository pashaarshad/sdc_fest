"use client";

import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
    // Event date: February 18th, 2026
    const festDate = new Date("2026-02-18T09:00:00");

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b]">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.08)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.05)_0%,_transparent_50%)]" />
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container-main text-center pt-24 pb-16">
                {/* Event Badge */}
                <div className="inline-flex items-center gap-2 bg-[#18181b] border border-white/5 rounded-full px-4 py-2 mb-8 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-zinc-400">Registration Open</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-sm text-zinc-400">February 18, 2026</span>
                </div>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 animate-slide-up">
                    SDC Fest 2026
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-zinc-400 mb-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    Shesha College Mysore
                </p>

                {/* Description */}
                <p className="text-zinc-500 max-w-xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    The biggest inter-college fest bringing together students from across the region
                    for competitions in IT, Management, Cultural, and Sports.
                </p>

                {/* Countdown */}
                <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Event Begins In</p>
                    <CountdownTimer targetDate={festDate} />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    <Link href="#events" className="btn btn-primary px-8">
                        Explore Events
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Link>
                    <Link href="#register" className="btn btn-secondary px-8">
                        Register Now
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.5s" }}>
                    {[
                        { value: "12+", label: "Events" },
                        { value: "50+", label: "Colleges" },
                        { value: "5000+", label: "Participants" },
                        { value: "₹5L+", label: "Prize Pool" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#18181b]/50 border border-white/5 rounded-xl p-4 md:p-5">
                            <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs md:text-sm text-zinc-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in">
                <div className="flex flex-col items-center gap-2 text-zinc-600">
                    <span className="text-xs uppercase tracking-wider">Scroll</span>
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
