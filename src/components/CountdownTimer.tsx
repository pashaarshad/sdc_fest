"use client";

import { useEffect, useState, useRef } from "react";

interface CountdownTimerProps {
    targetDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// Animated digit component with flip/roll effect
function AnimatedDigit({ value, prevValue }: { value: string; prevValue: string }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const [displayValue, setDisplayValue] = useState(value);
    const [nextValue, setNextValue] = useState(value);

    useEffect(() => {
        if (value !== prevValue) {
            setNextValue(value);
            setIsFlipping(true);

            const timer = setTimeout(() => {
                setDisplayValue(value);
                setIsFlipping(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [value, prevValue]);

    return (
        <div className="relative h-16 md:h-20 w-full overflow-hidden">
            {/* Current value */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out ${isFlipping ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                    }`}
            >
                <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {displayValue}
                </span>
            </div>

            {/* Next value (coming from bottom) */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out ${isFlipping ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
            >
                <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
                    {nextValue}
                </span>
            </div>
        </div>
    );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
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
                const newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                };

                setPrevTimeLeft(timeLeft);
                setTimeLeft(newTimeLeft);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate, timeLeft]);

    if (!isMounted) {
        return (
            <div className="flex justify-center gap-4 md:gap-5">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-20 md:w-24">
                        <div className="h-20 md:h-24 bg-[#16161c] rounded-xl border border-white/[0.06]" />
                    </div>
                ))}
            </div>
        );
    }

    const timeUnits = [
        { label: "DAYS", value: timeLeft.days, prevValue: prevTimeLeft.days },
        { label: "HOURS", value: timeLeft.hours, prevValue: prevTimeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes, prevValue: prevTimeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds, prevValue: prevTimeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-4 md:gap-5">
            {timeUnits.map((unit) => (
                <div key={unit.label} className="w-20 md:w-24">
                    {/* Timer Box */}
                    <div className="bg-[#16161c] rounded-xl border border-white/[0.08] overflow-hidden">
                        <AnimatedDigit
                            value={String(unit.value).padStart(2, "0")}
                            prevValue={String(unit.prevValue).padStart(2, "0")}
                        />
                    </div>
                    {/* Label */}
                    <p className="text-[10px] md:text-[11px] text-zinc-500 uppercase tracking-widest mt-3 font-medium text-center">
                        {unit.label}
                    </p>
                </div>
            ))}
        </div>
    );
}
