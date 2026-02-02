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

            <div className="max-w-4xl text-center space-y-6 z-10 relative px-6">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-[#267E82] font-medium tracking-wider text-sm md:text-base mb-4"
                >
                    전문자격 생활관리센터 | 성인관리형독서실
                </motion.p>

                {/* Three-line tagline from intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-2"
                >
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600">
                        행복한 수험생활이 합격이 되는
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#267E82] to-[#1A5F62]">
                        자격증공장의 마법
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600">
                        지금 시작합니다.
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-slate-500 text-base md:text-lg mt-8 max-w-2xl mx-auto"
                >
                    자격증공장에서 최상의 몰입을 경험하세요.
                    <br /> 당신의 합격을 위한 모든 것이 준비되어 있습니다.
                </motion.p>
            </div>
        </section>
    );
}
