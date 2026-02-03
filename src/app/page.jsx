"use client";

import PrismHero from "@/components/hero/PrismHero";
import CountdownTimer from "@/components/ui/CountdownTimer";
import EventCategories from "@/components/sections/EventCategories";
import CircularGallery from "@/components/home/CircularGallery";
import EventTimeline from "@/components/home/EventTimeline";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <PrismHero />
            {/* <CountdownTimer /> */}
            <CircularGallery />
            <EventCategories />
            {/* <EventTimeline /> */}
        </div>
    );
}
