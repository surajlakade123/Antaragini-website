"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHistory, FaUsers, FaLightbulb } from "react-icons/fa";




import sunilji from "../../assets/suniljiraisoni-Bl6duqdx.png";
import shobharaisoni from "../../assets/shobharaisoni2-CQnZ9QrQ.png";
import director from "../../assets/director-DX4IHFhE.png";
import jajulwar from "../../assets/jajulwar3-IL2zNYI5.png";
import sonaliJoshi from "../../assets/sonaliJoshi.png";
import sujeshGhodmare from "../../assets/sujeshGhodmare.jpg";
import abhijeetTitarmare from "../../assets/abhijeetTitarmare.avif";
import gatheringSecratery from "../../assets/gatheringSecratery.jpeg";
import jointGathering from "../../assets/jointGathering.jpeg";
import jointGathering1 from "../../assets/jointGathering1.jpeg";
import jointTechnorion from "../../assets/jointTechnorion.jpeg";
import jointTechnorion1 from "../../assets/jointTechnorion1.jpeg";
import technorionPresident from "../../assets/technorionPresident.jpeg";
import gymkhanaPresident from "../../assets/gymkhanaPresident.jpeg";
import gymkhanaJointPresident from "../../assets/jointGymkhana.jpeg";
import gymkhanaJointPresident1 from "../../assets/jointGymkhana1.jpeg";
import treasurer from "../../assets/treasurer.jpeg";
import shubhamVerma from "../../assets/shubhamVerma.jpeg";
import harshKoku from "../../assets/harshKoku.jpeg";
import surajLakade from "../../assets/surajLakade.png";
import jitendraYadav from "../../assets/jitendraYadav.jpeg";
import soujanyaPoshattiwar from "../../assets/soujanyaPoshattiwar.jpeg";
import nehaKathole from "../../assets/nehaKathole.jpeg";
import manthanBhandari from "../../assets/manthanBhandari.jpeg";
import vaishnaviKharche from "../../assets/vaishnaviKharche.jpg";
import parthYerawar from "../../assets/parthYerawar.jpeg";
import pramodWalke from "../../assets/pramodwalke.jpeg";
import santoshJaju from "../../assets/dr-jaju.jpeg";
import sanjayDorle from "../../assets/sanjaydorle.jpeg";
import atiyamadam from "../../assets/atiyamadam.jpeg"
import umakantKadu from "../../assets/decorationLead.jpeg";
import discipline from "../../assets/disciplineLead.jpeg";
import shreyashraisoni from "../../assets/shreyasraisoni2.png"
import ruchamam from "../../assets/ruchamam.jpeg"

import sharaddhaumate from "../../assets/sharaddhaumate.jpeg"





