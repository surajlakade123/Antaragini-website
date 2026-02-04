"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const videos = [
    { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", color: "from-red-500 to-orange-500", label: "Antaragni (Cultural)" },
    { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", color: "from-blue-500 to-cyan-500", label: "Technorion (Tech)" },
    { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", color: "from-green-500 to-emerald-500", label: "Parakram (Sports)" },
    { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", color: "from-purple-500 to-pink-500", label: "Saga Spectrum" },
    { src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", color: "from-yellow-400 to-amber-500", label: "Energy" },
];

const VideoCard = ({ vid }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <div className={`p-1 rounded-2xl bg-gradient-to-br ${vid.color} shadow-[0_0_40px_rgba(255,255,255,0.3)]`}>
            <div className="w-64 h-36 md:w-[600px] md:h-[400px] bg-black rounded-xl overflow-hidden relative">
                <video
                    ref={videoRef}
                    src={vid.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-r ${vid.color} opacity-90`}>
                    <p className="text-black text-xs md:text-base font-bold uppercase tracking-widest text-center">{vid.label}</p>
                </div>
            </div>
        </div>
    );
};

export default function CircularGallery() {
    const [rotation, setRotation] = useState(0);

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prev) => prev - 72);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-black overflow-hidden relative min-h-[500px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-black to-black pointer-events-none"></div>

            <div className="relative z-10 text-center w-full">
                <h2 className="text-5xl md:text-7xl font-bold mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 tracking-tighter">
                    Event Highlights
                </h2>

                <div className="relative w-[350px] h-[350px] md:w-[900px] md:h-[500px] mx-auto perspective-1000">
                    <motion.div
                        className="w-full h-full relative preserve-3d"
                        animate={{ rotateY: rotation }}
                        transition={{ duration: 1.5, type: "spring", stiffness: 40, damping: 20 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {videos.map((vid, index) => {
                            const angle = (index * 360) / videos.length;
                            // Larger radius for wider spread
                            const radius = 650;

                            return (
                                <div
                                    key={index}
                                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center backface-hidden"
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    }}
                                >
                                    <VideoCard vid={vid} />
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
