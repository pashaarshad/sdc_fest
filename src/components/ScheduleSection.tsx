"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";

// Inline data to ensure component works without missing "lib/eventData"
const eventInfo = {
    date: "February 17, 2026",
    day: "Tuesday",
    time: "8:30 AM onwards",
    registrationDeadline: "February 15, 2026"
};

const rules = [
    "College ID is mandatory",
    "Reporting time - 8:30AM onwards",
    "Register on or before 15th February 2026 for all events",
    "Judges Decision will be considered as final",
    "Discipline should be maintained",
    "Conditions Applied for all the events"
];

const scheduleData = [
    { time: "8:30 AM", event: "Registration & Reporting", venue: "Main Hall" },
    { time: "9:30 AM", event: "Inaugural Ceremony", venue: "Auditorium" },
    { time: "10:00 AM", event: "IT Events Begin", venue: "Computer Labs" },
    { time: "10:00 AM", event: "Management Events Begin", venue: "Seminar Halls" },
    { time: "11:00 AM", event: "Cultural Events Begin", venue: "Open Stage" },
    { time: "2:00 PM", event: "E-Sports Tournament", venue: "Gaming Arena" },
    { time: "3:00 PM", event: "Sports Events", venue: "Ground" },
    { time: "5:00 PM", event: "Finals & Prize Distribution", venue: "Auditorium" },
];

const ScheduleSection = () => {
    return (
        <section id="schedule" className="py-24 relative overflow-hidden bg-[#0f0f12]">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[#d4a843]/5 to-background opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-[#d4a843] uppercase tracking-widest mb-4 block">
                        Timeline
                    </span>
                    <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">
                        Event <span className="text-[#d4a843]">Schedule</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        {eventInfo.date}, {eventInfo.day} • {eventInfo.time}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Schedule */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl bg-[#0c0c10] border border-white/10 p-6 md:p-10 hover:border-[#d4a843]/30 transition-colors duration-300"
                    >
                        {/* Day Header */}
                        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/5">
                            <div className="w-14 h-14 rounded-2xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-[#d4a843]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{eventInfo.date}</h3>
                                <p className="text-sm text-zinc-500 font-medium">{eventInfo.day}</p>
                            </div>
                        </div>

                        {/* Events List */}
                        {/* Events List */}
                        <div className="space-y-8 relative pl-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-zinc-800" />

                            {scheduleData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative flex gap-6 items-start group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-1.5 w-[23px] h-[23px] bg-[#0c0c10] border-2 border-zinc-700 rounded-full group-hover:border-[#d4a843] group-hover:scale-110 transition-all z-10 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(212,168,67,0.4)]">
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full group-hover:bg-[#d4a843] transition-colors" />
                                    </div>

                                    {/* Content Wrapper */}
                                    <div className="flex flex-col sm:flex-row sm:items-start pl-12 w-full">
                                        {/* Time - Fixed Width */}
                                        <div className="w-28 shrink-0 pt-0.5 mb-2 sm:mb-0">
                                            <div className="flex items-center gap-2 text-sm text-[#d4a843]/90 font-mono font-medium bg-[#d4a843]/5 px-2 py-1 rounded border border-[#d4a843]/10 w-fit">
                                                <span>{item.time}</span>
                                            </div>
                                        </div>

                                        {/* Event Info */}
                                        <div className="flex-1 pb-4 border-b border-white/5 group-last:border-0 group-last:pb-0 pt-0.5">
                                            <p className="font-bold text-white text-lg group-hover:text-[#d4a843] transition-colors leading-tight">
                                                {item.event}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-2 font-medium group-hover:text-zinc-400 transition-colors">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{item.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Rules & Guidelines */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl bg-[#0c0c10] border border-white/10 p-6 md:p-10 hover:border-[#d4a843]/30 transition-colors duration-300 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/5">
                            <div className="w-14 h-14 rounded-2xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-[#d4a843]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Rules & Guidelines</h3>
                                <p className="text-sm text-zinc-500 font-medium">Important information</p>
                            </div>
                        </div>

                        {/* Rules List */}
                        <div className="space-y-5 flex-1">
                            {rules.map((rule, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.05 }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-7 h-7 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#d4a843] group-hover:text-black transition-all">
                                        <span className="text-xs font-bold text-[#d4a843] group-hover:text-black">{index + 1}</span>
                                    </div>
                                    <p className="text-[15px] text-zinc-300 leading-relaxed">{rule}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Registration Deadline Alert */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-10 p-6 rounded-2xl bg-[#121215] border border-[#d4a843]/20 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Clock className="w-24 h-24 text-[#d4a843]" />
                            </div>
                            <div className="flex items-center gap-2 text-[#d4a843] font-bold mb-2 relative z-10">
                                <Calendar className="w-4 h-4" />
                                <span>Registration Deadline</span>
                            </div>
                            <p className="text-white text-lg font-medium relative z-10">
                                {eventInfo.registrationDeadline}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleSection;
