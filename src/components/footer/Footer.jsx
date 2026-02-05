"use client";

import Link from "next/link";
import config from "@/data/config.json";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";


function AnimatedCounter({ value }) {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <div className="flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-full border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-500 group">
            <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase group-hover:text-pink-400 transition-colors">Visitors</span>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <motion.span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-lg font-mono">
                {display}
            </motion.span>
        </div>
    );
}

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [visits, setVisits] = useState(0);

    useEffect(() => {
        fetch("/api/visits")
            .then(res => res.json())
            .then(data => setVisits(data.count))
            .catch(() => { });
    }, []);

    return (
        <footer className="relative bg-[#050505] pt-16 pb-8 overflow-hidden">
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--antaragni-primary)] via-[var(--technorion-primary)] to-[var(--parakram-tertiary)] opacity-60" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Branding */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img src="https://antaragni.co.in/assets/newsrclogo-CcpIVukO.png" alt="SRC Logo" className="w-50 h-50 mr-4" />
                        </div>
                        <div className="text-white text-2xl font-bold">
                            {config.festivalName}
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            {config.tagline}
                        </p>
                        <div className="flex space-x-4 pt-4">
                            <a href={config.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--antaragni-primary)] transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href={config.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                                <FaFacebook size={24} />
                            </a>
                            <a href={config.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href={config.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
                                <FaYoutube size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 flex items-center">
                            <span className="w-8 h-[2px] bg-[var(--technorion-secondary)] mr-3"></span>
                            Quick Links
                        </h3>
                        <ul className="grid grid-cols-2 gap-3">
                            {['Home', 'About', 'Events', 'Gallery', 'Sponsors', 'UDAN', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-[var(--antaragni-secondary)] transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 flex items-center">
                            <span className="w-8 h-[2px] bg-[var(--parakram-tertiary)] mr-3"></span>
                            Contact Us
                        </h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="mt-1 mr-3 text-[var(--antaragni-primary)] shrink-0" />
                                <span>
                                    {config.collegeFullName}<br />
                                    {config.address.line1}, {config.address.line2}<br />
                                    {config.address.city} - {config.address.pin}
                                </span>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-3 text-[var(--technorion-primary)] shrink-0" />
                                <a href={`tel:${config.contact[0].phone}`} className="hover:text-white transition-colors">{config.contact[0].phone}</a>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-3 text-[var(--parakram-primary)] shrink-0" />
                                <a href={`mailto:${config.contact[0].email}`} className="hover:text-white transition-colors">{config.contact[0].email}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {currentYear} {config.collegeName} {config.festivalName.split(" ")[0]}. All rights reserved.</p>

                    <AnimatedCounter value={visits} />

                    <div className="mt-4 md:mt-0">
                        Designed & Developed by <span className="text-white">Web Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
