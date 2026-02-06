"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuSearch, LuMenu, LuX } from "react-icons/lu";
import ghrcelogo from "../../assets/Glogo.jpg"

const BentoGallery = () => {
    const [activeTab, setActiveTab] = useState("antaragni");

    const tabs = [
        { id: 'antaragni', name: 'Antaragni', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
        { id: 'technorion', name: 'Technorion', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
        { id: 'parakram', name: 'Parakram', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    ];

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
                            src={ghrcelogo }
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

                {/* Bento Grid */}
                <main className="container mx-auto px-4 md:px-8 pb-20">

                    {/* ANTARAGNI GRID */}
                    {activeTab === 'antaragni' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px] animate-in fade-in zoom-in duration-500">
                            {/* 1. Blue Folder Card (Large) */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 relative bg-[#9FB6E0] rounded-[2.5rem] p-8 overflow-hidden group shadow-lg">
                                <div className="absolute top-0 left-0 w-1/3 h-12 bg-[#9FB6E0] rounded-br-[2rem] z-10" />
                                <div className="absolute top-8 left-0 w-16 h-8 bg-[#8FA6D0] rounded-br-2xl -z-0" />
                                <div className="h-full flex flex-col justify-end items-end">
                                    <span className="bg-[#E8C547] text-black text-xs font-bold px-4 py-2 rounded-full shadow-sm">About us</span>
                                </div>
                            </motion.div>

                            {/* 2. White Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#F8F8F7] text-black rounded-[2rem] p-6 flex flex-col justify-between shadow-lg">
                                <div>
                                    <h3 className="text-xl font-semibold leading-tight mb-2">Antaragni '24</h3>
                                    <p className="text-sm text-gray-500">The Fire Within</p>
                                </div>
                                <div className="self-end">
                                    <div className="w-10 h-10 rounded-full bg-[#D4F238] flex items-center justify-center text-xl font-bold text-black">P</div>
                                </div>
                            </motion.div>

                            {/* 3. Orange Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#EF6924] rounded-[2rem] p-6 text-black flex flex-col justify-center shadow-lg">
                                <p className="font-serif text-lg leading-snug">"Ignite the passion. Unleash the creativity."</p>
                                <p className="mt-4 text-xs underline opacity-70 cursor-pointer">Explore history ↗</p>
                            </motion.div>

                            {/* 4. Tall Image Card */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80" alt="Dancer" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white">
                                    <p className="text-xs font-light opacity-90">Cultural Extravaganza</p>
                                </div>
                            </motion.div>

                            {/* 5. Landscape Image */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 row-span-1 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Landscape" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </motion.div>

                            {/* 6. Green Logo Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#B5C96B] rounded-[2rem] p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
                                <div className="transform -rotate-6 scale-110">
                                    <h2 className="text-5xl font-black tracking-tighter text-black/90">Antaragni</h2>
                                </div>
                            </motion.div>

                            {/* 6. Green Logo Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-[#B5C96B] rounded-[2rem] p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
                                <div className="transform -rotate-6 scale-110">
                                    <h2 className="text-5xl font-black tracking-tighter text-black/90">Antaragni</h2>
                                </div>
                            </motion.div>

                            {/* 7. Yellow Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-[#FBDC78] text-black rounded-[2rem] p-8 flex flex-col justify-between shadow-lg">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%]">Providing a platform for talent.</h3>
                                    <LuArrowUpRight size={24} className="opacity-60" />
                                </div>
                            </motion.div>

                            {/* 8. Dark Green Card */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-2 bg-[#2D4539] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg">
                                <div>
                                    <h3 className="text-2xl font-medium mb-4">"Diversity makes us unique."</h3>
                                </div>
                            </motion.div>
                        </div>
                    )}


                    {/* TECHNORION GRID */}
                    {activeTab === 'technorion' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px] animate-in fade-in zoom-in duration-500">
                            {/* 1. Cyan Tech Card (Large) */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 relative bg-cyan-900 rounded-[2.5rem] p-8 overflow-hidden group shadow-lg border border-cyan-500/30">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <span className="bg-cyan-500 text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Tech & Innovation</span>
                                    <h2 className="text-4xl font-bold text-white">Future is Now</h2>
                                </div>
                            </motion.div>

                            {/* 2. Dark Blue Code Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-blue-950 text-white rounded-[2rem] p-6 flex flex-col justify-between shadow-lg border border-blue-500/30">
                                <div>
                                    <h3 className="text-xl font-semibold leading-tight mb-2">Technorion '24</h3>
                                    <p className="text-sm text-cyan-400">Code. Build. Innovate.</p>
                                </div>
                                <div className="self-end">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold text-black">T</div>
                                </div>
                            </motion.div>

                            {/* 3. Purple Gaming Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-purple-900 rounded-[2rem] p-6 text-white flex flex-col justify-center shadow-lg border border-purple-500/30">
                                <p className="font-mono text-lg leading-snug">"Level up your skills. Conquer the arena."</p>
                                <p className="mt-4 text-xs text-purple-300 underline cursor-pointer">View Esport rules ↗</p>
                            </motion.div>

                            {/* 4. Robot Image Card */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80" alt="Robotics" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <p className="text-xs font-bold text-cyan-400">RoboWars</p>
                                </div>
                            </motion.div>

                            {/* 5. Hackathon Image */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 row-span-1 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" alt="Hackathon" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white text-xs bg-black/50 px-2 py-1 rounded">24h Hackathon</p>
                                </div>
                            </motion.div>

                            {/* 6. Tech Logo Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-800 rounded-4xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden border border-slate-600">
                                <div className="transform -rotate-3 scale-110">
                                    <h2 className="text-4xl font-black tracking-tighter text-cyan-400">Technorion</h2>
                                </div>
            
                            </motion.div>

                            {/* 6. Tech Logo Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-800 rounded-4xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden border border-slate-600">
                                <div className="transform -rotate-3 scale-110">
                                    <h2 className="text-4xl font-black tracking-tighter text-cyan-400">Technorion</h2>
                                </div>
            
                            </motion.div>

                            {/* 7. Stats Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-[#1e293b] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg border border-slate-700">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%]">Pushing the boundaries of technology.</h3>
                                    <LuArrowUpRight size={24} className="text-cyan-500" />
                                </div>   
                                 
                            </motion.div>

                            {/* 7. Stats Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-[#1e293b] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg border border-slate-700">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%]">Pushing the boundaries of technology.</h3>
                                    <LuArrowUpRight size={24} className="text-cyan-500" />
                                </div>   
                                 
                            </motion.div>
                        </div>
                    )}

                    {/* PARAKRAM GRID */}
                    {activeTab === 'parakram' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px] animate-in fade-in zoom-in duration-500">
                            {/* 1. Red Sports Card (Large) */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 relative bg-red-900 rounded-[2.5rem] p-8 overflow-hidden group shadow-lg border border-red-500/30">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-multiply" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <span className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full w-fit">Sports & Glory</span>
                                    <h2 className="text-4xl font-bold text-white italic">"Unleash the Beast"</h2>
                                </div>
                            </motion.div>

                            {/* 2. Orange Info Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-orange-950 text-white rounded-[2rem] p-6 flex flex-col justify-between shadow-lg border border-orange-500/30">
                                <div>
                                    <h3 className="text-xl font-semibold leading-tight mb-2">Parakram '24</h3>
                                    <p className="text-sm text-orange-400">Strength. Speed. Spirit.</p>
                                </div>
                                <div className="self-end">
                                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-xl font-bold text-black">P</div>
                                </div>
                            </motion.div>

                            {/* 3. Green Field Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-green-900 rounded-[2rem] p-6 text-white flex flex-col justify-center shadow-lg border border-green-500/30">
                                <p className="font-sans text-lg leading-snug font-bold">"Victory favors the brave."</p>
                                <p className="mt-4 text-xs text-green-300 underline cursor-pointer">Register Team ↗</p>
                            </motion.div>

                            {/* 4. Basketball Image Card */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80" alt="Basketball" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <p className="text-xs font-bold text-orange-400">Court Dominance</p>
                                </div>
                            </motion.div>

                            {/* 5. Football Image */}
                            <motion.div whileHover={{ scale: 1.01 }} className="col-span-1 row-span-1 md:row-span-2 rounded-[2.5rem] overflow-hidden relative group shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80" alt="Football" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white text-xs bg-black/50 px-2 py-1 rounded">Football Frenzy</p>
                                </div>
                            </motion.div>

                            {/* 6. Parakram Logo Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-stone-900 rounded-[2rem] p-6 flex flex-col justify-between shadow-lg relative overflow-hidden border border-stone-700">
                                <div className="transform -rotate-6 scale-110">
                                    <h2 className="text-4xl font-black tracking-tighter text-red-500">Parakram</h2>
                                </div>
                            </motion.div>

                            {/* 6. Parakram Logo Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="bg-stone-900 rounded-[2rem] p-6 flex flex-col justify-between shadow-lg relative overflow-hidden border border-stone-700">
                                <div className="transform -rotate-6 scale-110">
                                    <h2 className="text-4xl font-black tracking-tighter text-red-500">Parakram</h2>
                                </div>
                            </motion.div>

                            {/* 7. Motivation Card */}
                            <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-[#451a03] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg border border-orange-900">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%]">Compete with the best athletes.</h3>
                                    <LuArrowUpRight size={24} className="text-orange-500" />
                                </div>
                                <div className="mt-6">
                                    <div className="flex gap-2">
                                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded border border-orange-600/30">Cricket</span>
                                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded border border-orange-600/30">Football</span>
                                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded border border-orange-600/30">Volleyball</span>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} className="col-span-1 md:col-span-2 bg-[#451a03] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg border border-orange-900">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold leading-tight max-w-[80%]">Compete with the best athletes.</h3>
                                    <LuArrowUpRight size={24} className="text-orange-500" />
                                </div>
                                <div className="mt-6">
                                    <div className="flex gap-2">
                                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded border border-orange-600/30">Cricket</span>
                                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded border border-orange-600/30">Football</span>
                                        <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded border border-orange-600/30">Volleyball</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default BentoGallery;