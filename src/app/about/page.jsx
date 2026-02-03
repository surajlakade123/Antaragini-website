"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaUsers, FaLightbulb } from "react-icons/fa";

import sunilji from "../../assets/suniljiraisoni-Bl6duqdx.png";
import shobharaisoni from "../../assets/shobharaisoni2-CQnZ9QrQ.png";
import director from "../../assets/director-DX4IHFhE.png";
import jajulwar from "../../assets/jajulwar3-IL2zNYI5.png";
import atiyamadam from "../../assets/atiyamadam-DHN3Ahu0.jpg";
import sonaliJoshi from "../../assets/sonaliJoshi.png";
import sujeshGhodmare from "../../assets/sujeshGhodmare.jpg";
import abhijeetTitarmare from "../../assets/abhijeetTitarmare.avif";
import gatheringSecratery from "../../assets/gatheringSecratery.jpeg";
import jointGathering from "../../assets/jointGathering.jpeg";
import jointGathering1 from "../../assets/jointGathering1.jpeg";
import jointTechnorion from "../../assets/jointTechnorion.jpeg";
import jointTechnorion1 from "../../assets/jointTechnorion1.jpeg";
import technorionPresident from "../../assets/technorionPresident.jpeg";
import treasurer from "../../assets/treasurer.jpeg";



const teamSections = [
  {
    title: "Patrons",
    members: [
      {
        name: "Dr. Sunilji Raisoni",
        role: "Chairman, Raisoni Group",
        image: sunilji,
      },
      {
        name: "Mrs. Shobha Raisoni",
        role: "Vice Chairman",
        image: shobharaisoni,
      },
    ],
  },
  {
    title: "Director",
    members: [
      {
        name: "Dr. Sachin Untawale",
        role: "Director, GHRCE",
        image: director,
      },
    ],
  },
  {
    title: "Gathering Incharge",
    members: [
      {
        name: "Dr. Kapil Jajulwar",
        role: "Dean Student Activities Council",
        image: jajulwar,
      },
    ],
  },
  {
    title: "Gathering Co-Incharge",
    members: [
      {
        name: "Dr. Sujesh Ghodmare",
        role: "Asst. Registrar",
        image: sujeshGhodmare,
      },
      {
        name: "Dr. Sonali Joshi",
        role: "Dean IQAC",
        image: sonaliJoshi,
      },
      {
        name: "Dr. Abhijeet Titarmare",
        role: "Asscoiate CoE",
        image: abhijeetTitarmare,
      },
      {
        name: "Prof. Shraddha Umate",
        role: "Asst. Prof, EE Dept.",
        image: "",
      },
    ],
  },
  {
    title: "SRC Student Body",
    members: [
      {
        name: "Devanshi Baraskar",
        role: "Gathering Secretary",
        image: gatheringSecratery,
      },
      {
        name: "Nandini Kakde",
        role: "Joint Gathering Secretary",
        image: jointGathering,
      },
      {
        name: "Tanish Tawri",
        role: "Joint Gathering Secretary",
        image: jointGathering1,
      },
      {
        name: "Sanika Guru",
        role: "Parakram President",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&q=80",
      },
      {
        name: "Shreyash Shriwas",
        role: "Joint Parakram President",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&q=80",
      },
      {
        name: "Tanmay Khode",
        role: "Joint Parakram President",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&q=80",
      },
      {
        name: "Soham Kale",
        role: "Technorion President",
        image: technorionPresident,
      },
      {
        name: "Abhijeet Gour",
        role: "Joint Technorion President",
        image: jointTechnorion1,
      },
      {
        name: "Suyog Aware",
        role: "Joint Technorion President",
        image: jointTechnorion,
      },
      {
        name: "Himanshi Joshi",
        role: "Treasurer",
        image: treasurer,
      },
    ],
  },
  {
    title: "Web Development Committee",
    members: [
      {
        name: "Prof. Atiya Khan",
        role: "Web Master",
        image: atiyamadam,
      },
      {
        name: "Shubham Verma",
        role: "Web Developer",
        image: "",
      },
      {
        name: "Harsh Koku",
        role: "Web Developer",
        image: "",
      },
      {
        name: "Suraj Lakade",
        role: "Web Developer",
        image: "",
      },
      {
        name: "Jitendra Yadav",
        role: "Web Developer",
        image: "",
      },
      {
        name: "Soujanya Poshattiwar",
        role: "Web Developer",
        image: "",
      },
      {
        name: "Neha Kathole",
        role: "Web Developer",
        image: "",
      },

      {
        name: "Parth Yerawar",
        role: "Web Developer",
        image: "",
      },
      {
        name: "Manthan Bhandari",
        role: "Web Designer",
        image: "",
      },

    ],
  },
];

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen w-full pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto text-white">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          About Antaragni
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Antaragni is not just a festival; it's a legacy — a spectrum of emotions,
          talent, and culture colliding to create magic.
        </p>
      </motion.section>

      {/* About + Theme */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32"
      >
        {/* About Antaragni */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
              <FaHistory size={24} />
            </div>
            <h2 className="text-3xl font-bold">About Antaragni</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Antaragni is the flagship annual cultural and technical festival of
            G.H. Raisoni College of Engineering, Nagpur. Recognized nationally,
            the institution has consistently ranked among top engineering
            colleges by NIRF, ARIIA, and India Today.
          </p>
        </motion.div>

        {/* Theme */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400">
              <FaLightbulb size={24} />
            </div>
            <h2 className="text-3xl font-bold">Saga Spectrum</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Saga Spectrum represents the vibrant diversity of expression. Like
            light refracting through a prism, Antaragni reveals the hidden
            brilliance within every participant.
          </p>
        </motion.div>
      </motion.div>

      {/* Spirit Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-32"
      >
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-3xl p-12 border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-block p-3 bg-blue-500/20 rounded-lg text-blue-400 mb-6">
                <FaUsers size={24} />
              </div>
              <h2 className="text-4xl font-bold mb-6">The Spirit Behind</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Antaragni is entirely student-driven. From sleepless nights to
                roaring crowds, it is passion, teamwork, and shared dreams that
                bring this spectacle to life.
              </p>
            </div>
            <div className="md:w-1/2 w-full h-72 rounded-xl overflow-hidden">
              <img
                src="https://picsum.photos/seed/team/800/600"
                alt="Team Antaragni"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="text-center px-4">
        {teamSections.map((section) => (
          <div key={section.title} className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-10">
              {section.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {section.members.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center rounded-2xl overflow-hidden text-center hover:scale-105 transition-transform max-w-xs w-full relative group"
                >
                  {section.title === "SRC Student Body" && (
                    <div className="absolute top-10 w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 blur-2xl opacity-60 scale-125 -z-10 group-hover:opacity-80 transition-opacity"></div>
                  )}
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-lg bg-black/20 z-10">
                    <img
                      src={member.image?.src || member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-4 z-10">
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
