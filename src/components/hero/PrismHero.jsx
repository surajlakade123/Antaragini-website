"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    Sparkles,
    Float,
    MeshTransmissionMaterial,
    Stars,
    Center
} from "@react-three/drei";
import * as THREE from 'three';

// --- Sub-Component: The Styled Countdown Timer ---
function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            {/* Solid block style from reference image */}
            <div className="w-16 h-16 md:w-24 md:h-24 bg-[rgb(142,129,182)] border border-white/10 rounded-xl flex items-center justify-center mb-2 shadow-2xl">
                <span className="text-2xl md:text-5xl font-black text-white">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-[10px] md:text-xs tracking-[0.2em] text-cyan-400 uppercase font-bold">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex justify-center items-center mt-10">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
    );
}

// --- Original 3D Components (Unchanged) ---
function FloatingShards() {
    return (
        <group>
            {[...Array(10)].map((_, i) => (
                <Float
                    key={i}
                    speed={1.5}
                    rotationIntensity={2}
                    floatIntensity={2}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 6
                    ]}
                >
                    <mesh scale={Math.random() * 0.3 + 0.1}>
                        <octahedronGeometry args={[1, 0]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#ff0080" : "#00ffff"}
                            emissive={i % 2 === 0 ? "#ff0080" : "#00ffff"}
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

// Enhanced CompositePrism with click handler
function CompositePrism({ onPrismClick }) {
    const meshRef = useRef();
    const innerRef = useRef();
    const { camera, size } = useThree();

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.2;
        meshRef.current.rotation.z += delta * 0.1;
        innerRef.current.rotation.y -= delta * 0.4;
        innerRef.current.rotation.x -= delta * 0.2;
    });

    const handleClick = (e) => {
        e.stopPropagation();
        if (onPrismClick) {
            onPrismClick();
        }
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group onClick={handleClick}>
                <mesh ref={meshRef} scale={2}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={1024}
                        thickness={2.5}
                        roughness={0}
                        anisotropy={1}
                        chromaticAberration={1.5}
                        color="#ffffff"
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.2}
                    />
                </mesh>
                <mesh ref={innerRef} scale={1.2}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial
                        color={[3, 1, 3]}
                        wireframe
                        toneMapped={false}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function Scene({ onPrismClick }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={4} color="#ff00ff" />
            <pointLight position={[-10, 10, -10]} intensity={4} color="#00ffff" />
            <pointLight position={[0, -10, 0]} intensity={2} color="#ffffff" />
            <spotLight position={[0, 15, 0]} intensity={10} angle={0.6} penumbra={1} castShadow />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Center>
                <CompositePrism
                    onPrismClick={onPrismClick}
                />
            </Center>
            <FloatingShards />
            <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#ffffff" />
        </>
    );
}

// --- Main Export with Break Feature ---
export default function PrismHero() {
    const [isBroken, setIsBroken] = useState(false);

    const handleBreakPrism = () => {
        setIsBroken(true);
    };

    return (
        <section className="h-screen w-full relative overflow-hidden bg-black">
            {/* 3D Scene Background */}
            <div className="absolute inset-0 z-0">
                <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>



            {/* Overlay Content with Split Animation */}
            <AnimatePresence>
                {!isBroken && (
                    <>
                        {/* Left Half */}
                        <motion.div
                            initial={{ opacity: 1, x: 0 }}
                            exit={{
                                x: '-100%',
                                opacity: 0,
                                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                            }}
                            className="absolute inset-0 z-30 flex items-center justify-end overflow-hidden"
                            style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                        >
                            <div className="relative h-auto mt-25 flex flex-col items-center justify-center text-center px-4 pointer-events-none opacity-95 w-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="glass-panel p-8 md:p-16 rounded-[3rem] border border-white/10 bg-black/30 backdrop-blur-md pointer-events-auto max-w-5xl w-full mx-auto shadow-[0_0_50px_rgba(100,0,100,0.3)]"
                                >
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className="text-6xl md:text-9xl font-black mb-4 tracking-tighter"
                                    >
                                        <span className="bg-clip-text text-transparent bg-linear-to-r from-[#ff0080] via-[#7928ca] to-[#ff0080] animate-gradient-x">
                                            ANTARAGNI
                                        </span>
                                    </motion.h1>

                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                        className="text-2xl md:text-4xl font-light text-white tracking-[0.3em] uppercase mb-8"
                                    >
                                        <span className="text-cyan-400">Spectrum</span> Saga
                                    </motion.h2>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
                                    >
                                        Immerse yourself in the prism of possibilities. <br />
                                        Where every color tells a story of courage and creativity.
                                    </motion.p>

                                    <motion.h1 className="text-2xl text-gray-400">
                                        The <span className="text-cyan-400 font-bold">SAGA</span> BEGINS IN
                                    </motion.h1>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    >
                                        <CountdownTimer targetDate="2026-02-19T00:00:00" />
                                    </motion.div>

                                    {/* Break the Prism Button */}
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.0, duration: 0.8 }}
                                        onClick={handleBreakPrism}
                                        className="mt-12 px-12 py-4 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00ffff] rounded-full text-white font-bold text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(255,0,128,0.5)] hover:shadow-[0_0_50px_rgba(255,0,128,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        Break the Prism
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Half */}
                        <motion.div
                            initial={{ opacity: 1, x: 0 }}
                            exit={{
                                x: '100%',
                                opacity: 0,
                                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                            }}
                            className="absolute inset-0 z-30 flex items-center justify-start overflow-hidden"
                            style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                        >
                            <div className="relative h-auto mt-25 flex flex-col items-center justify-center text-center px-4 pointer-events-none opacity-95 w-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="glass-panel p-8 md:p-16 rounded-[3rem] border border-white/10 bg-black/30 backdrop-blur-md pointer-events-auto max-w-5xl w-full mx-auto shadow-[0_0_50px_rgba(100,0,100,0.3)]"
                                >
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                        className="text-6xl md:text-9xl font-black mb-4 tracking-tighter"
                                    >
                                        <span className="bg-clip-text text-transparent bg-linear-to-r from-[#ff0080] via-[#7928ca] to-[#ff0080] animate-gradient-x">
                                            ANTARAGNI
                                        </span>
                                    </motion.h1>

                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.8 }}
                                        className="text-2xl md:text-4xl font-light text-white tracking-[0.3em] uppercase mb-8"
                                    >
                                        <span className="text-cyan-400">Spectrum</span> Saga
                                    </motion.h2>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
                                    >
                                        Immerse yourself in the prism of possibilities. <br />
                                        Where every color tells a story of courage and creativity.
                                    </motion.p>

                                    <motion.h1 className="text-2xl text-gray-400">
                                        The <span className="text-cyan-400 font-bold">SAGA</span> BEGINS IN
                                    </motion.h1>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    >
                                        <CountdownTimer targetDate="2026-02-19T00:00:00" />
                                    </motion.div>

                                    {/* Break the Prism Button */}
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.0, duration: 0.8 }}
                                        onClick={handleBreakPrism}
                                        className="mt-12 px-12 py-4 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00ffff] rounded-full text-white font-bold text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(255,0,128,0.5)] hover:shadow-[0_0_50px_rgba(255,0,128,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        Break the Prism
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>





            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 z-20"
            >
                <div className="w-px h-16 bg-linear-to-b from-cyan-400 to-transparent mx-auto" />
            </motion.div>
        </section>
    );
}
