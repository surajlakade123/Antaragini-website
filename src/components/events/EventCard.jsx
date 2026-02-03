"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EventCard({ event }) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group relative h-[400px] w-full rounded-xl overflow-hidden glass-panel border border-white/10 hover:border-white/30"
        >
            <Link href={`/events/${event.category}/${event.slug}`} className="block h-full w-full relative">
                {/* Background Image using Next.js Image */}
                <div className="absolute inset-0 h-full w-full bg-[#1a1a1a]">
                    {!imageError ? (
                        <Image
                            src={event.bannerImage}
                            alt={event.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                            <span className="text-gray-600 font-bold uppercase tracking-widest text-sm">Image Unavailable</span>
                        </div>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <span className="inline-block px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white mb-3">
                            {event.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                            {event.name}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 md:line-clamp-3 opacity-90">
                            {event.shortDescription}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <span>{event.details.date}</span>
                        <span className="flex items-center text-white group-hover:translate-x-1 transition-transform">
                            View Details <span className="ml-1">→</span>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
