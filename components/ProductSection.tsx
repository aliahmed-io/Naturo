"use client";

import { motion } from "framer-motion";

import dynamic from 'next/dynamic';

const Product3D = dynamic(() => import('./Product3D'), { ssr: false });

export default function ProductSection() {
    const mushrooms = [
        { name: "Lion's Mane", benefit: "Mental Clarity & Focus", desc: "The brain booster. Enhances cognitive function and nerve health." },
        { name: "Reishi", benefit: "Stress Support & Sleep", desc: "The grounding mushroom. Calms the nervous system and promotes deep rest." },
        { name: "Chaga", benefit: "Immune Defense", desc: "The antioxidant powerhouse. Protects against oxidative stress and aging." },
        { name: "Cordyceps", benefit: "Energy & Performance", desc: "The fuel. Increases oxygen uptake and natural sustained energy." },
        { name: "Turkey Tail", benefit: "Gut Health", desc: "The protector. Supports healthy digestion and gut microbiome balance." },
    ];

    return (
        <section className="relative w-full bg-[#1B3022] text-[#E5D3B3] pb-32 pt-20 rounded-t-[3rem] -mt-20 z-20">
            {/* Introduction */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-serif mb-6">Five Forces. One Ritual.</h2>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto font-sans">
                        Each mushroom is selected for its synergistic ability to optimize a specific aspect of your physiology.
                    </p>
                </motion.div>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                {mushrooms.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#F4C430]/30 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl group-hover:scale-110 transition-transform duration-500">
                            {i + 1}
                        </div>
                        <h3 className="text-2xl font-serif mb-2 text-[#F4C430]">{m.name}</h3>
                        <h4 className="text-sm font-sans uppercase tracking-widest opacity-60 mb-4">{m.benefit}</h4>
                        <p className="text-lg opacity-80 leading-relaxed">
                            {m.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Shop / CTA Section */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative aspect-square w-full max-w-md mx-auto bg-[#E5D3B3] rounded-full flex items-center justify-center overflow-hidden"
                    >
                        {/* 3D Product View */}
                        <div className="w-full h-full absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
                            <Product3D />
                        </div>

                        {/* Floating Elements / Spores */}
                        <motion.div
                            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#F4C430] rounded-full blur-sm"
                        />
                        <motion.div
                            animate={{ y: [0, 30, 0], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-[#D07F62] rounded-full blur-md"
                        />
                    </motion.div>
                </div>

                <div className="md:w-1/2 text-left">
                    <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                        Elevate your <br /> everyday.
                    </h2>
                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-3xl font-serif text-[#F4C430]">$49.00</span>
                        <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest">30 Servings</span>
                    </div>
                    <p className="text-lg opacity-80 mb-10 max-w-md">
                        A daily ritual for the modern mind. Dual-extracted, third-party tested, and 100% organic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-[#E5D3B3] text-[#1B3022] px-10 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#E5D3B3]/20">
                            Add to Cart
                        </button>
                        <button className="px-10 py-4 rounded-full text-lg font-medium border border-[#E5D3B3]/30 hover:border-[#E5D3B3] hover:bg-[#E5D3B3]/10 transition-all duration-300">
                            View Subscription
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
