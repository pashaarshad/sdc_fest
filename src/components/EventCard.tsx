"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Phone, IndianRupee, Users } from "lucide-react";

interface EventCardProps {
    title: string;
    titleKannada?: string;
    description: string;
    coordinator: string;
    coordinatorPhone?: string;
    category: "it" | "management" | "cultural" | "sports";
    href: string;
    time: string;
    image: string;
    teamSize: string;
    fee: string;
}

export default function EventCard({
    title,
    titleKannada,
    description,
    coordinator,
    coordinatorPhone,
    category,
    href,
    time,
    image,
    teamSize,
    fee,
}: EventCardProps) {
    const categoryConfig = {
        it: { label: "IT", badge: "bg-black/80 text-white border-white/10", color: "#3b82f6" },
        management: { label: "Management", badge: "bg-black/80 text-white border-white/10", color: "#a855f7" },
        cultural: { label: "Cultural", badge: "bg-black/80 text-white border-white/10", color: "#ec4899" },
        sports: { label: "Sports", badge: "bg-black/80 text-white border-white/10", color: "#22c55e" },
    };

    const config = categoryConfig[category];

    return (
        <Link href={href} className="block group h-full">
            <article className="h-full flex flex-col bg-[#0f0f13] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-[#d4a843]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                {/* Image Section - ALWAYS AT TOP */}
                <div className="relative h-52 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Dark overlay for better logo/text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-black/20" />

                    {/* Category Badge/Logo */}
                    <div className="absolute top-5 left-5">
                        <span className={`inline-flex items-center justify-center px-5 py-1.5 rounded-full text-[10px] uppercase font-bold border backdrop-blur-xl tracking-[0.15em] ${config.badge}`}>
                            {config.label}
                        </span>
                    </div>
                </div>

                <div className="p-9 flex flex-col flex-grow">
                    {/* Header Section */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#d4a843] transition-colors leading-tight">
                            {title}
                        </h3>

                        {titleKannada && (
                            <h4 className="text-base font-medium text-[#d4a843]/90">
                                {titleKannada}
                            </h4>
                        )}
                    </div>

                    {/* Description Section */}
                    <div className="mb-8">
                        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                            {description}
                        </p>
                    </div>

                    {/* Professional Divider - Ensures text doesn't touch the line */}
                    <div className="h-px w-full bg-white/[0.06] mb-8" />

                    {/* Meta Details List - Aligned like the screenshot */}
                    <div className="space-y-6 mt-auto">
                        {/* Team Size */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#16161a] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-[#d4a843] transition-colors shrink-0">
                                <Users className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Team Size</span>
                                <span className="text-[15px] text-zinc-200 font-medium">{teamSize}</span>
                            </div>
                        </div>

                        {/* Entry Fee */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#16161a] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-[#d4a843] transition-colors shrink-0">
                                <IndianRupee className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Entry Fee</span>
                                <span className="text-[15px] text-white font-bold">{fee}</span>
                            </div>
                        </div>

                        {/* Coordinator */}
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#16161a] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-[#d4a843] transition-colors shrink-0">
                                <Phone className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Coordinator</span>
                                <div className="flex flex-col -gap-0.5">
                                    <span className="text-[15px] text-zinc-200 font-medium leading-none mb-1">{coordinator}</span>
                                    {coordinatorPhone && (
                                        <span className="text-[13px] text-[#d4a843] font-medium leading-none">{coordinatorPhone}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
