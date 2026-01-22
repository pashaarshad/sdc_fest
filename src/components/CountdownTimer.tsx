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
                    <div
                        key={i}
                        className="w-[72px] md:w-[88px] h-[88px] md:h-[100px] bg-[#16161a] rounded-2xl border border-white/[0.04]"
                    />
                ))}
            </div>
        );
    }

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-3 md:gap-4">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="relative">
                    <div className="w-[72px] md:w-[88px] bg-[#16161a] rounded-2xl border border-white/[0.04] p-4 md:p-5 hover:border-white/[0.08] transition-colors">
                        <div className="text-2xl md:text-4xl font-bold text-white text-center tabular-nums tracking-tight">
                            {String(unit.value).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-wider text-center mt-1 font-medium">
                            {unit.label}
                        </div>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <div className="absolute -right-2 md:-right-2.5 top-1/2 -translate-y-[60%] flex flex-col gap-1.5">
                            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
