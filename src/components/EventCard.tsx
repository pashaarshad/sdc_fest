"use client";

import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
    title: string;
    description: string;
    coordinator: string;
    category: "it" | "management" | "cultural" | "sports";
    href: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    teamSize: string;
    fee: string;
}

export default function EventCard({
    title,
    description,
    coordinator,
    category,
    href,
    date,
    time,
    venue,
    image,
    teamSize,
    fee,
}: EventCardProps) {
    const categoryConfig = {
        it: {
            badge: "badge-it",
            label: "IT",
            accent: "#8b5cf6",
        },
        management: {
            badge: "badge-management",
            label: "Management",
            accent: "#f59e0b",
        },
        cultural: {
            badge: "badge-cultural",
            label: "Cultural",
            accent: "#ec4899",
        },
        sports: {
            badge: "badge-sports",
            label: "Sports",
            accent: "#10b981",
        },
    };

    const config = categoryConfig[category];

    return (
        <Link href={href} className="block group">
            <article className="card overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c21] via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`badge ${config.badge}`}>
                            {config.label}
                        </span>
                    </div>

                    {/* Fee Badge */}
                    <div className="absolute top-3 right-3">
                        <span className="badge bg-black/60 backdrop-blur-sm text-white border border-white/10">
                            {fee}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                        {description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{date}</span>
                            <span className="text-zinc-700">•</span>
                            <span>{time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{teamSize}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                style={{ backgroundColor: config.accent + "30", color: config.accent }}
                            >
                                {coordinator.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="text-xs text-zinc-500">{coordinator}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-violet-400 transition-colors">
                            <span>View</span>
                            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
