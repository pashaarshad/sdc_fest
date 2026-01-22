import Link from "next/link";
import { collegeInfo } from "@/data/events";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        events: [
            { name: "IT Events", href: "/#it-events" },
            { name: "Management Events", href: "/#management-events" },
            { name: "Cultural Events", href: "/#cultural-events" },
            { name: "Sports Events", href: "/#sports-events" },
        ],
        quickLinks: [
            { name: "Home", href: "/" },
            { name: "Schedule", href: "/#schedule" },
            { name: "Register", href: "/#register" },
            { name: "Contact", href: "/#contact" },
        ],
    };

    return (
        <footer className="bg-[#09090b] border-t border-white/[0.04]">
            <div className="container-main py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <span className="text-white font-bold text-[11px] tracking-tight">SDC</span>
                            </div>
                            <div>
                                <p className="text-white font-semibold text-[15px] tracking-tight">SHRESHTA 2026</p>
                                <p className="text-[11px] text-zinc-500">{collegeInfo.name}</p>
                            </div>
                        </div>
                        <p className="text-[13px] text-zinc-500 leading-relaxed max-w-xs mb-4">
                            {collegeInfo.trust}
                        </p>
                        <p className="text-[12px] text-zinc-600 mb-6">
                            {collegeInfo.address}
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {[
                                {
                                    name: "Website",
                                    href: collegeInfo.website,
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                },
                                {
                                    name: "Instagram",
                                    href: "#",
                                    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="w-9 h-9 rounded-lg bg-[#16161a] hover:bg-[#1c1c21] border border-white/[0.04] hover:border-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-orange-400 transition-all"
                                    aria-label={social.name}
                                >
                                    <svg className="w-4 h-4" fill={social.name === 'Website' ? 'none' : 'currentColor'} stroke={social.name === 'Website' ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                                        {social.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Events */}
                    <div>
                        <h4 className="text-[13px] font-semibold text-white mb-4 uppercase tracking-wider">Events</h4>
                        <ul className="space-y-3">
                            {footerLinks.events.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-zinc-500 hover:text-orange-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[13px] font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[13px] text-zinc-500 hover:text-orange-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div id="contact">
                        <h4 className="text-[13px] font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-3 text-[13px] text-zinc-500">
                            <li className="flex items-start gap-2.5">
                                <svg className="w-4 h-4 mt-0.5 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{collegeInfo.address}</span>
                            </li>
                            <li>
                                <a href={collegeInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-orange-400 transition-colors">
                                    <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <span>www.sdcmysore.ac.in</span>
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${collegeInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-orange-400 transition-colors">
                                    <svg className="w-4 h-4 text-zinc-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{collegeInfo.phone}</span>
                                </a>
                            </li>
                        </ul>

                        {/* Affiliations */}
                        <div className="mt-6 pt-4 border-t border-white/[0.04]">
                            <p className="text-[11px] text-zinc-600 leading-relaxed">
                                NAAC &apos;B++&apos; Grade • ISO 9001:2015 • UGC Recognized
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.04] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[12px] text-zinc-600">
                        © {currentYear} SHRESHTA, {collegeInfo.name}. All rights reserved.
                    </p>
                    <p className="text-[12px] text-zinc-600">
                        Programs: {collegeInfo.programs.join(' • ')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
