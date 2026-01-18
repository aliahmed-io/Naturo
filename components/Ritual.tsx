"use client";

import { motion } from "framer-motion";
import { Coffee, RotateCw, Sparkles } from "lucide-react";

export default function Ritual() {
    const steps = [
        {
            icon: Coffee,
            title: "Scoop",
            desc: "Add one tsp to your coffee, smoothie, or tea."
        },
        {
            icon: RotateCw,
            title: "Stir",
            desc: "The ultrafine powder dissolves instantly. No clumps."
        },
        {
            icon: Sparkles,
            title: "Sip",
            desc: "Taste the balance. Feel the clarity unfold."
        },
    ];

    return (
        <section className="relative w-full bg-[#E5D3B3] py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

                {/* Left: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="md:w-1/3"
                >
                    <span className="text-[#1B3022] font-mono text-xs tracking-widest uppercase mb-4 block">The Daily Protocol</span>
                    <h2 className="text-5xl font-serif text-[#1B3022] mb-6">Effortless <br /> Integration.</h2>
                    <p className="text-lg text-[#1B3022]/70">
                        Designed for the modern workflow. No complex preparations, just pure potency ready when you are.
                    </p>
                </motion.div>

                {/* Right: Steps */}
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-0">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center p-8 border border-[#1B3022]/10 rounded-2xl bg-white/5 backdrop-blur-sm"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#1B3022] text-[#E5D3B3] flex items-center justify-center mb-6">
                                <step.icon size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-serif text-[#1B3022] mb-3">{step.title}</h3>
                            <p className="text-[#1B3022]/70 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
