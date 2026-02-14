"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import ghrcelogo from "../../assets/Glogo.jpg";
import { galleryImages } from "../../data/gallery-images";

const BentoGallery = () => {
    // Card Components
    const ImageCard = ({ src, alt = "Event Image" }) => {
        if (!src) return null;
        return (
            <motion.div whileHover={{ scale: 1.01 }} className="mb-4 break-inside-avoid rounded-[1.5rem] overflow-hidden relative group shadow-lg">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto block object-contain bg-gray-100"
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
            <div className={`relative z-20 h-full p-6 flex flex-col justify-between min-h-[200px] ${!src ? 'bg-gray-100' : ''}`}>
                {children}
            </div>
        </motion.div>
    );

    const getGalleryContent = () => {
        const images = galleryImages.antaragni || [];

        // Define fixed content cards for the gallery
        const cardInserts = [
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

        // Combine text cards and regular images
        const combinedContent = [];
        const imageList = [...images];

        // Strategy: Insert text cards at specific intervals
        const insertionIndices = [0, 2, 4, 7, 9, 12];

        let textCardIndex = 0;
        let imageIndex = 0;

        const totalItems = imageList.length + cardInserts.length;

        for (let i = 0; i < totalItems; i++) {
            if (insertionIndices.includes(i) && textCardIndex < cardInserts.length) {
                combinedContent.push(cardInserts[textCardIndex]);
                textCardIndex++;
            } else if (imageIndex < imageList.length) {
                combinedContent.push(<ImageCard key={`img-${imageIndex}`} src={imageList[imageIndex]} />);
                imageIndex++;
            }
        }

        // Add remaining text cards if any
        while (textCardIndex < cardInserts.length) {
            combinedContent.push(cardInserts[textCardIndex]);
            textCardIndex++;
        }

        // Add remaining images if any
        while (imageIndex < imageList.length) {
            combinedContent.push(<ImageCard key={`img-${imageIndex}`} src={imageList[imageIndex]} />);
            imageIndex++;
        }

        return combinedContent;
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-pink-500 selection:text-white relative overflow-hidden">
            {/* Background Gradient Mesh */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-[#0000ff]/20 transition-colors duration-700" />
                <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] rounded-full blur-[120px] bg-[#ff0080]/20 transition-colors duration-700" />
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[120px] bg-[#00ffff]/20 transition-colors duration-700" />
            </div>

            <div className="relative z-10 mt-10">
                {/* Header Section */}
                <header className="py-12 px-6 container mx-auto flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-black/10 shadow-lg relative">
                        <Image
                            src={ghrcelogo}
                            alt="Antaragni Logo"
                            width={100}
                            height={100}
                            className="object-cover w-full h-full bg-white"
                        />
                    </div>
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-2 text-black">
                        Antaragni
                    </h1>
                    <p className="text-gray-600 max-w-md text-sm md:text-base leading-relaxed mb-8">
                        The biggest Cultural Festival of GHRCE Nagpur <br />
                        Celebrating music, dance, drama, and art !
                    </p>
                </header>

                {/* Masonry Grid */}
                <main className="container mx-auto px-4 md:px-8 pb-20">
                    <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4 animate-in fade-in zoom-in duration-500">
                        {getGalleryContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BentoGallery;
