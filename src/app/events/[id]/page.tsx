import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEventById, allEvents, collegeInfo } from "@/data/events";

export function generateStaticParams() {
    return allEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        return { title: "Event Not Found | SHRESHTA 2026" };
    }

    return {
        title: `${event.title} | SHRESHTA 2026`,
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
        it: { label: "Tech", badge: "badge-tech", color: "#3b82f6" },
        management: { label: "Management", badge: "badge-management", color: "#d4a843" },
        cultural: { label: "Cultural", badge: "badge-cultural", color: "#ec4899" },
        sports: { label: "Sports", badge: "badge-sports", color: "#22c55e" },
    };

    const config = categoryConfig[event.category];

    return (
        <main className="min-h-screen bg-[#0a0a0c]">
            {/* Hero */}
            <section className="relative h-[350px] md:h-[420px]">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/70 to-black/30" />

                {/* Back Button */}
                <div className="absolute top-24 left-0 right-0">
                    <div className="container-main">
                        <Link
                            href="/#events"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Events
                        </Link>
                    </div>
                </div>

                {/* Desktop Logo Centered Vertically */}
                <div className="absolute inset-0 z-10 pointer-events-none hidden lg:flex items-center justify-end">
                    <div className="container-main w-full flex justify-end">
                        <div className="relative w-56 h-56 mr-12 shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm">
                            <Image
                                src={event.image}
                                alt="Event Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 pb-10 z-10">
                    <div className="container-main flex items-end justify-between">
                        <div>
                            <span className={`badge ${config.badge} mb-4`}>{config.label}</span>
                            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-3">
                                {event.title}
                            </h1>
                            <p className="text-zinc-400 max-w-2xl">{event.description}</p>
                        </div>

                        {/* Desktop Logo Removed from here */}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="container-main py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <div className="card-static p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#d4a843]/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-[#d4a843]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                About This Event
                            </h2>
                            <p className="text-zinc-400 leading-relaxed">{event.longDescription}</p>
                        </div>

                        {/* Rules */}
                        <div className="card-static p-6">
                            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#d4a843]/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-[#d4a843]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                Rules & Guidelines
                            </h2>
                            <ul className="space-y-3">
                                {event.rules.map((rule, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-md bg-[#d4a843]/10 text-[#d4a843] flex items-center justify-center text-xs font-semibold shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-zinc-400">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <div className="card-static p-6 sticky top-24">
                            <h3 className="text-sm font-semibold text-[#d4a843] uppercase tracking-wider mb-6">Event Details</h3>

                            <div className="space-y-5 mb-6">
                                {[
                                    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Date", value: event.date },
                                    { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Time", value: event.time },
                                    { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Venue", value: event.venue },
                                    { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Team Size", value: event.teamSize },
                                    { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", label: "Entry Fee", value: event.registrationFee },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-600 uppercase tracking-wide">{item.label}</p>
                                            <p className="text-white">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="btn btn-primary w-full"
                            >
                                Register Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Coordinator Card */}
                        <div className="card-static p-6">
                            <h3 className="text-sm font-semibold text-[#d4a843] uppercase tracking-wider mb-4">Coordinator</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold"
                                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                                >
                                    {event.coordinator.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{event.coordinator}</p>
                                    <p className="text-sm text-zinc-500">Event Coordinator</p>
                                </div>
                            </div>
                            <a
                                href={`tel:${event.coordinatorPhone}`}
                                className="flex items-center gap-2 text-[#d4a843] hover:text-[#e8c468] transition-colors font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {event.coordinatorPhone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
