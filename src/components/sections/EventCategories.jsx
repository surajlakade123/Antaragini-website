"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import parakram from "../../assets/parakram.jpeg";
import antaragni from "../../assets/ant1.jpeg";
import technorion from "../../assets/tech.png";

const categories = [
    {
        id: "parakram",
        name: "PARAKRAM",
        subtitle: "Sports Events",
        count: "16 Events",
        description: "Athletics, Team Sports & E-Sports",
        color: "var(--parakram-tertiary)",
        gradient: "from-[var(--parakram-primary)] to-[var(--parakram-tertiary)]",
        image: parakram,
    },
    {
        id: "technorion",
        name: "TECHNORION",
        subtitle: "Technical Events",
        count: "19 Events",
        description: "Coding, Robotics, Gaming & Innovation",
        color: "var(--technorion-primary)",
        gradient: "from-[var(--technorion-primary)] to-[var(--technorion-tertiary)]",
        image: technorion,
    },

    {
        id: "antaragni",
        name: "ANTARAGNI",
        subtitle: "Cultural Events",
        count: "14 Events",
        description: "Dance, Music, Drama & Art",
        color: "var(--antaragni-primary)",
        gradient: "from-[var(--antaragni-primary)] to-[var(--antaragni-secondary)]",
        // Using placeholder images from Unsplash
        image: antaragni,
        video: "/videos/collegebackground video.mp4"
    }
];

export default function EventCategories() {
    return (
        <section className="py-32 bg-[var(--color-cream)] relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-black">
                        Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-800">Categories</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Dive into the world of culture, technology, and sports.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">
                    {categories.map((cat, index) => (
                        <Link href={`/events?category=${cat.id}`} key={cat.id} className="block h-full group">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="relative h-[300px] md:h-full w-full rounded-2xl overflow-hidden glass-panel border-0 shadow-2xl shadow-black/20"
                            >
                                {/* Background Image or Video */}
                                {cat.video ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    >
                                        <source src={cat.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${cat.image.src || cat.image})` }}
                                    />
                                )}

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-40 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-80`} />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/20 transition-colors duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                    <div className="transform transition-transform duration-300 group-hover:-translate-y-4">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-black mb-4"
                                            style={{ backgroundColor: cat.color }}
                                        >
                                            {cat.count}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-2">
                                            {cat.name}
                                        </h3>
                                        <p className="text-xl font-light text-gray-200 mb-2">
                                            {cat.subtitle}
                                        </p>
                                        <p className="text-gray-300 text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
