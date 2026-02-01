"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Download, BookOpen } from "lucide-react";

const rulesData = {
    general: {
        title: "General Rules",
        icon: "📋",
        rules: [
            "Reporting time for participants: 8:30am. Registration closes at 9:30am.",
            "Participants must register on or before 15th February 2026 for all the events to avoid last minute rush up.",
            "Registration strictly closes at first 60 teams for Treasure Hunt event and first 36 teams for E-Sports (BGMI) event.",
            "Only current college/university students can participate in the fest.",
            "Participants must provide their College Student ID card and the permission letter (mentioning each participants' name) from their respective college Principal at the registration counter.",
            "Participants must follow the general and event-specific rules. Violation of any rules will lead to direct disqualification.",
            "The decision of judges will be considered as final.",
            "Fair play is expected. Any kind of cheating, indiscipline, indecency or dishonest behaviour will lead to disqualification of the participant.",
            "No participants must cause any damage to the college property.",
            "Participants/attendees agree to be photographed/recorded for promotional purposes. Unauthorized photography/videography is prohibited.",
            "Any disputes should be resolved with the fest co-ordinators.",
            "Organizers reserve the right to modify the event rules if situation demands. Participants will be notified of changes.",
            "If any round ends in a tie between teams, a tiebreaker round will be held at the discretion of the event coordinators.",
            "Lunch will be provided for the participants only.",
            "The Championship Trophy is awarded to the college with the most team winning maximum number of events."
        ]
    },
    management: {
        title: "Management Events",
        icon: "💼",
        events: [
            {
                name: "DHURANDHARAH - Best Entrepreneurs Event",
                rules: [
                    "Registration Fees- ₹300 per team, 2 participants in a team.",
                    "Rules and details of the rounds will be disclosed on the spot.",
                    "Participants should adhere to the time limits given."
                ]
            },
            {
                name: "SAMANVAYA - Human Resource Event",
                rules: [
                    "Registration Fees- ₹300 per team, 2 participants in a team.",
                    "Rules and details of the rounds will be disclosed on the spot.",
                    "Use of mobile phones may be part of the event round. So at least one participant should have the mobile phone with internet."
                ]
            },
            {
                name: "ARTHA SANGRAM - Finance Event",
                rules: [
                    "Registration Fees- ₹300 per team, 2 participants in a team.",
                    "Rules and details of the rounds will be disclosed on the spot.",
                    "The event is based on general knowledge of finance and financial markets.",
                    "Participants must have android phone with sufficient internet data. The use of laptop is optional."
                ]
            },
            {
                name: "VIKRAYA - Marketing Event",
                rules: [
                    "Registration Fees- ₹300 per team, 2 participants in a team.",
                    "Completion of the task is required within the designated time-frame.",
                    "Rules and details of the rounds will be disclosed on the spot.",
                    "There will be no selling of any products in any rounds of the event."
                ]
            }
        ]
    },
    it: {
        title: "IT Events",
        icon: "💻",
        events: [
            {
                name: "PRATYAYA - UI/UX Design Event",
                rules: [
                    "Registration Fees- ₹200 per team, 2 participants in a team.",
                    "One-hour training will be provided on usage of the tool.",
                    "Design tools allowed are – Figma or Paper Sketching only.",
                    "Originality is expected. Copied content/templates will lead to disqualification.",
                    "Rules and details will be told on the spot.",
                    "Laptops are required. If laptop is not brought, system will be provided."
                ]
            },
            {
                name: "LOGIC OVERLOAD - Pattern Coding Event",
                rules: [
                    "Registration Fees- ₹200 per team, 2 participants in a team.",
                    "Rules and details of event rounds are disclosed on the spot.",
                    "Participants can code using programming languages such as Java, Python, C and C++.",
                    "Laptops are required, but if not, the college will provide computer system.",
                    "Each team have to bring one USB Cable (charger cable)."
                ]
            },
            {
                name: "NIDHI ANVESHANAM - Treasure Hunt Event",
                rules: [
                    "Registration Fees- ₹600 per team, 4 participants in a team.",
                    "Registration strictly closes at first 60 teams. So register soon.",
                    "Using vehicles, any digital gadgets during the event is strictly prohibited.",
                    "Seeking help from others & inter communication between teams is prohibited.",
                    "Participants should carry each and every clue till the end of the Event.",
                    "No damaging of property should be done. If done, the respected team will be held liable for the expenses.",
                    "Coordinators are to be immediately informed in case of any inconveniences.",
                    "Violation of rules during any rounds, team will be disqualified."
                ]
            },
            {
                name: "E-SPORTS - BGMI Event",
                rules: [
                    "Registration Fees- ₹500 per team, 4 participants in a team.",
                    "This competition is open for all the streams (any UG students).",
                    "Only mobile is to be used with latest version of the game (No other devices allowed).",
                    "Mode: Classic TPP Squad (Erangel / Miramar / Sanhok / Rondo)",
                    "After third round, there will be elimination of teams based on the points."
                ]
            }
        ]
    },
    cultural: {
        title: "Cultural Events",
        icon: "🎭",
        events: [
            {
                name: "LASYA TANDAVA - Solo Dance Event",
                rules: [
                    "Registration Fees- ₹200 per person, Individual Event.",
                    "Dance form- Freestyle (Any genre other than Classical)",
                    "Time duration for each participant is 3+1 minutes.",
                    "Participants should come fully dressed up for the performance by 10am.",
                    "Dance audio file in MP3 format saved with participant's name should be sent to WhatsApp number 9483370324 on or before 15th February 2026. Bring the same in the pen drive also.",
                    "Lyrics of the song should not contain any offensive or vulgar content.",
                    "Using props, acrobats, busters, fire crackers, etc. is not allowed.",
                    "High risk or advanced flips and stunts are strictly prohibited for safety reasons.",
                    "Violation of any rules will lead to direct disqualification."
                ]
            },
            {
                name: "SWARA MADHURYA - Solo & Group Singing Event",
                rules: [
                    "Solo singing – Kannada or Hindi Movie Songs, 3+1 minutes time duration. Registration Fees- ₹150 per person, Individual Event.",
                    "Group singing – Kannada or Hindi Melody Songs, 4+1 minutes time duration. Registration Fees- ₹400 per team, 3+1 participants in a team.",
                    "Lyrics should not contain any offensive or inappropriate content.",
                    "Singing can be with or without instrumental backing.",
                    "Karaoke is allowed. It should be sent in MP3 file format saved with the participant's name to WhatsApp number 9380327667 before 15th February 2026. The same should also be brought in a Pen drive."
                ]
            }
        ]
    },
    sports: {
        title: "Sports Event",
        icon: "⚽",
        events: [
            {
                name: "DANDASHATAKA (30 YARDS CRICKET)",
                rules: [
                    "Registration Fees- ₹1000 per team, 8+2 participants in a team.",
                    "Reporting Time for all cricket participants- 8:00 am.",
                    "Only Degree College Students having College ID card and respective College Principal's permission letter are allowed for this event.",
                    "One player can play in only one team.",
                    "Each team should consist of 8 main players and 2 substitutes.",
                    "Only limited teams allowed for tournament (Only First 32 Teams). Registration closes once 32 teams have registered.",
                    "Match length and other format details (overs per side, etc.) will be decided based on the number of teams and time constraints.",
                    "Umpires' decision is final.",
                    "Registration is to be done at the earliest that is, before 15th February 2026."
                ]
            }
        ]
    },
    other: {
        title: "Other Events",
        icon: "🎯",
        events: [
            {
                name: "AGNIPATH - Drill Competition Event",
                rules: [
                    "This event is on 18th February 2026.",
                    "This is open for both NCC and NSS students.",
                    "For further details contact- Keerthi LC (7019037574) or Karthic V (7899116180)"
                ]
            },
            {
                name: "DRUSHYAVAHINI - Videography Event",
                rules: [
                    "Registration Fees- ₹200 per person, Individual Event.",
                    "Both camera (DSLR/Mirrorless) and mobile can be used for the event. Use of drone is strictly prohibited.",
                    "Video done must be in MP4 format and must not exceed 1 minute 10 seconds.",
                    "The video should not contain any watermarks, copyright, signature, name of the institution or any other identifying mark.",
                    "Rules of the event will be told at the start of the competition.",
                    "Video editing must be done within the campus itself and they must use their own laptops, editing software, chargers and accessories.",
                    "Use of any copyrighted audio and video materials is prohibited."
                ]
            }
        ]
    }
};

