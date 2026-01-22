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
        it: { label: "IT", badge: "bg-black/90 text-white border-white/20", color: "#3b82f6" },
        management: { label: "Management", badge: "bg-black/90 text-white border-white/20", color: "#a855f7" },
        cultural: { label: "Cultural", badge: "bg-black/90 text-white border-white/20", color: "#ec4899" },
        sports: { label: "Sports", badge: "bg-black/90 text-white border-white/20", color: "#22c55e" },
    };

    const config = categoryConfig[category];

    return (
        <Link href={href} className="block group h-full">
            <article className="h-full flex flex-col bg-[#0f0f13] border border-white/[0.08] rounded-xl overflow-hidden hover:border-[#d4a843]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,67,0.05)]">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center justify-center px-6 py-2 rounded-full text-xs font-bold border backdrop-blur-md tracking-widest uppercase ${config.badge}`}>
                            {config.label}
                        </span>
                    </div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d4a843] transition-colors leading-tight">
                        {title}
                    </h3>

                    {/* Kannada Title */}
                    {titleKannada && (
                        <h4 className="text-sm font-medium text-[#d4a843] mb-3">
                            {titleKannada}
                        </h4>
                    )}

                    {/* Description */}
                    <p className="text-sm text-zinc-400 mb-6 line-clamp-2 flex-grow">
                        {description}
                    </p>

                    {/* Divider */}
                    <div className="h-px w-full bg-white/[0.08] mb-6" />

                    {/* Meta Details */}
                    <div className="space-y-4">
                        {/* Team Size */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-[#1a1a20] text-zinc-400 shrink-0">
                                <Users className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Team Size</p>
                                <p className="text-sm text-zinc-300 font-medium">{teamSize}</p>
                            </div>
                        </div>

                        {/* Entry Fee */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-[#1a1a20] text-[#d4a843] shrink-0">
                                <IndianRupee className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Entry Fee</p>
                                <p className="text-sm text-white font-medium">{fee}</p>
                            </div>
                        </div>

                        {/* Coordinator */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-[#1a1a20] text-zinc-400 shrink-0">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Coordinator</p>
                                <div className="flex flex-col">
                                    <span className="text-sm text-zinc-300 font-medium">{coordinator}</span>
                                    {coordinatorPhone && (
                                        <span className="text-sm text-[#d4a843]">{coordinatorPhone}</span>
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
