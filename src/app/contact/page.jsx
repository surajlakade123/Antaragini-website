"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen w-full pt-20 pb-10 px-4 md:px-8 max-w-7xl mx-auto text-white">
            {/* Header */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-center mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
                    Get in Touch
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Have questions? Want to collaborate? Reach out to us.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl"
                >
                    <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 uppercase tracking-wider">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-teal-400 focus:outline-none focus:bg-black/40 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-teal-400 focus:outline-none focus:bg-black/40 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 uppercase tracking-wider">Subject</label>
                            <input
                                type="text"
                                placeholder="Regarding Registration..."
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-teal-400 focus:outline-none focus:bg-black/40 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 uppercase tracking-wider">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Your message here..."
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-teal-400 focus:outline-none focus:bg-black/40 transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Send Message
                            <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>

                {/* Contact Info & Map */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-teal-400/30 transition-colors">
                            <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 mb-4">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Address</h3>
                            <p className="text-gray-400 text-sm">
                                Indian Institute of Technology Kanpur (IITK)<br />
                                Kalyanpur, Kanpur<br />
                                Uttar Pradesh - 208016
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-blue-400/30 transition-colors">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-4">
                                <FaEnvelope size={20} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Email</h3>
                            <p className="text-gray-400 text-sm">
                                public_relations@antaragni.in<br />
                                marketing@antaragni.in
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-green-400/30 transition-colors md:col-span-2">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-4">
                                <FaPhone size={20} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Call Us</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold text-white">Festival Coordinator</p>
                                    <p className="text-gray-400 text-sm">+91 98765 43210</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Public Relations</p>
                                    <p className="text-gray-400 text-sm">+91 87654 32109</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stylized Map Placeholder */}
                    <div className="w-full h-64 rounded-2xl overflow-hidden relative group">
                        <img
                            src="https://picsum.photos/seed/map/800/400"
                            alt="Location Map"
                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                <span className="text-white font-bold flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-red-500 animate-bounce" />
                                    Locate Us on Campus
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
