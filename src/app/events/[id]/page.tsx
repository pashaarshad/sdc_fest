import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventById, allEvents, collegeInfo } from "@/data/events";

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
            title: "Event Not Found | SHRESHTA 2026",
        };
    }

    return {
        title: `${event.title} | SHRESHTA 2026 - SDC Mysuru`,
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
            <section className="relative h-[300px] md:h-[380px]">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-black/20" />

                {/* Back Button */}
                <div className="absolute top-0 left-0 right-0 pt-20 md:pt-24">
                    <div className="container-main">
                        <Link
                            href="/#events"
                            className="inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-white transition-colors group"
                        >
                            <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Events
                        </Link>
                    </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 pb-8">
                    <div className="container-main">
                        <span className={`badge ${config.badge} mb-4`}>
                            {config.label}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                            {event.title}
                        </h1>
                        {event.titleKannada && (
                            <p className="text-[14px] text-zinc-500 mb-2">{event.titleKannada}</p>
                        )}
                        <p className="text-[15px] text-zinc-400 max-w-2xl leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container-main py-10 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <div className="card-static p-6">
                            <h2 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                About This Event
                            </h2>
                            <p className="text-[14px] text-zinc-400 leading-relaxed">
                                {event.longDescription}
                            </p>
                        </div>

                        {/* Rules */}
                        <div className="card-static p-6">
                            <h2 className="text-[15px] font-semibold text-white mb-5 flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                Rules & Guidelines
                            </h2>
                            <ul className="space-y-3">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-500/10 text-orange-400 flex items-center justify-center text-[11px] font-semibold">
                                            {index + 1}
                                        </span>
                                        <span className="text-[14px] text-zinc-400 pt-0.5">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Important Notice */}
                        <div className="card-static p-6 border-orange-500/20 bg-orange-500/5">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-semibold text-orange-300 mb-1">Important</h3>
                                    <p className="text-[13px] text-orange-200/70">
                                        College ID is mandatory. Register on or before <strong>15th February 2026</strong>.
                                        Reporting time is <strong>8:30 AM</strong>. Judges decision will be final.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Event Details Card */}
                        <div className="card-static p-5 sticky top-24">
                            <h3 className="text-[13px] font-semibold text-white mb-5 uppercase tracking-wider">Event Details</h3>

                            <div className="space-y-4 mb-6">
                                {[
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
                                        label: "Date",
                                        value: event.date
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                                        label: "Time",
                                        value: event.time
                                    },
                                    {
                                        icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                                        label: "Venue",
                                        value: event.venue
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                                        label: "Team Size",
                                        value: event.teamSize
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                                        label: "Entry Fee",
                                        value: event.registrationFee
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {item.icon}
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] text-zinc-600 uppercase tracking-wide">{item.label}</p>
                                            <p className="text-[13px] text-white">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Register Button */}
                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="w-full btn text-[13px] py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            >
                                Register Now
                            </a>
                        </div>

                        {/* Coordinator Card */}
                        <div className="card-static p-5">
                            <h3 className="text-[13px] font-semibold text-white mb-4 uppercase tracking-wider">Coordinator</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[13px] font-semibold"
                                    style={{ backgroundColor: `${config.color}15`, color: config.color }}
                                >
                                    {event.coordinator.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <p className="text-[14px] text-white font-medium">{event.coordinator}</p>
                                    <p className="text-[12px] text-zinc-500">Event Coordinator</p>
                                </div>
                            </div>
                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="flex items-center gap-2.5 text-[14px] text-orange-400 hover:text-orange-300 transition-colors font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {event.coordinatorPhone}
                            </a>
                        </div>

                        {/* College Info Card */}
                        <div className="card-static p-5">
                            <h3 className="text-[13px] font-semibold text-white mb-4 uppercase tracking-wider">Venue</h3>
                            <p className="text-[13px] text-zinc-400 mb-2">{collegeInfo.name}</p>
                            <p className="text-[12px] text-zinc-600 mb-4">{collegeInfo.address}</p>
                            <a
                                href={collegeInfo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12px] text-orange-400 hover:text-orange-300 transition-colors"
                            >
                                Visit Website →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