const teamSections = [
  {
    title: "PATRONS",
    members: [
      {
        name: "Dr. Sunilji Raisoni",
        role: "Chairman, RGI",
        image: sunilji,
      },
      {
        name: "Mrs. Shobha Raisoni",
        role: "Trustee, RGI",
        image: shobharaisoni,
      },
      {
        name: "Mr. Shreyash Raisoni",
        role: "Executive Director, RGI",
        image: shreyashraisoni,
      },
    ],
  },
  {
    title: " DIRECTOR",
    members: [
      {
        name: "Dr. Sachin Untawale",
        role: "Director, GHRCE",
        image: director,
      },
    ],
  },
  {
    title: " STEERING COMMITTEE",
    members: [
      {
        name: "Dr. Pramod Walke",
        role: "Dy. Director & Dean Academics",
        image: pramodWalke,
      },
      {
        name: "Dr. Santosh Jaju",
        role: "Dy. Director & Dean R&D",
        image: santoshJaju,
      },
      {
        name: "Dr. Sanjay Dorle",
        role: "Registrar",
        image: sanjayDorle,
      },
    ],
  },
  {
    title: " GATHERING INCHARGE",
    members: [
      {
        name: "Dr. Kapil Jajulwar",
        role: "Dean Student Activities Council",
        image: jajulwar,
      },
    ],
  },
  {
    title: "GATHERING CO-INCHARGE",
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
        name: "Dr. Shradha Umate",
        role: "Asst. Prof, EE Dept.",
        image: sharaddhaumate,
      },
    ],
  },
  {
    title: " TREASURER",
    members: [
      {
        name: "Prof. Rucha Jichkar",
        role: "Treasurer, GHRCE",
        image: ruchamam,
      },
    ],
  },
  {
    title: " OFFICE BEARERS",
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
        role: "Gymkhana President",
        image: gymkhanaPresident,
      },
      {
        name: "Shreyash Shriwas",
        role: "Joint Gymkhana President",
        image: gymkhanaJointPresident,
      },
      {
        name: "Tanmay Khode",
        role: "Joint Gymkhana President",
        image: gymkhanaJointPresident1,
      },
      {
        name: "Soham Kale",
        role: "Technorion President",
        image: technorionPresident,
      },
      {
        name: "Abhijeet Gour",
        role: "Joint Technorion President",
        image: jointTechnorion,
      },
      {
        name: "Suyog Aware",
        role: "Joint Technorion President",
        image: jointTechnorion1,
      },
      {
        name: "Umakant  Kadu",
        role: "Decoration Lead",
        image: umakantKadu,
      },
      {
        name: "Kavya Jaipurkar ",
        role: "Discipline Lead",
        image: discipline,
      },
      {
        name: "Himanshi Joshi",
        role: "Treasurer",
        image: treasurer,
      },
    ],
  },
  {
    title: "WEB DEVELOPMENT INCHARGE",
    members: [
      {
        name: "Prof. Atiya Khan",
        role: "Web Master",
        image: atiyamadam,
      },
    ],
  },
  {
    title: "Web Development Team",
    members: [
      {
        name: "Shubham Verma",
        role: "Web Developer Lead",
        image: shubhamVerma,
      },
      {
        name: "Harsh Koku",
        role: "Web Developer",
        image: harshKoku,
      },
      {
        name: "Suraj Lakade",
        role: "Web Developer & Designer",
        image: surajLakade,
      },
      {
        name: "Jitendra Yadav",
        role: "Web Designer",
        image: jitendraYadav,
      },
      {
        name: "Soujanya Poshattiwar",
        role: "Web Developer & Version Control",
        image: soujanyaPoshattiwar,
      },
      {
        name: "Neha Kathole",
        role: "Web Designer",
        image: nehaKathole,
      },
      {
        name: "Vaishnavi Kharche",
        role: "Web Designer",
        image: vaishnaviKharche,
      },
      {
        name: "Parth Yerawar",
        role: "Web Developer",
        image: parthYerawar,
      },
      {
        name: "Manthan Bhandari",
        role: "Web Designer",
        image: manthanBhandari,
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
          Antaragni 2026
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Antaragni is not just a festival, it's a legacy a spectrum of emotions,
          talent, and culture colliding to create magic.
        </p>
      </motion.section>

      {/* About + Theme
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32"
      >
        About Antaragni
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

        Theme
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
      */}

      {/* Antaragni Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-32"
      >
        {/* ghrce Section */}
        <div className="backdrop-blur-md rounded-3xl p-12 border border-purple-700/100 hover:shadow-[0_0_25px_4px_rgba(168,85,247,0.35)]
">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">

              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">About GHRCE</h2>
              <p className="text-gray-300 text-lg leading-relaxed align-justify">
                G.H. Raisoni College of Engineering (GHRCE) Nagpur, established in 1996, is an Empowered autonomous institution affiliated to Rashtrasant Tukadoji Maharaj Nagpur University. The institute became Autonomous in 2010 and UGC has renewed autonomous status till 2032. It has been awarded A++ (3.55/4) grade by NAAC during 3 rd cycle in 2023. It is ranked in the band of 201-300 in year 2025 PAN India in Engineering Discipline, as declared by National Institutional Ranking Framework (NIRF) 2025, MoE, Government of India.
              </p>
            </div>
            <div className="md:w-1/2 w-full aspect-video rounded-xl overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/videos/ghrcevedio.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Antaragni  Section */}
        <div className="backdrop-blur-md mt-10 rounded-3xl p-12 border border-purple-700/100 hover:shadow-[0_0_25px_4px_rgba(168,85,247,0.35)]
">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">

              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">About Antaragni</h2>
              <p className="text-gray-300 text-lg leading-relaxed align-justify">
                ANTARAGNI-2025 is the Annual Fest of G. H. Raisoni College of Engineering, taking things to a greater level this year. With competitions in dance, film and photography, music, dramatics, and various technical events with a unique twist, it promises to be an unforgettable event.

                The festival includes events like dancing, singing, and fashion shows. Antaragni, being the cultural part of the gathering, observes the maximum audience participation, starting from day one and concluding with a grand finale featuring a renowned celebrity.
              </p>
            </div>
            <div className="md:w-1/2 w-full aspect-video rounded-xl overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="videos/TeaserChangesdone.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </motion.section >

      {/* Team Section */}
      < section className="text-center px-4" >
        {
          teamSections.map((section) => (
            <div key={section.title} className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-10">
                {section.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {section.members.map((member) => (
                  <div
                    key={member.name}
                    className="flex flex-col items-center justify-start p-4 text-center hover:scale-105 transition-all duration-300 max-w-xs w-full relative group"
                  >
                    {/* Image Container with Gradient */}
                    <div className="relative mb-6 flex justify-center items-center">
                      {/* Glowing Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 via-purple-600 to-cyan-500 rounded-full blur-2xl opacity-60 group-hover:opacity-100 group-hover:blur-3xl transition-all duration-500 scale-125"></div>

                      {/* Image Circle */}
                      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/50 shadow-2xl z-10 bg-[#121212]">
                        <img
                          src={member.image?.src || member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    <div className="z-10 w-full">
                      <h4 className="font-bold text-xl mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {member.name}
                      </h4>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 tracking-wide uppercase transition-colors">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </section >
    </div >
  );
}
