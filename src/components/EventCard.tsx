"use client";

import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
    title: string;
    description: string;
    coordinator: string;
    category: "it" | "management" | "cultural" | "sports";
    href: string;
    time: string;
    image: string;
    teamSize: string;
    fee: string;
}

export default function EventCard({
    title,
    description,
    category,
    href,
    time,
    image,
    teamSize,
    fee,
}: EventCardProps) {
    const categoryConfig = {
        it: { label: "Tech", badge: "badge-tech", color: "#3b82f6" },
        management: { label: "Management", badge: "badge-management", color: "#d4a843" },
        cultural: { label: "Cultural", badge: "badge-cultural", color: "#ec4899" },
        sports: { label: "Sports", badge: "badge-sports", color: "#22c55e" },
    };

    const config = categoryConfig[category];

    return (
        <Link href={href} className="block group">
            <article className="card h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#1e1e24]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`badge ${config.badge}`}>
                            {config.label}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#d4a843] transition-colors">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-zinc-500 mb-4 line-clamp-2 flex-1">
                        {description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-[12px] text-zinc-500 pt-4 border-t border-white/[0.04]">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{teamSize}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#d4a843]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>{fee}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
