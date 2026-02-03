"use client";

import { useState } from "react";
import EventGrid from "@/components/events/EventGrid";
import antaragniEvents from "@/data/events/antaragni.json";
import technorionEvents from "@/data/events/technorion.json";
import parakramEvents from "@/data/events/parakram.json";
import { motion } from "framer-motion";

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState("all");

    const allEvents = [...antaragniEvents, ...technorionEvents, ...parakramEvents];

    const getFilteredEvents = () => {
        switch (activeTab) {
            case "antaragni":
                return antaragniEvents;
            case "technorion":
                return technorionEvents;
            case "parakram":
                return parakramEvents;
            default:
                return allEvents;
        }
    };

    const tabs = [
        { id: "all", label: "All Events" },
        { id: "antaragni", label: "Antaragni" },
        { id: "technorion", label: "Technorion" },
        { id: "parakram", label: "Parakram" },
    ];

    return (
        <div className="min-h-screen bg-black pt-24 pb-20">
            <div className="container mx-auto px-4 mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
                >
                    Event Spectrum
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Discover over 40 events across culture, technology, and sports.
                </motion.p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? "bg-white text-black scale-105 shadow-lg shadow-white/20"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <EventGrid events={getFilteredEvents()} />
        </div>
    );
}
