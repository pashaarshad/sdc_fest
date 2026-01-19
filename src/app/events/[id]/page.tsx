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

    const categoryColors = {
        it: {
            badge: "badge-it",
            gradient: "from-indigo-500 to-purple-600",
            text: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/30",
        },
        management: {
            badge: "badge-management",
            gradient: "from-amber-500 to-orange-600",
            text: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/30",
        },
        cultural: {
            badge: "badge-cultural",
            gradient: "from-pink-500 to-rose-600",
            text: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/30",
        },
        sports: {
            badge: "badge-sports",
            gradient: "from-emerald-500 to-green-600",
            text: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/30",
        },
    };

    const styles = categoryColors[event.category];

    return (
        <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent`}></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} opacity-20`}></div>

                {/* Back Button */}
                <div className="absolute top-8 left-4 md:left-8 z-10">
                    <Link
                        href="/#events"
                        className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-white hover:bg-white/10 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Events
                    </Link>
                </div>

                {/* Event Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <span className={`category-badge ${styles.badge} mb-4 inline-block`}>
                            {event.category.toUpperCase()}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {event.title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            {event.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <div className="glass rounded-3xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center`}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                About This Event
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                {event.longDescription}
                            </p>
                        </div>

                        {/* Rules */}
                        <div className="glass rounded-3xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center`}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                Rules & Guidelines
                            </h2>
                            <ul className="space-y-3">
                                {event.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className={`flex-shrink-0 w-6 h-6 rounded-full ${styles.bg} ${styles.text} flex items-center justify-center text-sm font-medium`}>
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-300">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Prizes */}
                        <div className="glass rounded-3xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center`}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                                Prizes
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-500/30">
                                    <div className="text-4xl mb-2">🥇</div>
                                    <div className="text-amber-400 font-semibold">1st Place</div>
                                    <div className="text-2xl font-bold text-white mt-1">{event.prizes.first}</div>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-gray-400/20 to-transparent border border-gray-400/30">
                                    <div className="text-4xl mb-2">🥈</div>
                                    <div className="text-gray-400 font-semibold">2nd Place</div>
                                    <div className="text-2xl font-bold text-white mt-1">{event.prizes.second}</div>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-orange-600/20 to-transparent border border-orange-600/30">
                                    <div className="text-4xl mb-2">🥉</div>
                                    <div className="text-orange-400 font-semibold">3rd Place</div>
                                    <div className="text-2xl font-bold text-white mt-1">{event.prizes.third}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info Card */}
                        <div className={`glass rounded-3xl p-6 border ${styles.border}`}>
                            <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center`}>
                                        <svg className={`w-5 h-5 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Date</p>
                                        <p className="text-white font-medium">{event.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center`}>
                                        <svg className={`w-5 h-5 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Time</p>
                                        <p className="text-white font-medium">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center`}>
                                        <svg className={`w-5 h-5 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Venue</p>
                                        <p className="text-white font-medium">{event.venue}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center`}>
                                        <svg className={`w-5 h-5 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Team Size</p>
                                        <p className="text-white font-medium">{event.teamSize}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${styles.bg} flex items-center justify-center`}>
                                        <svg className={`w-5 h-5 ${styles.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Registration Fee</p>
                                        <p className="text-white font-medium">{event.registrationFee}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Register Button */}
                            <button className={`w-full mt-6 btn-primary justify-center bg-gradient-to-r ${styles.gradient}`}>
                                Register Now
                            </button>
                        </div>

                        {/* Coordinator Card */}
                        <div className="glass rounded-3xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Event Coordinator</h3>
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center`}>
                                    <span className="text-white font-bold text-lg">
                                        {event.coordinator.split(" ").map((n) => n[0]).join("")}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">{event.coordinator}</p>
                                    <p className="text-gray-400 text-sm">{event.coordinatorRole}</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <a
                                    href={`tel:${event.coordinatorPhone}`}
                                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="text-sm">{event.coordinatorPhone}</span>
                                </a>
                                <a
                                    href={`mailto:${event.coordinatorEmail}`}
                                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm">{event.coordinatorEmail}</span>
                                </a>
                            </div>
                        </div>

                        {/* Share Card */}
                        <div className="glass rounded-3xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Share Event</h3>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </button>
                                <button className="flex-1 py-3 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors">
                                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                    </svg>
                                </button>
                                <button className="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </button>
                                <button className="flex-1 py-3 rounded-xl bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-colors">
                                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
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
