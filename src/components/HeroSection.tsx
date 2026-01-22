"use client";

import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
    // Event date: February 18th, 2026 at 9:00 AM IST
    const festDate = new Date("2026-02-18T09:00:00+05:30");

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '64px 64px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container-main text-center py-32">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 bg-[#16161a] border border-white/[0.06] rounded-full px-5 py-2.5 mb-8 animate-fade-in">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[13px] text-zinc-300 font-medium">Registration Open</span>
                    <span className="w-px h-4 bg-white/10" />
                    <span className="text-[13px] text-zinc-500">February 18, 2026</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 animate-slide-up">
                    SDC Fest 2026
                </h1>

                {/* College Name */}
                <p
                    className="text-lg md:text-xl text-zinc-400 font-medium mb-4 animate-slide-up"
                    style={{ animationDelay: "0.05s" }}
                >
                    Shesha College Mysore
                </p>

                {/* Description */}
                <p
                    className="text-[15px] text-zinc-500 max-w-xl mx-auto mb-12 leading-relaxed animate-slide-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    The biggest inter-college fest bringing together students from across the region
                    for competitions in IT, Management, Cultural, and Sports.
                </p>

                {/* Countdown Timer */}
                <div
                    className="mb-12 animate-slide-up"
                    style={{ animationDelay: "0.15s" }}
                >
                    <p className="text-[11px] text-zinc-600 uppercase tracking-[0.2em] mb-5 font-medium">Event Begins In</p>
                    <CountdownTimer targetDate={festDate} />
                </div>

                {/* CTA Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                >
                    <Link href="#events" className="btn btn-primary px-7 py-3 text-[14px]">
                        Explore Events
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </Link>
                    <Link href="#register" className="btn btn-secondary px-7 py-3 text-[14px]">
                        Register Now
                    </Link>
                </div>

                {/* Stats Grid */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up"
                    style={{ animationDelay: "0.25s" }}
                >
                    {[
                        { value: "12+", label: "Events" },
                        { value: "50+", label: "Colleges" },
                        { value: "5000+", label: "Participants" },
                        { value: "₹5L+", label: "Prize Pool" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-[#16161a]/60 border border-white/[0.04] rounded-2xl p-5 hover:bg-[#1c1c21]/60 hover:border-white/[0.06] transition-all"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                            <div className="text-[13px] text-zinc-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex flex-col items-center gap-2 text-zinc-600">
                    <span className="text-[11px] uppercase tracking-[0.15em] font-medium">Scroll</span>
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
