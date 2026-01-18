"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
    const reviews = [
        {
            quote: "It’s like switching your brain to high-definition. The fog lifts, and the focus stays.",
            author: "Elena R.",
            role: "Creative Director"
        },
        {
            quote: "Finally, a mushroom blend that actually tastes good and dissolves properly. A staple.",
            author: "Marcus T.",
            role: "Wellness Coach"
        },
        {
            quote: "I replaced my afternoon espresso with Naturo. My sleep has never been better.",
            author: "Sarah J.",
            role: "Architect"
        }
    ];

    return (
        <section className="w-full bg-[#F5F1E8] py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center font-serif text-[#1B3022] text-3xl mb-20 italic"
                >
                    "The new standard for cognitive clarity."
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#1B3022]/10 pt-16">
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-[#1B3022] mb-6 text-xl leading-relaxed font-serif">
                                “{r.quote}”
                            </div>
                            <div>
                                <div className="font-sans font-bold text-[#1B3022] text-sm tracking-wide uppercase">{r.author}</div>
                                <div className="text-[#1B3022]/50 text-xs mt-1">{r.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
