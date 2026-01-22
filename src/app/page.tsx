"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import ScheduleSection from "@/components/ScheduleSection";
import { itEvents, managementEvents, culturalEvents, sportsEvents, Event, collegeInfo, facultyCoordinators } from "@/data/events";
import Link from "next/link";

const allEvents = [...itEvents, ...managementEvents, ...culturalEvents, ...sportsEvents];

const categories = [
  { id: "all", label: "All" },
  { id: "it", label: "Tech" },
  { id: "management", label: "Management" },
  { id: "sports", label: "Sports" },
  { id: "cultural", label: "Cultural" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredEvents = activeCategory === "all"
    ? allEvents
    : allEvents.filter(event => event.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Events Section */}
      <section id="events" className="section bg-[#0a0a0c]">
        <div className="container-main">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="section-label">EXPLORE</p>
            <h2 className="section-title">
              <span className="text-white">Featured</span>
              <span className="text-gold-gradient ml-3">Events</span>
            </h2>
            <div className="flex justify-center w-full" style={{ marginBottom: '1%' }}>
              <p className="section-subtitle mt-4 text-center max-w-2xl">
                Compete in a diverse range of events designed to challenge your skills and creativity
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3" style={{ marginBottom: '3%' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid-events">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                titleKannada={event.titleKannada}
                description={event.description}
                coordinator={event.coordinator}
                coordinatorPhone={event.coordinatorPhone}
                category={event.category}
                href={`/events/${event.id}`}
                time={event.time}
                image={event.image}
                teamSize={event.teamSize}
                fee={event.registrationFee}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule Section */}
      <ScheduleSection />

      {/* Registration CTA Section */}
      <section id="register" className="section bg-[#0a0a0c]">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl bg-[#141418] border border-white/[0.04] p-10 md:p-16 text-center">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4a843]/5 rounded-full blur-[100px]" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[13px] text-emerald-400 font-medium">Registration Open</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
                <span className="text-white">Ready to</span>
                <span className="text-gold-gradient ml-3">Compete?</span>
              </h2>

              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Register now and secure your spot at the biggest intercollegiate fest of 2026
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm text-zinc-400">
                {[
                  "Access to all 15+ events",
                  "Free refreshments & lunch",
                  "Certificate of participation",
                  "Networking opportunities",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mb-6">
                <a href={`tel:${collegeInfo.phone.replace(/\s/g, '')}`} className="btn btn-primary text-lg px-10 py-4">
                  Register Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <p className="text-sm text-zinc-600">
                Last date for registration: <span className="text-zinc-400">February 15, 2026</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-[#0f0f12]">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="section-label">ABOUT</p>
              <h2 className="section-title mb-6">
                <span className="text-white">About The</span>
                <span className="text-gold-gradient ml-2">College</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Seshadripuram Degree College, Mysuru heralds its journey in the sphere of education in 2014.
                Ever since then, we have strived to provide the best education.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                {collegeInfo.trust} • {collegeInfo.address}
              </p>

              {/* Affiliations */}
              <div className="flex flex-wrap gap-2">
                {["NAAC B++", "ISO 9001:2015", "UGC Recognized", "AICTE Approved"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-xs text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="space-y-4">
              <div className="card-static p-6">
                <h3 className="text-sm font-semibold text-[#d4a843] uppercase tracking-wider mb-4">Faculty Coordinators</h3>
                <div className="space-y-4">
                  {facultyCoordinators.map((coord) => (
                    <div key={coord.name} className="flex items-center justify-between">
                      <span className="text-white">{coord.name}</span>
                      <a href={`tel:${coord.phone.replace(/\s/g, '')}`} className="text-zinc-500 hover:text-[#d4a843] transition-colors">
                        {coord.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-static p-6">
                <h3 className="text-sm font-semibold text-[#d4a843] uppercase tracking-wider mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href={collegeInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    www.sdcmysore.ac.in
                  </a>
                  <a href={`tel:${collegeInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {collegeInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
