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
            color: "#8b5cf6",
            bg: "rgba(139, 92, 246, 0.1)",
        },
        management: {
            badge: "badge-management",
            label: "Management",
            color: "#f59e0b",
            bg: "rgba(245, 158, 11, 0.1)",
        },
        cultural: {
            badge: "badge-cultural",
            label: "Cultural",
            color: "#ec4899",
            bg: "rgba(236, 72, 153, 0.1)",
        },
        sports: {
            badge: "badge-sports",
            label: "Sports",
            color: "#10b981",
            bg: "rgba(16, 185, 129, 0.1)",
        },
    };

    const config = categoryConfig[category];

    return (
        <Link href={href} className="block group">
            <article className="card h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-44 overflow-hidden bg-[#1c1c21]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-[#16161a]/40 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`badge ${config.badge}`}>
                            {config.label}
                        </span>
                    </div>

                    {/* Fee Tag */}
                    <div className="absolute top-3 right-3">
                        <span className="text-[11px] font-semibold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                            {fee}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    {/* Title */}
                    <h3 className="text-[16px] font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors leading-snug">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-zinc-500 mb-4 line-clamp-2 leading-relaxed flex-1">
                        {description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                            <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{date}</span>
                            <span className="text-zinc-700">•</span>
                            <span>{time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                            <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{teamSize}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.04] mb-4" />

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold"
                                style={{ backgroundColor: config.bg, color: config.color }}
                            >
                                {coordinator.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                            <span className="text-[12px] text-zinc-500 truncate max-w-[100px]">{coordinator}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-zinc-600 group-hover:text-orange-400 transition-colors">
                            <span className="font-medium">View</span>
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