type CategoryKey = keyof typeof rulesData;

export default function RulesSection() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>("general");
    const [expandedEvents, setExpandedEvents] = useState<string[]>([]);

    const toggleEvent = (eventName: string) => {
        setExpandedEvents(prev =>
            prev.includes(eventName)
                ? prev.filter(e => e !== eventName)
                : [...prev, eventName]
        );
    };

    const categories: { id: CategoryKey; label: string; icon: string }[] = [
        { id: "general", label: "General Rules", icon: "📋" },
        { id: "management", label: "Management", icon: "💼" },
        { id: "it", label: "IT Events", icon: "💻" },
        { id: "cultural", label: "Cultural", icon: "🎭" },
        { id: "sports", label: "Sports", icon: "⚽" },
        { id: "other", label: "Other Events", icon: "🎯" },
    ];

    const currentData = rulesData[activeCategory];

    return (
        <section id="rules" className="relative py-24 bg-[#0a0a0c] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#d4a843]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#d4a843]/5 rounded-full blur-[100px]" />
            </div>

            <div className="container-main relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/20 text-[#d4a843] text-xs font-bold tracking-widest uppercase mb-4">
                        Guidelines
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                        Rules & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a843] via-[#f3dba2] to-[#d4a843]">Regulations</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Essential guidelines to ensure a fair and spectacular experience for everyone at SHRESHTA 2026.
                    </p>

                    {/* PDF Download Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8"
                    >
                        <a
                            href="/2026 SHRESHTA-Rules And Guidelines.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1c1c20] to-[#25252a] border border-[#d4a843]/30 rounded-full text-white hover:text-[#d4a843] hover:border-[#d4a843] hover:shadow-[0_0_20px_rgba(212,168,67,0.15)] transition-all duration-300 group"
                        >
                            <div className="bg-[#d4a843]/20 p-2 rounded-full group-hover:bg-[#d4a843] group-hover:text-black transition-colors duration-300">
                                <Download className="w-5 h-5" />
                            </div>
                            <span className="font-semibold tracking-wide">Download Official PDF</span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Category Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-4 mb-14"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative px-6 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-3 border ${activeCategory === cat.id
                                ? "bg-[#d4a843] text-black border-[#d4a843] shadow-[0_4px_20px_rgba(212,168,67,0.3)] scale-105"
                                : "bg-[#141418]/80 backdrop-blur-md text-zinc-400 border-white/5 hover:border-[#d4a843]/50 hover:text-white"
                                }`}
                        >
                            <span className="text-lg">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Section Title */}
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(212,168,67,0.3)]">{currentData.icon}</span>
                            <h3 className="text-3xl font-serif font-bold text-white">{currentData.title}</h3>
                        </div>

                        {/* General Rules Layout */}
                        {activeCategory === "general" && "rules" in currentData && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentData.rules.map((rule, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="group relative p-6 rounded-2xl bg-[#18181c] border border-white/5 hover:border-[#d4a843]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white group-hover:text-[#d4a843] transition-colors">
                                            {index + 1}
                                        </div>
                                        <div className="relative z-10 flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4a843]/10 flex items-center justify-center text-[#d4a843] mt-1 group-hover:bg-[#d4a843] group-hover:text-black transition-colors duration-300">
                                                <div className="w-2 h-2 bg-current rounded-full" />
                                            </div>
                                            <p className="text-zinc-300 leading-relaxed group-hover:text-white transition-colors">
                                                {rule}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Event Specific Rules Layout */}
                        {activeCategory !== "general" && "events" in currentData && (
                            <div className="grid grid-cols-1 gap-6">
                                {currentData.events.map((event, eventIndex) => (
                                    <motion.div
                                        key={event.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                                        className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${expandedEvents.includes(event.name)
                                            ? "bg-[#18181c] border-[#d4a843]/30 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                                            : "bg-[#141418] border-white/5 hover:border-[#d4a843]/20"
                                            }`}
                                    >
                                        <button
                                            onClick={() => toggleEvent(event.name)}
                                            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${expandedEvents.includes(event.name) ? "bg-[#d4a843] text-black" : "bg-white/5 text-[#d4a843]"
                                                    }`}>
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className={`text-xl font-bold transition-colors ${expandedEvents.includes(event.name) ? "text-[#d4a843]" : "text-white"
                                                        }`}>
                                                        {event.name}
                                                    </h4>
                                                    <p className="text-sm text-zinc-500 mt-1">Click to view detailed regulations</p>
                                                </div>
                                            </div>
                                            <div className={`p-2 rounded-full transition-all duration-300 ${expandedEvents.includes(event.name) ? "bg-[#d4a843]/10 rotate-180" : "bg-white/5"
                                                }`}>
                                                <ChevronDown className={`w-6 h-6 transition-colors ${expandedEvents.includes(event.name) ? "text-[#d4a843]" : "text-zinc-400"
                                                    }`} />
                                            </div>
                                        </button>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: expandedEvents.includes(event.name) ? "auto" : 0,
                                                opacity: expandedEvents.includes(event.name) ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 md:p-8 pt-0 border-t border-white/5">
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                    {event.rules.map((rule, ruleIndex) => (
                                                        <li key={ruleIndex} className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-[#d4a843]/20 transition-colors">
                                                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 bg-[#d4a843] rounded-full shadow-[0_0_8px_#d4a843]" />
                                                            <span className="text-zinc-300 text-sm leading-relaxed">{rule}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Animated Important Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-4xl mx-auto mt-20"
                >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a1e0b] to-[#1a1400] border border-[#d4a843]/30 p-8 md:p-10 text-center group">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4a843] to-transparent opacity-50" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#d4a843]/10 flex items-center justify-center mb-6 ring-1 ring-[#d4a843]/50 ring-offset-2 ring-offset-[#1a1400] animate-pulse">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h4 className="text-2xl font-serif font-bold text-[#d4a843] mb-4">Important Notice</h4>
                            <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl">
                                All participants must carry their valid <span className="text-white font-semibold">College ID Card</span> during registration.
                                <br />
                                <span className="text-sm mt-3 block text-zinc-500">
                                    Violation of any rules will lead to immediate disqualification. The decision of the judges and coordinators will be final.
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
