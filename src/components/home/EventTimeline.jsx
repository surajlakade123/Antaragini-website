"use client";

import { motion } from "framer-motion";

// Parakram Schedule (Feb 14-18)
const parakramDays = [
    {
        day: "Day 1",
        date: "Feb 14",
        subtitle: "Inauguration & Indoor Sports",
        image: "/events/parakram.jpeg",
        events: ["Inauguration (9:00 AM)", "Table Tennis (M/W)", "Pool (M/W)", "Carrom (M/W)", "Chess (M/W)", "Power Lifting (M/W)"],
        venue: "GHRCE Sports Room & Gym",
        color: "from-red-600 to-orange-600"
    },
    {
        day: "Day 2",
        date: "Feb 16",
        subtitle: "Cricket & Volleyball",
        image: "/events/cricket-DBmsECKE.jpg",
        events: ["Futsal (W) - 8:00 AM", "Cricket (W)", "Cricket (M) - 3:00 PM", "Volleyball (M/W)"],
        venue: "GHRCEMN & Dhanwate College",
        color: "from-orange-500 to-red-500"
    },
    {
        day: "Day 3",
        date: "Feb 17",
        subtitle: "Team Sports",
        image: "/events/football.jpeg",
        events: ["Tug of War (M/W) - 8:00 AM", "Dodgeball (W)", "Football (Men) - 3:00 PM"],
        venue: "GHRCEMN & Dhanwate College",
        color: "from-red-500 to-yellow-500"
    },
    {
        day: "Day 4",
        date: "Feb 18",
        subtitle: "Athletics & Court Games",
        image: "/events/badminton-BWTypwJ4.jpg",
        events: ["Athletics (M/W) - 9:00 AM", "Badminton (M/W)", "Basketball (M/W)", "Handball (M/W)"],
        venue: "RTMNU Ground",
        color: "from-orange-600 to-red-600"
    },
];

// Antaragni & Technorion Schedule (Feb 19-21) relative to images
const antaragniDays = [
    {
        day: "Day 1",
        date: "Feb 19",
        subtitle: "Traditional Day",
        image: "/events/traditionalWalk.jpeg",
        events: [
            "Inauguration & Janta Raja Drama (12:30 PM)",
            "Battle of Tradition",
            "Street Dance (3:30 PM)",
            "Open Mic",
            "Tech: Micro Code, Code-O-Quick, BGMI"
        ],
        color: "from-purple-600 to-blue-600"
    },
    {
        day: "Day 2",
        date: "Feb 20",
        subtitle: "Theme Day",
        image: "/events/day2.png",
        events: [
            "Talent Hunt (9:30 AM)",
            "Singing (11:30 AM)",
            "Folk & Theme Dance (1:30 PM)",
            "Tech: Line Follower, Valorant, Tech Showcase"
        ],
        color: "from-pink-500 to-purple-500"
    },
    {
        day: "Day 3",
        date: "Feb 21",
        subtitle: "Retro Day",
        image: "/events/day3.png",
        events: [
            "Fashion Show (12:30 PM)",
            "Prize Distribution (3:00 PM)",
            "Closing Ceremony & Jamming (4:30 PM)",
            "Wall Painting, MasterChef, RoboSoccer"
        ],
        color: "from-blue-500 to-indigo-500"
    },
];

export default function EventTimeline() {
    return (
        <section className="py-20 bg-black relative">
            <div className="container mx-auto px-4">

                {/* Main Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-red-500">
                        Event Schedule
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Mark your calendars for the most awaited festival of the year.
                    </p>
                </div>

                {/* ANTARAGNI SECTION (Now On Top) */}
                <div className="mb-24">
                    <div className="mb-12 border-l-4 border-purple-500 pl-6">
                        <h3 className="text-4xl font-bold mb-2 text-white">
                            Antaragni & <span className="text-blue-400">Technorion</span>
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Feb 19th - 21st • <span className="text-yellow-500 font-semibold">Hackathon starts Feb 18th</span> at Library.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {antaragniDays.map((item, index) => (
                            <TimelineCard key={`antaragni-${index}`} item={item} index={index} />
                        ))}
                    </div>
                </div>

                {/* PARAKRAM SECTION (Now Below) */}
                <div>
                    <div className="mb-12 border-l-4 border-red-500 pl-6">
                        <h3 className="text-4xl font-bold mb-2 text-white">
                            Parakram <span className="text-red-500">2026</span>
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Feb 14th - 18th • Witness the clash of titans.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {parakramDays.map((item, index) => (
                            <TimelineCard key={`parakram-${index}`} item={item} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

// Reusable Card Component
function TimelineCard({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative bg-gradient-to-b ${item.color} p-[1px] rounded-2xl h-full`}
        >
            <div
                className="bg-black/90 h-full rounded-2xl p-6 hover:bg-black/80 transition-all duration-300 group overflow-hidden relative"
            >
                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                            {item.day}
                        </div>
                        <div className="text-white/80 font-mono bg-white/10 px-2 py-1 rounded text-sm">
                            {item.date}
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-1">{item.subtitle}</h3>
                    {item.venue && <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">📍 {item.venue}</p>}

                    <div className="w-full h-[1px] bg-white/10 my-4" />

                    <ul className="space-y-3">
                        {item.events.map((event, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className={`mt-1.5 min-w-[6px] h-1.5 rounded-full bg-gradient-to-r ${item.color}`}></span>
                                <span>{event}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
