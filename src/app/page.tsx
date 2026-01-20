import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import { itEvents, managementEvents, culturalEvents, sportsEvents, Event } from "@/data/events";
import Link from "next/link";

// Category configuration
const categories = [
  {
    id: "it-events",
    title: "IT Events",
    subtitle: "Showcase your technical skills in gaming, coding, design, and problem-solving competitions.",
    events: itEvents,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "#8b5cf6",
  },
  {
    id: "management-events",
    title: "Management Events",
    subtitle: "Demonstrate your leadership, strategy, and business acumen in challenging scenarios.",
    events: managementEvents,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: "#f59e0b",
  },
  {
    id: "cultural-events",
    title: "Cultural Events",
    subtitle: "Express your creativity and talent through music, dance, and fashion.",
    events: culturalEvents,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    color: "#ec4899",
  },
  {
    id: "sports-events",
    title: "Sports Events",
    subtitle: "Compete in athletic events and represent your college with pride.",
    events: sportsEvents,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "#10b981",
  },
];

// Event Section Component
function EventSection({
  id,
  title,
  subtitle,
  events,
  icon,
  color
}: {
  id: string;
  title: string;
  subtitle: string;
  events: Event[];
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <section id={id} className="section">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: color + "20", color: color }}
              >
                {icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            </div>
            <p className="text-zinc-500 max-w-lg">{subtitle}</p>
          </div>
          <Link
            href={`/#${id}`}
            className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Events Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${events.length > 2 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-2 max-w-3xl'} gap-5`}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              coordinator={event.coordinator}
              category={event.category}
              href={`/events/${event.id}`}
              date={event.date}
              time={event.time}
              venue={event.venue}
              image={event.image}
              teamSize={event.teamSize}
              fee={event.registrationFee}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Category Navigation */}
      <section id="events" className="bg-[#0f0f12] border-y border-white/5 py-6">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#18181b] hover:bg-[#27272a] border border-white/5 hover:border-white/10 rounded-lg transition-all text-sm"
              >
                <span style={{ color: cat.color }}>{cat.icon}</span>
                <span className="text-zinc-400">{cat.title}</span>
                <span className="text-xs text-zinc-600 bg-[#27272a] px-2 py-0.5 rounded">
                  {cat.events.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Event Sections */}
      <div className="bg-[#09090b]">
        {categories.map((category, index) => (
          <div key={category.id} className={index % 2 === 0 ? "bg-[#09090b]" : "bg-[#0c0c0f]"}>
            <EventSection
              id={category.id}
              title={category.title}
              subtitle={category.subtitle}
              events={category.events}
              icon={category.icon}
              color={category.color}
            />
          </div>
        ))}
      </div>

      {/* Schedule Section */}
      <section id="schedule" className="section bg-[#0f0f12]">
        <div className="container-main">
          <div className="section-header">
            <h2 className="section-title">Event Schedule</h2>
            <p className="section-subtitle">
              Two days of exciting competitions and unforgettable moments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Day 1 */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <span className="text-violet-400 font-bold">18</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Day 1</h3>
                  <p className="text-sm text-zinc-500">February 18, 2026</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { time: "09:00 AM", event: "Inauguration Ceremony", location: "Main Stage" },
                  { time: "10:00 AM", event: "IT & Management Events Begin", location: "Various Venues" },
                  { time: "02:00 PM", event: "Tech Treasure Hunt", location: "Campus Wide" },
                  { time: "04:00 PM", event: "Solo Singing", location: "Open Air Theatre" },
                  { time: "06:00 PM", event: "Ramp Walk", location: "Main Stage" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-xs text-zinc-500 w-20 shrink-0 pt-0.5">{item.time}</div>
                    <div>
                      <p className="text-sm text-white">{item.event}</p>
                      <p className="text-xs text-zinc-600">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <span className="text-indigo-400 font-bold">19</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Day 2</h3>
                  <p className="text-sm text-zinc-500">February 19, 2026</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { time: "08:00 AM", event: "Cricket Tournament", location: "College Ground" },
                  { time: "09:00 AM", event: "Logic Overload Finals", location: "Computer Lab 2" },
                  { time: "02:00 PM", event: "Brand Building Presentations", location: "Auditorium" },
                  { time: "04:00 PM", event: "Solo Dance Competition", location: "Main Stage" },
                  { time: "07:00 PM", event: "Prize Distribution & Closing", location: "Main Stage" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-xs text-zinc-500 w-20 shrink-0 pt-0.5">{item.time}</div>
                    <div>
                      <p className="text-sm text-white">{item.event}</p>
                      <p className="text-xs text-zinc-600">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section id="register" className="section bg-[#09090b]">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600/20 via-[#18181b] to-indigo-600/20 border border-white/5 p-8 md:p-12">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Participate?
              </h2>
              <p className="text-zinc-400 mb-8">
                Don&apos;t miss out on the biggest inter-college fest of the year.
                Register now and showcase your talent at SDC Fest 2026!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="#events" className="btn btn-primary px-8">
                  Browse Events
                </Link>
                <a href="mailto:sdcfest@shesha.edu.in" className="btn btn-secondary px-8">
                  Contact Organizers
                </a>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Event Date</h3>
              <p className="text-sm text-zinc-500">February 18-19, 2026</p>
            </div>
            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Venue</h3>
              <p className="text-sm text-zinc-500">Shesha College, Mysore</p>
            </div>
            <div className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Need Help?</h3>
              <p className="text-sm text-zinc-500">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
