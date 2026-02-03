"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurFade } from '@/components/ui/blur-fade';
import { LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

const galleryImages = {
    antaragni: [
        { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', alt: 'Dance Performance' },
        { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', alt: 'Music Night' },
        { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', alt: 'Fashion Show' },
        { src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80', alt: 'Stage Performance' },
        { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', alt: 'DJ Night' },
        { src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80', alt: 'Cultural Dance' },
    ],
    technorion: [
        { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', alt: 'Hackathon' },
        { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', alt: 'Robotics' },
        { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', alt: 'Tech Workshop' },
        { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', alt: 'Coding Session' },
        { src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', alt: 'Gaming Tournament' },
        { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', alt: 'Programming' },
    ],
    parakram: [
        { src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80', alt: 'Basketball' },
        { src: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80', alt: 'Football' },
        { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80', alt: 'Athletics' },
        { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', alt: 'Indoor Sports' },
        { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', alt: 'Fitness' },
        { src: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80', alt: 'Chess' },
    ],
};

const tabs = [
    { id: 'antaragni', name: 'Antaragni', gradient: 'bg-gradient-to-r from-red-500 to-orange-500', shadow: 'shadow-red-500/50' },
    { id: 'technorion', name: 'Technorion', gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/50' },
    { id: 'parakram', name: 'Parakram', gradient: 'bg-gradient-to-r from-emerald-500 to-green-500', shadow: 'shadow-emerald-500/50' },
];

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('antaragni');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const currentImages = galleryImages[activeTab];

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };

    return (
        <div className="bg-background text-foreground min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/15 blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[150px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <p className="text-sm text-[--antaragni-primary] uppercase tracking-[0.3em] mb-4">
                            Memories
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Glimpses of
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">The Spectrum</span>
                        </h1>
                        <p className="text-lg text-gray-400">
                            Relive the moments that made Antaragni unforgettable
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tabs */}
            <section className="py-8">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-4 flex-wrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-3 rounded-full font-bold tracking-wide transition-all duration-300 transform hover:scale-105 ${activeTab === tab.id
                                    ? `${tab.gradient} text-white shadow-lg ${tab.shadow} ring-2 ring-white/20`
                                    : 'glass-panel text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div
                        key={activeTab}
                        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                    >
                        {currentImages.map((image, index) => (
                            <BlurFade
                                key={image.src}
                                delay={0.25 + index * 0.05}
                                inView
                                className="break-inside-avoid"
                            >
                                <button
                                    onClick={() => openLightbox(index)}
                                    className="group block w-full rounded-xl overflow-hidden glass-panel hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={800}
                                        height={600}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                    />
                                </button>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-6 right-6 p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-foreground"
                        >
                            <LuX size={24} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-6 p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-foreground hidden md:block"
                        >
                            <LuChevronLeft size={24} />
                        </button>

                        <motion.img
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            src={currentImages[currentImageIndex].src}
                            alt={currentImages[currentImageIndex].alt}
                            className="max-w-full max-h-[85vh] rounded-xl object-contain select-none"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-6 p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-foreground hidden md:block"
                        >
                            <LuChevronRight size={24} />
                        </button>

                        {/* Mobile Navigation */}
                        <div className="absolute bottom-6 flex gap-4 md:hidden">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-foreground"
                            >
                                <LuChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors text-foreground"
                            >
                                <LuChevronRight size={24} />
                            </button>
                        </div>


                        <div className="absolute top-6 left-6 md:bottom-6 md:top-auto md:left-1/2 md:-translate-x-1/2 text-center">
                            <p className="text-gray-400">
                                {currentImageIndex + 1} / {currentImages.length}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
