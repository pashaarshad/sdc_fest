"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
    targetDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = targetDate.getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isMounted) {
        return (
            <div className="flex justify-center gap-4 md:gap-6">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-20 md:w-24 h-24 md:h-28 bg-[#18181c] rounded-xl border border-white/[0.04]" />
                ))}
            </div>
        );
    }

    const timeUnits = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-4 md:gap-6">
            {timeUnits.map((unit) => (
                <div key={unit.label} className="text-center">
                    <div className="w-20 md:w-24 h-20 md:h-24 bg-[#141418] rounded-xl border border-white/[0.06] flex items-center justify-center mb-2">
                        <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                            {String(unit.value).padStart(2, "0")}
                        </span>
                    </div>
                    <span className="text-[11px] text-zinc-500 tracking-widest font-medium">
                        {unit.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
