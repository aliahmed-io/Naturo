"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const frameCount = 192;
const images: HTMLImageElement[] = [];

// Preload function
const preloadImages = () => {
    // We already moved images to /sequence/ezgif-frame-*.jpg
    // Filenames are 1-indexed: 001 to 192.
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        img.src = src;
        images.push(img);
    }
};

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress for smoother playback
    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

    // Current frame index (0 to frameCount - 1)
    const currentIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        preloadImages();
        // Simulate a small loading time or wait for critical images
        const timeout = setTimeout(() => setIsLoading(false), 2000);

        // Better: Wait for first few images to load? 
        // For now, simple timeout + "loading..." check.

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const render = (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const safeIndex = Math.min(Math.max(Math.floor(index), 0), frameCount - 1);
            const img = images[safeIndex];

            if (!img || !img.complete) return;

            // Draw cover logic
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        const unsubscribe = currentIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render loop to catch loaded images
        const animationFrame = requestAnimationFrame(function loop() {
            render(currentIndex.get());
            requestAnimationFrame(loop);
        });

        return () => {
            unsubscribe();
            cancelAnimationFrame(animationFrame);
        };
    }, [currentIndex]);

    return (
        <div ref={containerRef} className="relative h-[600vh]"> {/* Extremely tall container to drive scroll */}
            {isLoading && (
                <div className="fixed inset-0 z-[100] bg-[#E5D3B3] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-[#1B3022]/20 border-t-[#1B3022] rounded-full animate-spin mb-4" />
                    <span className="font-serif text-[#1B3022] text-xl animate-pulse">Loading Experience...</span>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="sticky top-0 left-0 w-full h-screen object-cover z-0"
            />

            {/* Overlay Content - Positioned absolutely based on scroll sections */}
            {/* We will handle actual content overlays in the parent or a sibling component 
                that shares the same scroll context, or just standard sticking. 
                For now, let's put them inside to ensure they sync with height. */}

            <ScrollSections />
        </div>
    );
}

function ScrollSections() {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            {/* Section 1: Intro (0-20%) */}
            <div className="absolute top-[5%] left-0 w-full flex flex-col items-center text-center opacity-0 animate-in fade-in fill-mode-forwards" style={{ animationTimeline: "view()", animationRange: "entry 0% exit 20%" }}>
                {/* Note: Native ViewTimeline support is partial, but we are using framer-motion in parent. 
                Let's use static positioning for simplicity effectively overlaying the canvas at correct 'vh' marks.
            */}
            </div>

            {/* 
               Better approach for text: 
               Just standard absolute positioning at % of the parent height.
               Since parent is 600vh:
               0-100vh: Start
               100-250vh: Bio-journey
               250-450vh: Origin
               450-600vh: End
             */}

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-[40vh] left-0 w-full flex flex-col items-center text-center px-4"
            >
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1B3022] mb-4 tracking-tight">Naturo</h1>
                <p className="text-xl md:text-2xl font-sans text-[#1B3022]/80 max-w-lg">Potency by Nature.<br /><span className="text-base opacity-70">5 Ancient Mushrooms. One Powerful Blend.</span></p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-20%" }} // Trigger when near center
                className="absolute top-[180vh] left-0 md:left-20 max-w-xl px-6"
            >
                <span className="text-[#1B3022] font-mono text-xs tracking-widest uppercase mb-2 block">01 — The Method</span>
                <h2 className="text-5xl font-serif font-medium text-[#1B3022] mb-6">Extraction, Perfected.</h2>
                <p className="text-lg font-sans text-[#1B3022]/80 leading-relaxed">
                    We don&apos;t just grind mushrooms. We dual-extract them to unlock the compounds your brain and body actually crave.
                    <br />
                    <span className="block mt-4 text-[#D07F62] italic">Bio-availability at its peak.</span>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-20%" }}
                className="absolute top-[350vh] right-0 md:right-20 max-w-xl px-6 text-right"
            >
                <span className="text-[#F4C430] font-mono text-xs tracking-widest uppercase mb-2 block">02 — The Source</span>
                <h2 className="text-5xl font-serif font-medium text-white mb-6 drop-shadow-lg">Sourced from the Silence.</h2>
                <p className="text-lg font-sans text-white/90 leading-relaxed drop-shadow-md">
                    Wild-harvested and organic. From the deep woods to your morning ritual. No fillers, no grains, just the forest’s finest.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-[520vh] left-0 w-full flex flex-col items-center text-center px-4"
            >
                <h2 className="text-6xl md:text-7xl font-serif font-bold text-white mb-8 drop-shadow-xl text-balance">Think Clearer.<br />Live Deeper.</h2>
                <button className="bg-[#1B3022] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white hover:text-[#1B3022] transition-all hover:scale-105 shadow-2xl">
                    Experience Naturo
                </button>
            </motion.div>

        </div>
    );
}
