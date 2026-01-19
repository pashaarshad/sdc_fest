"use client";

import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
    title: string;
    description: string;
    coordinator: string;
    coordinatorRole: string;
    category: "it" | "management" | "cultural" | "sports";
    icon: React.ReactNode;
    href: string;
    date: string;
    time: string;
    venue: string;
    image: string;
}

export default function EventCard({
    title,
    description,
    coordinator,
    coordinatorRole,
    category,
    icon,
    href,
    date,
    time,
    venue,
    image,
}: EventCardProps) {
    const categoryStyles = {
        it: {
            badge: "badge-it",
            gradient: "from-indigo-500 to-purple-600",
            glow: "hover:shadow-indigo-500/30",
        },
        management: {
            badge: "badge-management",
            gradient: "from-amber-500 to-orange-600",
            glow: "hover:shadow-amber-500/30",
        },
        cultural: {
            badge: "badge-cultural",
            gradient: "from-pink-500 to-rose-600",
            glow: "hover:shadow-pink-500/30",
        },
        sports: {
            badge: "badge-sports",
            gradient: "from-emerald-500 to-green-600",
            glow: "hover:shadow-emerald-500/30",
        },
    };

    const styles = categoryStyles[category];

    return (
        <Link href={href}>
            <div
                className={`group relative bg-[#1a1a24] rounded-3xl overflow-hidden card-hover cursor-pointer hover:shadow-2xl ${styles.glow}`}
            >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${styles.gradient} opacity-60`}></div>
                    <div className="absolute top-4 left-4">
                        <span className={`category-badge ${styles.badge}`}>
                            {category.toUpperCase()}
                        </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 text-sm">
                            {icon}
                            <span className="font-semibold">{title}</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {description}
                    </p>

                    {/* Event Details */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {time}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {venue}
                        </div>
                    </div>

                    {/* Coordinator */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center`}>
                            <span className="text-white font-semibold text-sm">
                                {coordinator.split(" ").map((n) => n[0]).join("")}
                            </span>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">{coordinator}</p>
                            <p className="text-gray-500 text-xs">{coordinatorRole}</p>
                        </div>
                    </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
