import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";

import StarBackground from "@/components/ui/StarBackground";

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
});

const rajdhani = Rajdhani({
    variable: "--font-rajdhani",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
    title: "Antaragni 2026 | Saga Spectrum",
    description: "Official website of Antaragni 2026, the national level cultural festival of GHRCEN.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${rajdhani.variable} ${orbitron.variable} antialiased bg-black text-white min-h-screen flex flex-col font-sans`}
            >
                <StarBackground />
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
