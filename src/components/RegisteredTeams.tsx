"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, Mail, Building, Phone, CreditCard, Clock } from "lucide-react";

interface Member {
    name: string;
    phone: string;
}

interface Registration {
    id: string;
    teamNumber: number;
    collegeName: string;
    email: string;
    members: Member[];
    registrationFee: string;
    transactionId: string;
    paymentStatus: string;
    registeredAt: any;
}

interface RegisteredTeamsProps {
    eventId: string;
    eventName: string;
}

export default function RegisteredTeams({ eventId, eventName }: RegisteredTeamsProps) {
    const [teams, setTeams] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const teamsRef = collection(db, "registrations", eventId, "teams");
        const q = query(teamsRef, orderBy("teamNumber", "asc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const teamsData: Registration[] = [];
            snapshot.forEach((doc) => {
                teamsData.push({
                    id: doc.id,
                    ...doc.data()
                } as Registration);
            });
            setTeams(teamsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching teams:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [eventId]);

    if (loading) {
        return (
            <div className="card-static p-6 md:p-8 bg-[#18181c]/50 border-white/5">
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-[#d4a843]/30 border-t-[#d4a843] rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (teams.length === 0) {
        return (
            <div className="card-static p-6 md:p-8 bg-[#18181c]/50 border-white/5">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d4a843]/10 flex items-center justify-center border border-[#d4a843]/20">
                        <Users className="w-5 h-5 text-[#d4a843]" />
                    </div>
                    Registered Teams
                </h2>
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-500">No teams registered yet.</p>
                    <p className="text-zinc-600 text-sm mt-1">Be the first to register!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card-static p-6 md:p-8 bg-[#18181c]/50 border-white/5">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4a843]/10 flex items-center justify-center border border-[#d4a843]/20">
                    <Users className="w-5 h-5 text-[#d4a843]" />
                </div>
                Registered Teams ({teams.length})
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 font-semibold text-[#d4a843]">Team</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#d4a843]">College</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#d4a843]">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#d4a843]">Members</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#d4a843]">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#d4a843]/20 text-[#d4a843] font-bold text-sm">
                                        {team.teamNumber}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-zinc-300">{team.collegeName}</td>
                                <td className="py-4 px-4 text-zinc-400 text-xs">{team.email}</td>
                                <td className="py-4 px-4">
                                    <div className="space-y-1">
                                        {team.members.map((member, idx) => (
                                            <div key={idx} className="text-xs">
                                                <span className="text-zinc-300">{member.name}</span>
                                                <span className="text-zinc-500 ml-2">{member.phone}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${team.paymentStatus === "completed"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                        }`}>
                                        {team.paymentStatus === "completed" ? "Verified" : "Pending"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {teams.map((team) => (
                    <div key={team.id} className="p-4 bg-black/30 border border-white/10 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-2">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#d4a843]/20 text-[#d4a843] font-bold text-sm">
                                    {team.teamNumber}
                                </span>
                                <span className="text-white font-semibold">Team {team.teamNumber}</span>
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${team.paymentStatus === "completed"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                }`}>
                                {team.paymentStatus === "completed" ? "Verified" : "Pending"}
                            </span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <p className="text-zinc-400 flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                {team.collegeName}
                            </p>
                            <p className="text-zinc-500 flex items-center gap-2 text-xs">
                                <Mail className="w-3 h-3" />
                                {team.email}
                            </p>
                            <div className="pt-2 border-t border-white/5">
                                <p className="text-xs text-zinc-500 mb-1">Members:</p>
                                {team.members.map((member, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                                        <span className="text-zinc-300">{member.name}</span>
                                        <span className="text-zinc-500">{member.phone}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
