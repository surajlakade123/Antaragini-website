"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import ghrcelogo from "../../assets/Glogo.jpg";
import { galleryImages } from "../../data/gallery-images";

const BentoGallery = () => {
    const [activeTab, setActiveTab] = useState("antaragni");

    const tabs = [
        { id: 'antaragni', name: 'Antaragni', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
        { id: 'technorion', name: 'Technorion', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
        { id: 'parakram', name: 'Parakram', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    ];

    // Card Components
    const ImageCard = ({ src, alt = "Event Image" }) => {
        if (!src) return null;
        return (
            <motion.div whileHover={{ scale: 1.01 }} className="mb-4 break-inside-avoid rounded-[1.5rem] overflow-hidden relative group shadow-lg">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto block object-contain bg-zinc-900"
                    loading="lazy"
                />
            </motion.div>
        );
    };

    const TextCard = ({ src, children, className = "" }) => (
        <motion.div whileHover={{ scale: 1.01 }} className={`mb-4 break-inside-avoid relative rounded-[1.5rem] overflow-hidden group shadow-lg ${className}`}>
            {src && (
                <>
                    <img
                        src={src}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 z-10 transition-opacity duration-300 group-hover:bg-black/50" />
                </>
            )}
            <div className={`relative z-20 h-full p-6 flex flex-col justify-between min-h-[200px] ${!src ? 'bg-zinc-800' : ''}`}>
                {children}
            </div>
        </motion.div>
    );

    // Prepare content for each tab
    const getTabContent = () => {
        const images = galleryImages[activeTab] || [];

        // Define fixed content cards for each tab
        const antaragniCards = [
            <TextCard key="about" src="/events/cultural.png">
                <div className="h-full flex flex-col justify-end items-end">
                    <span className="bg-[#E8C547] text-black text-xs font-bold px-4 py-2 rounded-full shadow-sm">About us</span>
                </div>
            </TextCard>,
            <TextCard key="title" src="/events/fashionshow.jpg">
                <div>
                    <h3 className="text-xl font-semibold leading-tight mb-2 text-white">Antaragni '25</h3>
                    <p className="text-sm text-gray-200">The Fire Within</p>
                </div>
                <div className="self-end mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4F238] flex items-center justify-center text-xl font-bold text-black">A</div>
                </div>
            </TextCard>,
            <TextCard key="quote" src="/events/DSC_3148.jpg">
                <div className="h-full flex flex-col justify-center">
                    <p className="font-serif text-lg leading-snug text-white">"Ignite the passion. Unleash the creativity."</p>
                    <p className="mt-4 text-xs underline opacity-70 cursor-pointer text-white">Explore history ↗</p>
                </div>
            </TextCard>,
            <TextCard key="logo" src="/events/DSC_3206.jpg">
                <div className="transform -rotate-6 scale-110 mt-8 mb-4">
                    <h2 className="text-5xl font-black tracking-tighter text-white/90">Antaragni</h2>
                </div>
            </TextCard>,
            <TextCard key="platform" src="/events/jantaRaja2.jpg">
                <div className="flex justify-between items-start h-full">
                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%] text-white">Providing a platform for talent.</h3>
                    <LuArrowUpRight size={24} className="opacity-80 text-white" />
                </div>
            </TextCard>,
            <TextCard key="diversity" src="/events/folkDance (2).jpg">
                <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-medium mb-4 text-white">"Diversity makes us unique."</h3>
                </div>
            </TextCard>
        ];

        const technorionCards = [
            <TextCard key="tech-main" src="/events/tech.png">
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <span className="bg-cyan-500 text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Tech & Innovation</span>
                    <h2 className="text-4xl font-bold text-white mt-4">Future is Now</h2>
                </div>
            </TextCard>,
            <TextCard key="code" src="/events/codeoquick-DRwvHCXx.jpg">
                <div>
                    <h3 className="text-xl font-semibold leading-tight mb-2 text-white">Technorion '24</h3>
                    <p className="text-sm text-cyan-200">Code. Build. Innovate.</p>
                </div>
                <div className="self-end mt-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold text-black">T</div>
                </div>
            </TextCard>,
            <TextCard key="gaming" src="/events/hackathon-DVjl3KNS.jpg">
                <div className="h-full flex flex-col justify-center">
                    <p className="font-mono text-lg leading-snug text-white">"Level up your skills. Conquer the arena."</p>
                    <p className="mt-4 text-xs text-cyan-300 underline cursor-pointer">View Esport rules ↗</p>
                </div>
            </TextCard>,
            <TextCard key="tech-logo" src="/events/linefollower-aVg7c2wf.jpg">
                <div className="transform -rotate-3 scale-110 mt-8 mb-4">
                    <h2 className="text-4xl font-black tracking-tighter text-cyan-400">Technorion</h2>
                </div>
            </TextCard>,
            <TextCard key="stats" src="/events/blindrace-BqHfEczB.jpg">
                <div className="flex justify-between items-start h-full">
                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%] text-white">Pushing the boundaries of technology.</h3>
                    <LuArrowUpRight size={24} className="text-cyan-500" />
                </div>
            </TextCard>
        ];

        const parakramCards = [
            <TextCard key="sports-main" src="/events/sports.png">
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <span className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full w-fit">Sports & Glory</span>
                    <h2 className="text-4xl font-bold text-white italic mt-4">"Unleash the Beast"</h2>
                </div>
            </TextCard>,
            <TextCard key="info" src="/events/cricket-DBmsECKE.jpg">
                <div>
                    <h3 className="text-xl font-semibold leading-tight mb-2 text-white">Parakram '24</h3>
                    <p className="text-sm text-orange-200">Strength. Speed. Spirit.</p>
                </div>
                <div className="self-end mt-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-xl font-bold text-black">P</div>
                </div>
            </TextCard>,
            <TextCard key="victory" src="/events/badminton-BWTypwJ4.jpg">
                <div className="h-full flex flex-col justify-center">
                    <p className="font-sans text-lg leading-snug font-bold text-white">"Victory favors the brave."</p>
                    <p className="mt-4 text-xs text-green-300 underline cursor-pointer">Register Team ↗</p>
                </div>
            </TextCard>,
            <TextCard key="logo" src="/events/kabbadi-nC4X-AoJ.jpg">
                <div className="transform -rotate-6 scale-110 mt-8 mb-4">
                    <h2 className="text-4xl font-black tracking-tighter text-red-500">Parakram</h2>
                </div>
            </TextCard>,
            <TextCard key="motivation" src="/events/pool-Cy2wSPP1.jpg">
                <div className="flex justify-between items-start h-full mb-4">
                    <div>
                        <h3 className="text-2xl font-semibold leading-tight max-w-[80%] text-white">Compete with the best athletes.</h3>
                    </div>
                    <LuArrowUpRight size={24} className="text-orange-500" />
                </div>
                <div className="mt-auto flex gap-2 flex-wrap">
                    <span className="text-xs bg-orange-600/50 text-orange-100 px-2 py-1 rounded border border-orange-400/30">Cricket</span>
                    <span className="text-xs bg-orange-600/50 text-orange-100 px-2 py-1 rounded border border-orange-400/30">Football</span>
                    <span className="text-xs bg-orange-600/50 text-orange-100 px-2 py-1 rounded border border-orange-400/30">Volleyball</span>
                </div>
            </TextCard>
        ];

        let cardsToInsert = [];
        if (activeTab === 'antaragni') cardsToInsert = antaragniCards;
        else if (activeTab === 'technorion') cardsToInsert = technorionCards;
        else if (activeTab === 'parakram') cardsToInsert = parakramCards;

        // Combine text cards and regular images
        // We intersperse text cards into the image list
        const combinedContent = [];
        const imageList = [...images];

        // Strategy: Insert text cards at specific intervals
        // e.g. indices 0, 3, 5, 8...
        const insertionIndices = [0, 2, 4, 7, 9, 12];

        let textCardIndex = 0;
        let imageIndex = 0;

        // Estimate total items to loop reasonably
        const totalItems = imageList.length + cardsToInsert.length;

        for (let i = 0; i < totalItems; i++) {
            if (insertionIndices.includes(i) && textCardIndex < cardsToInsert.length) {
                combinedContent.push(cardsToInsert[textCardIndex]);
                textCardIndex++;
            } else if (imageIndex < imageList.length) {
                combinedContent.push(<ImageCard key={`img-${imageIndex}`} src={imageList[imageIndex]} />);
                imageIndex++;
            }
        }

        // Add remaining text cards if any
        while (textCardIndex < cardsToInsert.length) {
            combinedContent.push(cardsToInsert[textCardIndex]);
            textCardIndex++;
        }

        return combinedContent;
    };


    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white relative overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-700 ${activeTab === 'antaragni' ? 'bg-[#0000ff]/20' : activeTab === 'technorion' ? 'bg-cyan-600/20' : 'bg-red-600/20'}`} />
                <div className={`absolute top-[10%] right-[-10%] w-[40%] h-[50%] rounded-full blur-[120px] transition-colors duration-700 ${activeTab === 'antaragni' ? 'bg-[#ff0080]/20' : activeTab === 'technorion' ? 'bg-blue-600/20' : 'bg-orange-600/20'}`} />
                <div className={`absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700 ${activeTab === 'antaragni' ? 'bg-[#00ffff]/20' : activeTab === 'technorion' ? 'bg-purple-600/20' : 'bg-yellow-600/20'}`} />
            </div>

            <div className="relative z-10 mt-10">
                {/* Header Section */}
                <header className="py-12 px-6  container mx-auto flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white/10 shadow-lg relative">
                        <Image
                            src={ghrcelogo}
                            alt="Antaragni Logo"
                            width={100}
                            height={100}
                            className="object-cover w-full h-full bg-black"
                        />
                    </div>
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-2 text-white">
                        Antaragni
                    </h1>
                    <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed mb-8">
                        The biggest Cultural Festival of GHRCE Nagpur <br />
                        Celebrating music, dance, drama, and art !
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-full text-2xl font-bold tracking-wide transition-all duration-300 ${activeTab === tab.id
                                    ? `${tab.color} text-white shadow-lg scale-105`
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Masonry Grid */}
                <main className="container mx-auto px-4 md:px-8 pb-20">
                    <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4 animate-in fade-in zoom-in duration-500">
                        {getTabContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BentoGallery;
