"use client";

import Link from "next/link";
import config from "@/data/config.json";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#050505] pt-16 pb-8 overflow-hidden">
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--antaragni-primary)] via-[var(--technorion-primary)] to-[var(--parakram-tertiary)] opacity-60" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Branding */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
                            {config.festivalName.split(" ")[0]}
                        </h2>
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
                                    {config.collegeName}<br />
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
                    <div className="mt-4 md:mt-0">
                        Designed & Developed by <span className="text-white">Web Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
