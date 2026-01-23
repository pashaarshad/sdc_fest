"use client";

import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import RegisteredTeams from "./RegisteredTeams";

interface EventPageClientProps {
    eventId: string;
    eventName: string;
    category: "it" | "management" | "cultural" | "sports";
    teamSize: string;
    registrationFee: string;
}

export default function EventPageClient({
    eventId,
    eventName,
    category,
    teamSize,
    registrationFee
}: EventPageClientProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRegistrationSuccess = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <>
            {/* Register Button */}
            <button
                onClick={() => setIsFormOpen(true)}
                className="btn btn-primary w-full py-4 text-base shadow-lg shadow-[#d4a843]/20 hover:shadow-[#d4a843]/40"
            >
                Register Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>

            {/* Registration Form Modal */}
            <RegistrationForm
                eventId={eventId}
                eventName={eventName}
                category={category}
                teamSize={teamSize}
                registrationFee={registrationFee}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={handleRegistrationSuccess}
            />

            {/* Registered Teams Section - Rendered in parent */}
        </>
    );
}

export function EventTeamsSection({
    eventId,
    eventName
}: {
    eventId: string;
    eventName: string;
}) {
    return <RegisteredTeams eventId={eventId} eventName={eventName} />;
}
