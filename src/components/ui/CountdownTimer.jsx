"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import config from "@/data/config.json";

const TimeBox = ({ value, label, color }) => (
    <div className="flex flex-col items-center mx-2">
        <div
            className="w-24 h-24 md:w-40 md:h-40 glass-card rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group border-2"
            style={{ borderColor: `rgba(${color}, 0.3)` }}
        >
            <div
                className="absolute inset-0 opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
                style={{ backgroundColor: `rgb(${color})` }}
            />
            <span className="text-4xl md:text-6xl font-black text-white relative z-10 font-mono tracking-tighter">
                {value < 10 ? `0${value}` : value}
            </span>
        </div>
        <span className="text-xs md:text-base uppercase tracking-[0.2em] text-gray-400 font-medium">
            {label}
        </span>
    </div>
);

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date(config.festivalDates.start).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden min-h-[60vh] flex flex-col justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-[var(--antaragni-secondary)] opacity-5 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl md:text-4xl text-white font-light mb-16 tracking-widest uppercase">
                        THE <span className="text-[var(--antaragni-primary)] font-bold">SAGA</span> BEGINS IN
                    </h3>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <TimeBox value={timeLeft.days} label="Days" color="255, 107, 107" />
                        <TimeBox value={timeLeft.hours} label="Hours" color="79, 172, 254" />
                        <TimeBox value={timeLeft.minutes} label="Minutes" color="168, 85, 247" />
                        <TimeBox value={timeLeft.seconds} label="Seconds" color="107, 207, 127" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
