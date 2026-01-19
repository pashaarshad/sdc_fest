"use client";

import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection() {
    // Set fest date to 2 months from now
    const festDate = new Date();
    festDate.setMonth(festDate.getMonth() + 2);

    return (
        <section className="relative min-h-screen hero-bg flex items-center justify-center overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-8 animate-slide-up">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-gray-300">Registration Open Now</span>
                </div>

                {/* Main Title */}
                <h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    <span className="text-white">Welcome to</span>
                    <br />
                    <span className="text-gradient animate-gradient">SDC Fest 2026</span>
                </h1>

                {/* College Name */}
                <p
                    className="text-xl md:text-2xl text-gray-300 mb-4 animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                >
                    Shesha College Mysore
                </p>

                {/* Subtitle */}
                <p
                    className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                >
                    The biggest inter-college fest of the year! Join us for exciting competitions
                    in IT, Management, Cultural, and Sports events.
                </p>

                {/* Countdown Timer */}
                <div
                    className="mb-12 animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                >
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Event Starts In</p>
                    <CountdownTimer targetDate={festDate} />
                </div>

                {/* CTA Buttons */}
                <div
                    className="flex flex-wrap justify-center gap-4 animate-slide-up"
                    style={{ animationDelay: "0.5s" }}
                >
                    <Link href="#events" className="btn-primary text-lg px-8 py-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Explore Events
                    </Link>
                    <Link href="#register" className="btn-secondary text-lg px-8 py-4">
                        Register Now
                    </Link>
                </div>

                {/* Stats */}
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 animate-slide-up"
                    style={{ animationDelay: "0.6s" }}
                >
                    {[
                        { number: "15+", label: "Events" },
                        { number: "50+", label: "Colleges" },
                        { number: "5000+", label: "Participants" },
                        { number: "₹5L+", label: "Prize Pool" },
                    ].map((stat) => (
                        <div key={stat.label} className="glass-light rounded-2xl p-6">
                            <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.number}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
