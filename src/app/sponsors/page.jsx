"use client";

import { motion } from "framer-motion";

const sponsors = {
    title: [
        { name: "TechGiant", type: "Title Sponsor", src: "https://picsum.photos/seed/techgiant/400/200" },
    ],
    poweredBy: [
        { name: "FutureSystems", type: "Powered By", src: "https://picsum.photos/seed/future/300/150" },
        { name: "EnergyCorp", type: "Co-Powered By", src: "https://picsum.photos/seed/energy/300/150" },
    ],
    associate: [
        { name: "AlphaBank", type: "Banking Partner", src: "https://picsum.photos/seed/bank/200/100" },
        { name: "BetaFoods", type: "Food Partner", src: "https://picsum.photos/seed/food/200/100" },
        { name: "GammaWear", type: "Merchandise Partner", src: "https://picsum.photos/seed/wear/200/100" },
        { name: "DeltaTravel", type: "Travel Partner", src: "https://picsum.photos/seed/travel/200/100" },
        { name: "EpsilonMedia", type: "Media Partner", src: "https://picsum.photos/seed/media/200/100" },
        { name: "ZetaGaming", type: "Gaming Partner", src: "https://picsum.photos/seed/game/200/100" },
    ],
};

export default function SponsorsPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen w-full pt-20 pb-10 px-4 md:px-8 max-w-7xl mx-auto text-white text-center">
            {/* Header */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                    Our Partners
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    The pillars of strength behind the grand saga of Antaragni.
                </p>
            </motion.div>

            {/* Title Sponsor */}
            <motion.section
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-8 uppercase tracking-widest border-b border-yellow-400/30 inline-block pb-2">
                    Title Sponsor
                </h2>
                <div className="flex justify-center">
                    {sponsors.title.map((sponsor, idx) => (
                        <div
                            key={idx}
                            className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(234,179,8,0.2)]"
                        >
                            <img
                                src={sponsor.src}
                                alt={sponsor.name}
                                className="w-full h-48 md:h-64 object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <h3 className="text-3xl font-bold">{sponsor.name}</h3>
                            <p className="text-yellow-400/80">{sponsor.type}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Powered By */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <h2 className="text-xl md:text-2xl font-bold text-orange-400 mb-8 uppercase tracking-widest">
                    Powered By
                </h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {sponsors.poweredBy.map((sponsor, idx) => (
                        <div
                            key={idx}
                            className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-orange-500/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <img
                                src={sponsor.src}
                                alt={sponsor.name}
                                className="w-full h-40 object-cover rounded-lg mb-4 grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <h3 className="text-2xl font-bold">{sponsor.name}</h3>
                            <p className="text-orange-400/80">{sponsor.type}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Associate Sponsors */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-lg md:text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">
                    Associate Partners
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sponsors.associate.map((sponsor, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all duration-300 hover:scale-105"
                        >
                            <img
                                src={sponsor.src}
                                alt={sponsor.name}
                                className="w-full h-24 object-cover rounded mb-3 grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <h4 className="text-lg font-semibold">{sponsor.name}</h4>
                            <p className="text-sm text-gray-500">{sponsor.type}</p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
