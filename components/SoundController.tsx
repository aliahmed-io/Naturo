"use client";

import { useState } from "react";
import useSound from "use-sound";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundController() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Note: You need to add 'forest-ambience.mp3' to public/sounds/
    const [play, { stop }] = useSound("/sounds/forest-ambience.mp3", {
        loop: true,
        volume: 0.5,
        interrupt: true
    });

    const toggleSound = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    return (
        <button
            onClick={toggleSound}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#1B3022]/80 backdrop-blur-md text-[#E5D3B3] border border-[#E5D3B3]/20 hover:scale-110 transition-all duration-300 shadow-2xl group"
            aria-label="Toggle Sound"
        >
            {isPlaying ? (
                <Volume2 className="w-6 h-6 animate-pulse" />
            ) : (
                <VolumeX className="w-6 h-6 opacity-70 group-hover:opacity-100" />
            )}
        </button>
    );
}
