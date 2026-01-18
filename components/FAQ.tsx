"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function FAQ() {
    const questions = [
        {
            q: "How does it taste?",
            a: "Earthy, smooth, and mild. It mimics the deep notes of cacao or roasted coffee, making it the perfect addition to your morning brew without overpowering it."
        },
        {
            q: "When will I feel the effects?",
            a: "Most users feel a shift in clarity within 20 minutes. Long-term benefits like immune support and stress resilience build compound over 2-3 weeks of daily use."
        },
        {
            q: "Is it safe during pregnancy?",
            a: "While our mushrooms are 100% organic, we always recommend consulting your healthcare provider before introducing new adaptogens during pregnancy."
        },
        {
            q: "What is the extraction ratio?",
            a: "We use a potent 8:1 dual-extraction process. This ensures both water-soluble (beta-glucans) and alcohol-soluble (triterpenes) compounds are bio-available."
        }
    ];

    return (
        <section className="w-full bg-[#E5D3B3] py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#1B3022] font-mono text-xs tracking-widest uppercase mb-4 block">Curiosities</span>
                    <h2 className="text-5xl font-serif text-[#1B3022]">Common Questions</h2>
                </div>

                <div className="border-t border-[#1B3022]/20">
                    {questions.map((item, i) => (
                        <Accordion key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Accordion({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#1B3022]/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <span className="text-xl font-serif text-[#1B3022] group-hover:text-[#D07F62] transition-colors">{question}</span>
                <Plus
                    className={`text-[#1B3022] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-[#1B3022]/70 leading-relaxed font-sans max-w-2xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
