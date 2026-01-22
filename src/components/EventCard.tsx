"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Phone, IndianRupee, ArrowUpRight } from "lucide-react";

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
    index?: number;
}

export default function EventCard({
    title,
    titleKannada,
    description,
    coordinator,
    coordinatorPhone,
    category,
    href,
    image,
    teamSize,
    fee,
    index = 0
}: EventCardProps) {
    const categoryLabels = {
        it: "IT",
        management: "Management",
        cultural: "Cultural",
        sports: "Sports",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative h-full"
        >
            <Link href={href} className="block h-full">
                <article className="h-full flex flex-col bg-[#0f0f13] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-[#d4a843]/30 group-hover:shadow-[0_0_40px_rgba(212,168,67,0.1)]">

                    {/* Image Section - PRESERVED AT TOP */}
                    <div className="relative h-52 overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority={index < 4}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f13] via-transparent to-black/20" />

                        {/* Category Badge */}
                        <div className="absolute top-5 left-5 flex items-center justify-between w-[calc(100%-40px)]">
                            <span className="bg-black/90 text-white text-[10px] font-bold px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md uppercase tracking-widest">
                                {categoryLabels[category]}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#d4a843]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <ArrowUpRight className="w-4 h-4 text-[#d4a843]" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-grow">
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#d4a843] transition-colors leading-tight">
                                {title}
                            </h3>
                            {titleKannada && (
                                <p className="text-sm text-[#d4a843]/80 font-medium">{titleKannada}</p>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-zinc-400 line-clamp-2 mb-6 leading-relaxed">
                            {description}
                        </p>

                        {/* Divider - Ensures text doesn't touch lines */}
                        <div className="h-px w-full bg-white/[0.06] mb-6" />

                        {/* Details - Professional Spacing & Alignment */}
                        <div className="space-y-4 mt-auto">
                            {/* Team Size */}
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-[#d4a843] transition-colors shrink-0">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Team Size</span>
                                    <span className="text-[14px] text-zinc-200 font-medium">{teamSize}</span>
                                </div>
                            </div>

                            {/* Entry Fee */}
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-[#d4a843] transition-colors shrink-0">
                                    <IndianRupee className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Entry Fee</span>
                                    <span className="text-[14px] text-white font-bold tracking-tight">{fee}</span>
                                </div>
                            </div>

                            {/* Coordinator */}
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-[#d4a843] transition-colors shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Coordinator</span>
                                    <div className="flex flex-col -gap-0.5">
                                        <span className="text-[14px] text-zinc-200 font-medium leading-tight">{coordinator}</span>
                                        {coordinatorPhone && (
                                            <span className="text-[12px] text-[#d4a843] font-medium leading-tight mt-0.5">{coordinatorPhone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div
                            className="absolute inset-0 animate-shimmer"
                            style={{
                                background: 'linear-gradient(105deg, transparent 40%, rgba(212,168,67,0.05) 45%, rgba(212,168,67,0.1) 50%, rgba(212,168,67,0.05) 55%, transparent 60%)',
                                transform: 'translateX(-100%)',
                            }}
                        />
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
