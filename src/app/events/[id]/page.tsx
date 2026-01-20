import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventById, allEvents } from "@/data/events";

// Generate static params for all events
export function generateStaticParams() {
    return allEvents.map((event) => ({
        id: event.id,
    }));
}

// Generate metadata for each event page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        return {
            title: "Event Not Found | SDC Fest 2026",
        };
    }

    return {
        title: `${event.title} | SDC Fest 2026`,
        description: event.description,
    };
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    const categoryConfig = {
        it: { label: "IT", color: "#8b5cf6", badge: "badge-it" },
        management: { label: "Management", color: "#f59e0b", badge: "badge-management" },
        cultural: { label: "Cultural", color: "#ec4899", badge: "badge-cultural" },
        sports: { label: "Sports", color: "#10b981", badge: "badge-sports" },
    };

    const config = categoryConfig[event.category];

    return (
        <main className="min-h-screen bg-[#09090b]">
            {/* Hero Section */}
            <section className="relative h-[320px] md:h-[400px]">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-black/30" />

                {/* Navigation */}
                <div className="absolute top-0 left-0 right-0 pt-20 md:pt-24">
                    <div className="container-main">
                        <Link
                            href="/#events"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Events
                        </Link>
                    </div>
                </div>

                {/* Title Section */}
                <div className="absolute bottom-0 left-0 right-0 pb-8">
                    <div className="container-main">
                        <span className={`badge ${config.badge} mb-3`}>
                            {config.label}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                            {event.title}
                        </h1>
                        <p className="text-zinc-400 max-w-2xl">
                            {event.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container-main py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <div className="card p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                About This Event
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">
                                {event.longDescription}
                            </p>
                        </div>

                        {/* Rules */}
                        <div className="card p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                Rules & Guidelines
                            </h2>
                            <ul className="space-y-3">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-[#27272a] text-zinc-500 flex items-center justify-center text-xs font-medium">
                                            {index + 1}
                                        </span>
                                        <span className="text-zinc-400 text-sm">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Prizes */}
                        <div className="card p-6">
                            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                                Prize Pool
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20">
                                    <div className="text-2xl mb-2">🥇</div>
                                    <div className="text-xs text-amber-400 font-medium mb-1">1st Place</div>
                                    <div className="text-xl font-bold text-white">{event.prizes.first}</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-gradient-to-b from-zinc-400/10 to-transparent border border-zinc-400/20">
                                    <div className="text-2xl mb-2">🥈</div>
                                    <div className="text-xs text-zinc-400 font-medium mb-1">2nd Place</div>
                                    <div className="text-xl font-bold text-white">{event.prizes.second}</div>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20">
                                    <div className="text-2xl mb-2">🥉</div>
                                    <div className="text-xs text-orange-400 font-medium mb-1">3rd Place</div>
                                    <div className="text-xl font-bold text-white">{event.prizes.third}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Event Details Card */}
                        <div className="card p-6 sticky top-24">
                            <h3 className="text-sm font-semibold text-white mb-4">Event Details</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Date</p>
                                        <p className="text-sm text-white">{event.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Time</p>
                                        <p className="text-sm text-white">{event.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Venue</p>
                                        <p className="text-sm text-white">{event.venue}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Team Size</p>
                                        <p className="text-sm text-white">{event.teamSize}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Registration Fee</p>
                                        <p className="text-sm text-white">{event.registrationFee}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Register Button */}
                            <button
                                className="w-full btn text-sm"
                                style={{ backgroundColor: config.color }}
                            >
                                Register for Event
                            </button>
                        </div>

                        {/* Coordinator Card */}
                        <div className="card p-6">
                            <h3 className="text-sm font-semibold text-white mb-4">Event Coordinator</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium"
                                    style={{ backgroundColor: config.color + "20", color: config.color }}
                                >
                                    {event.coordinator.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{event.coordinator}</p>
                                    <p className="text-xs text-zinc-500">{event.coordinatorRole}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <a
                                    href={`tel:${event.coordinatorPhone}`}
                                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {event.coordinatorPhone}
                                </a>
                                <a
                                    href={`mailto:${event.coordinatorEmail}`}
                                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {event.coordinatorEmail}
                                </a>
                            </div>
                        </div>

                        {/* Share Card */}
                        <div className="card p-6">
                            <h3 className="text-sm font-semibold text-white mb-4">Share Event</h3>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 hover:text-white transition-colors" aria-label="Share on Twitter">
                                    <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </button>
                                <button className="flex-1 py-2.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 hover:text-white transition-colors" aria-label="Share on LinkedIn">
                                    <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </button>
                                <button className="flex-1 py-2.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 hover:text-white transition-colors" aria-label="Share on WhatsApp">
                                    <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </button>
                                <button className="flex-1 py-2.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-zinc-400 hover:text-white transition-colors" aria-label="Copy link">
                                    <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
