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
                name: "DANDASHATAKA - 30 Yards Cricket",
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
        <section id="rules" className="section bg-[#0a0a0c]">
            <div className="container-main">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="section-label">GUIDELINES</p>
                    <h2 className="section-title">
                        <span className="text-white">Rules &</span>
                        <span className="text-gold-gradient ml-3">Regulations</span>
                    </h2>
                    <div className="flex justify-center w-full" style={{ marginBottom: '1%' }}>
                        <p className="section-subtitle mt-4 text-center max-w-2xl">
                            Please read all the rules carefully before registering for any event
                        </p>
                    </div>

                    {/* PDF Download Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6"
                    >
                        <a
                            href="/2026 SHRESHTA-Rules And Guidelines.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a843]/10 border border-[#d4a843]/30 rounded-full text-[#d4a843] hover:bg-[#d4a843]/20 transition-all duration-300 group"
                        >
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            <span className="font-medium">Download PDF Rules</span>
                            <FileText className="w-4 h-4" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Category Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? "bg-[#d4a843] text-black shadow-lg shadow-[#d4a843]/30"
                                : "bg-[#18181c] text-zinc-400 border border-white/10 hover:border-[#d4a843]/50 hover:text-white"
                                }`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Rules Content */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">{currentData.icon}</span>
                        <h3 className="text-2xl font-bold text-white">{currentData.title}</h3>
                    </div>

                    {/* General Rules - Simple List */}
                    {activeCategory === "general" && "rules" in currentData && (
                        <div className="bg-[#141418] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                            <ul className="space-y-4">
                                {currentData.rules.map((rule, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="flex-shrink-0 w-7 h-7 bg-[#d4a843]/10 border border-[#d4a843]/30 rounded-full flex items-center justify-center text-xs font-bold text-[#d4a843]">
                                            {index + 1}
                                        </span>
                                        <p className="text-zinc-300 leading-relaxed">{rule}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Event-Specific Rules - Accordion */}
                    {activeCategory !== "general" && "events" in currentData && (
                        <div className="space-y-4">
                            {currentData.events.map((event, eventIndex) => (
                                <motion.div
                                    key={event.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                                    className="bg-[#141418] border border-white/[0.06] rounded-2xl overflow-hidden"
                                >
                                    {/* Event Header - Clickable */}
                                    <button
                                        onClick={() => toggleEvent(event.name)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="w-5 h-5 text-[#d4a843]" />
                                            <span className="text-lg font-semibold text-white">{event.name}</span>
                                        </div>
                                        {expandedEvents.includes(event.name) ? (
                                            <ChevronUp className="w-5 h-5 text-zinc-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-zinc-400" />
                                        )}
                                    </button>

                                    {/* Event Rules - Collapsible */}
                                    {expandedEvents.includes(event.name) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-white/[0.06] px-5 md:px-6 pb-6"
                                        >
                                            <ul className="space-y-3 mt-4">
                                                {event.rules.map((rule, ruleIndex) => (
                                                    <li key={ruleIndex} className="flex items-start gap-3">
                                                        <span className="flex-shrink-0 w-2 h-2 mt-2 bg-[#d4a843] rounded-full" />
                                                        <p className="text-zinc-400 leading-relaxed">{rule}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-4xl mx-auto mt-10"
                >
                    <div className="bg-gradient-to-r from-[#d4a843]/10 to-transparent border border-[#d4a843]/20 rounded-2xl p-6 flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#d4a843]/20 rounded-full flex items-center justify-center">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-2">Important Notice</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                All participants must carry their valid College ID Card and Principal&apos;s Permission Letter during registration.
                                Violation of any rules will lead to immediate disqualification. The decision of the judges and coordinators will be final.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
