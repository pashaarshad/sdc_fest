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
    index = 0,
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
            whileHover={{ y: -10 }}
            className="group relative h-full"
        >
            <Link href={href} className="block h-full">
                <article className="h-full flex flex-col bg-[#111115] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-[#d4a843]/40 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">

                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority={index < 4}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-black/30" />

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                            <span className="inline-flex items-center justify-center bg-black/80 text-white text-[10px] font-bold min-w-[72px] px-4 py-2.5 rounded-full border border-white/10 backdrop-blur-md uppercase tracking-widest">
                                {categoryLabels[category]}
                            </span>
                            <div className="w-9 h-9 rounded-full bg-[#d4a843] flex items-center justify-center text-black transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-10 py-12 flex flex-col flex-grow">

                        {/* Title */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#d4a843] transition-colors leading-tight tracking-tight">
                                {title}
                            </h3>
                            {titleKannada && (
                                <p className="text-[17px] font-medium text-[#d4a843]/90">
                                    {titleKannada}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-10">
                            <p className="text-[15px] text-zinc-400 leading-relaxed line-clamp-3">
                                {description}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-white/[0.05] mb-10" />

                        {/* Details */}
                        <div className="space-y-8 mt-auto">

                            {/* Team Size */}
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center text-[#d4a843] shrink-0">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-bold block mb-1">
                                        Team Size
                                    </span>
                                    <span className="text-[16px] text-zinc-100 font-semibold">
                                        {teamSize}
                                    </span>
                                </div>
                            </div>

                            {/* Entry Fee */}
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center text-[#d4a843] shrink-0">
                                    <IndianRupee className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-bold block mb-1">
                                        Entry Fee
                                    </span>
                                    <span className="text-[16px] text-white font-bold">
                                        {fee}
                                    </span>
                                </div>
                            </div>

                            {/* Coordinator */}
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center text-[#d4a843] shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[11px] text-zinc-500 uppercase tracking-[0.2em] font-bold block mb-1">
                                        Coordinator
                                    </span>
                                    <span className="text-[16px] text-zinc-100 font-semibold leading-tight">
                                        {coordinator}
                                    </span>
                                    {coordinatorPhone && (
                                        <span className="text-[14px] text-[#d4a843] font-bold mt-1 block tracking-wide">
                                            {coordinatorPhone}
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Hover Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d4a843]/20 rounded-2xl pointer-events-none transition-colors duration-500" />
                </article>
            </Link>
        </motion.div>
    );
}
