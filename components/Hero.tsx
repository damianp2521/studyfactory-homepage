"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-full flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat opacity-100"
                    style={{ backgroundImage: 'url(/hero_bg.jpg)' }}
                />
                <div className="absolute inset-0 bg-white/90" /> {/* Overlay to ensure text readability */}
            </div>

            <div className="max-w-4xl text-center space-y-8 z-10 relative">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }} // Delay to allow curtain to lift
                    className="text-[#267E82] font-medium tracking-wider text-sm md:text-base mb-4"
                >
                    전문자격 생활관리센터 | 성인관리형독서실
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900"
                >
                    고통스러운 공부는 그만!
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#267E82] to-[#1A5F62]">
                        행복한 공부
                    </span>를 해야 합격한다.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-slate-500 text-lg md:text-xl mt-6 max-w-2xl mx-auto"
                >
                    자격증공장에서 최상의 몰입을 경험하세요.
                    <br /> 당신의 합격을 위한 모든 것이 준비되어 있습니다.
                </motion.p>
            </div>
        </section>
    );
}
