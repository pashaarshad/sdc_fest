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
            <div className="flex justify-center gap-3 md:gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-20 md:w-24 h-24 md:h-28 bg-[#18181b] rounded-xl border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-3 md:gap-4">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="relative">
                    <div className="w-20 md:w-24 bg-[#18181b] rounded-xl border border-white/5 p-4 md:p-5">
                        <div className="text-3xl md:text-4xl font-bold text-white text-center tabular-nums">
                            {String(unit.value).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider text-center mt-1">
                            {unit.label}
                        </div>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <div className="absolute -right-2 md:-right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                            <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                            <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
