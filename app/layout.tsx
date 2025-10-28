import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "../components/LightRays";
import Navbar from "@/components/Navbar";

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const martianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DEV Event",
    description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
            >
                <Navbar />
                {/* usage part from docs */}
                <div
                    style={{
                        width: "100%",
                        height: "600px",
                        position: "relative",
                    }}
                >
                    <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
                        <LightRays
                            raysOrigin="top-center-offset"
                            raysColor="#5dfeca"
                            raysSpeed={0.9}
                            lightSpread={1.3}
                            rayLength={2.5}
                            followMouse={true}
                            mouseInfluence={0.02}
                            noiseAmount={0}
                            distortion={0.01}
                        />
                    </div>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
