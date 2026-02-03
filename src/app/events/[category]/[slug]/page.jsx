"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaTrophy, FaPhone, FaArrowLeft } from "react-icons/fa";

import antaragniEvents from "@/data/events/antaragni.json";
import technorionEvents from "@/data/events/technorion.json";
import parakramEvents from "@/data/events/parakram.json";

// Helper to find event logic
function getEventData(category, slug) {
    let events = [];
    if (category === "antaragni") events = antaragniEvents;
    else if (category === "technorion") events = technorionEvents;
    else if (category === "parakram") events = parakramEvents;

    return events.find((e) => e.slug === slug);
}

export default function EventDetailPage({ params }) {
    // Unwrap params using React.use() as recommended in Next.js 15+ (and 13+ app dir patterns sometimes)
    // Since we are in a client component, we might need to await it or treating it gently.
    // Actually, in Next.js 15, params is a Promise. Let's handle it safely.
    // For standard Next.js 13/14 App Router, params is an object, but let's assume standard behavior first.
    // Wait, if this is Next.js 15 (as per summary "Next.js 16.0.1"), params is a Promise.

    const { category, slug } = use(params);

    const event = getEventData(category, slug);

    if (!event) {
        return <div className="min-h-screen flex items-center justify-center text-white">Event not found</div>;
    }

    // Theme colors based on category
    const themeColors = {
        antaragni: "var(--antaragni-primary)",
        technorion: "var(--technorion-primary)",
        parakram: "var(--parakram-primary)"
    };
    const accentColor = themeColors[category] || "#ffffff";

    return (
        <article className="min-h-screen bg-[#050505] pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.bannerImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />

                <div className="absolute top-24 left-4 md:left-12 z-20">
                    <Link href="/events" className="flex items-center text-white/80 hover:text-white transition-colors bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
                        <FaArrowLeft className="mr-2" /> Back to Events
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="container mx-auto"
                    >
                        <span
                            className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-black mb-4"
                            style={{ backgroundColor: accentColor }}
                        >
                            {event.category}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight">
                            {event.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl">
                            {event.shortDescription}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl text-white font-bold mb-4 flex items-center">
                                <span className="w-1 h-8 mr-3 rounded-full" style={{ backgroundColor: accentColor }}></span>
                                About the Event
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {event.description}
                            </p>
                        </section>

                        {/* Rules */}
                        <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl text-white font-bold mb-6">Rules & Regulations</h3>
                            <ul className="space-y-3">
                                {event.rules.map((rule, idx) => (
                                    <li key={idx} className="flex items-start text-gray-300">
                                        <span className="mr-3 text-lg" style={{ color: accentColor }}>•</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#111] p-6 rounded-2xl border border-white/10 sticky top-24"
                        >
                            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">
                                Event Details
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-center text-gray-300">
                                    <FaCalendarAlt className="w-5 h-5 mr-4 text-white/50" />
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase">Date</span>
                                        {event.details.date}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-300">
                                    <FaClock className="w-5 h-5 mr-4 text-white/50" />
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase">Time</span>
                                        {event.details.time}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-300">
                                    <FaMapMarkerAlt className="w-5 h-5 mr-4 text-white/50" />
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase">Venue</span>
                                        {event.details.venue}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-300">
                                    <FaUsers className="w-5 h-5 mr-4 text-white/50" />
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase">Team Size</span>
                                        {event.details.teamSize}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-300">
                                    <FaTrophy className="w-5 h-5 mr-4 text-white/50" />
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase">Prize Pool</span>
                                        <span className="text-[var(--antaragni-primary)] font-bold">{event.details.prizePool}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <a
                                    href={event.registrationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 rounded-xl font-bold text-center text-black hover:scale-105 transition-transform shadow-lg shadow-white/10"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    Register Now
                                </a>
                            </div>

                            {/* Contact */}
                            {event.contacts && event.contacts.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-white text-sm font-bold mb-4">Contact Coordinators</h4>
                                    {event.contacts.map((contact, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                            <span>{contact.name}</span>
                                            <a href={`tel:${contact.phone}`} className="hover:text-white flex items-center">
                                                <FaPhone className="mr-2" /> {contact.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </motion.div>
                    </div>
                </div>
            </div>
        </article>
    );
}
