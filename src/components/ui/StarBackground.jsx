"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { useRef } from "react";

function RotatingStars() {
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group ref={ref}>
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
        </group>
    );
}

export default function StarBackground() {
    const pathname = usePathname();

    // Don't render on contact page
    if (pathname?.includes("/contact")) {
        return null;
    }

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <RotatingStars />
            </Canvas>
        </div>
    );
}
