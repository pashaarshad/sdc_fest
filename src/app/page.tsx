import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import { itEvents, managementEvents, culturalEvents, sportsEvents, Event, collegeInfo, facultyCoordinators, studentCouncil } from "@/data/events";
import Link from "next/link";

// Category configuration
const categories = [
  {
    id: "it-events",
    title: "IT Events",
    subtitle: "Showcase your technical skills in gaming, coding, and design competitions.",
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
    subtitle: "Demonstrate your leadership, strategy, and business acumen.",
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
    subtitle: "Express your creativity through music, dance, and art.",
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
  color,
  isAlt
}: {
  id: string;
  title: string;
  subtitle: string;
  events: Event[];
  icon: React.ReactNode;
  color: string;
  isAlt: boolean;
}) {
  return (
    <section id={id} className={`section ${isAlt ? 'bg-[#0c0c0e]' : 'bg-[#09090b]'}`}>
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="section-header mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color}15`, color: color }}
              >
                {icon}
              </div>
              <h2 className="section-title mb-0">{title}</h2>
            </div>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid-events">
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

      {/* Category Quick Nav */}
      <section id="events" className="bg-[#0c0c0e] border-y border-white/[0.04] py-5">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-[#16161a] hover:bg-[#1c1c21] border border-white/[0.04] hover:border-white/[0.08] rounded-xl transition-all text-[13px] group"
              >
                <span style={{ color: cat.color }} className="opacity-80 group-hover:opacity-100 transition-opacity">{cat.icon}</span>
                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{cat.title}</span>
                <span className="text-[11px] text-zinc-600 bg-white/[0.04] px-2 py-0.5 rounded-md font-medium">
                  {cat.events.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Event Sections */}
      {categories.map((category, index) => (
        <EventSection
          key={category.id}
          id={category.id}
          title={category.title}
          subtitle={category.subtitle}
          events={category.events}
          icon={category.icon}
          color={category.color}
          isAlt={index % 2 === 1}
        />
      ))}

      {/* Schedule & Guidelines Section */}
      <section id="schedule" className="section bg-[#0c0c0e]">
        <div className="container-main">
          <div className="section-header text-center">
            <h2 className="section-title">Event Day Schedule</h2>
            <p className="section-subtitle mx-auto">
              All events on 17th February 2026 (Tuesday) • Reporting Time: 8:30 AM
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Schedule */}
            <div className="card-static p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-lg">17</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[15px]">Event Day</h3>
                  <p className="text-[13px] text-zinc-500">February 17, 2026 • Tuesday</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { time: "8:30 AM", event: "Registration & Reporting", location: "Main Gate" },
                  { time: "9:00 AM", event: "Inauguration Ceremony", location: "Main Stage" },
                  { time: "9:30 AM", event: "IT & Management Events Begin", location: "Various Venues" },
                  { time: "10:00 AM", event: "Cultural Events Begin", location: "Main Stage" },
                  { time: "11:00 AM", event: "Sports Events Begin", location: "College Ground" },
                  { time: "4:00 PM", event: "Finals & Competitions", location: "Various Venues" },
                  { time: "6:00 PM", event: "Prize Distribution & Valedictory", location: "Main Stage" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="text-[12px] text-zinc-600 w-20 shrink-0 pt-0.5 font-medium">{item.time}</div>
                    <div className="flex-1">
                      <p className="text-[14px] text-zinc-200 group-hover:text-white transition-colors">{item.event}</p>
                      <p className="text-[12px] text-zinc-600">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="card-static p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-[15px]">General Guidelines</h3>
                  <p className="text-[13px] text-zinc-500">Important rules to follow</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "College ID is mandatory for all participants",
                  "Reporting time - 8:30 AM onwards",
                  "Register on or before 15th February 2026",
                  "Judges decision will be considered as final",
                  "Discipline should be maintained at all times",
                  "Participants must stay in designated areas",
                  "No refunds after registration",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[13px] text-zinc-400">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coordinators */}
          <div className="mt-10">
            <h3 className="text-center text-[14px] text-zinc-500 uppercase tracking-wider mb-6">Faculty Coordinators</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {facultyCoordinators.map((coord) => (
                <div key={coord.name} className="card-static px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <span className="text-orange-400 text-[12px] font-semibold">
                      {coord.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] text-white font-medium">{coord.name}</p>
                    <a href={`tel:${coord.phone.replace(/\s/g, '')}`} className="text-[12px] text-zinc-500 hover:text-orange-400 transition-colors">
                      {coord.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Council */}
          <div className="mt-8">
            <h3 className="text-center text-[14px] text-zinc-500 uppercase tracking-wider mb-6">Student Council</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {studentCouncil.map((member) => (
                <div key={member.name} className="card-static px-4 py-3 text-center">
                  <p className="text-[11px] text-zinc-600 uppercase tracking-wide mb-1">{member.role}</p>
                  <p className="text-[13px] text-white font-medium">{member.name}</p>
                  <a href={`tel:${member.phone}`} className="text-[12px] text-zinc-500 hover:text-orange-400 transition-colors">
                    {member.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="register" className="section bg-[#09090b]">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600/10 via-[#16161a] to-red-600/10 border border-white/[0.06] p-8 md:p-14">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to Participate in <span className="text-orange-400">SHRESHTA</span>?
              </h2>
              <p className="text-[15px] text-zinc-500 mb-8 leading-relaxed">
                Don&apos;t miss out on the biggest inter-college fest! Register on or before
                <strong className="text-orange-300"> 15th February 2026</strong> for all events.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="#events" className="btn btn-primary px-8 py-3 text-[14px]">
                  Browse Events
                </Link>
                <a href={`tel:${collegeInfo.phone.replace(/\s/g, '')}`} className="btn btn-secondary px-8 py-3 text-[14px]">
                  Call: {collegeInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Event Date",
                value: "17th February 2026 (Tuesday)",
                color: "#f97316"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Venue",
                value: "SDC Mysuru, Hebbal Ring Road",
                color: "#ec4899"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: "Website",
                value: "sdcmysore.ac.in",
                color: "#10b981"
              },
            ].map((item) => (
              <div key={item.title} className="card-static p-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-[14px] text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-[13px] text-zinc-500">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
