"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 0,
        text: "Study Factory에 오면 누리는 행복",
        sub: "",
    },
    {
        id: 1,
        text: "최상의 면학 분위기",
        sub: "서로 자극받으며 성장하는 공간",
    },
    {
        id: 2,
        text: "철저한 출결 관리",
        sub: "나태해질 틈 없는 스파르타 시스템",
    },
    {
        id: 3,
        text: "쾌적한 학습 환경",
        sub: "공기청정기, 백색소음기 완비",
    }
];

export default function Benefits() {
    const [[page, direction], setPage] = useState([0, 0]);
    const DURATION = 4000; // 4.0 seconds per slide
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

    // We cycle the index based on the page number
    const currentIndex = (page % slides.length + slides.length) % slides.length;

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    // Variants for the slide animation - Direction Aware
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 1,
            zIndex: 1
        }),
        center: {
            x: 0,
            opacity: 1,
            zIndex: 0
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 1,
            zIndex: 0
        })
    };

    const transitionSettings = {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
    };

    return (
        <section ref={containerRef} id="benefits" className="relative h-full w-full overflow-hidden bg-slate-900 text-white group">
            {/* Navigation Buttons */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button
                onClick={() => paginate(1)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Next slide"
            >
                <ChevronRight size={48} strokeWidth={1} />
            </button>

            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transitionSettings}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                >
                    {/* Background Visual (Placeholder Gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-0">
                        {/* Semi-transparent overlay to ensure text readability */}
                        <div className="absolute inset-0 bg-black/30" />
                    </div>

                    <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            {slides[currentIndex].text}
                        </motion.h2>

                        {slides[currentIndex].sub && (
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-lg text-slate-300 mb-8"
                            >
                                {slides[currentIndex].sub}
                            </motion.p>
                        )}

                        {/* Progress Indicator */}
                        <div className="flex flex-col items-center gap-2 mt-12 w-full">
                            {/* Progress Bar Container - Narrower (w-24) */}
                            <div className="w-24 h-[2px] bg-slate-700 overflow-hidden rounded-full">
                                <motion.div
                                    key={page} // Reset animation on slide change
                                    initial={{ width: "0%" }}
                                    animate={{ width: isInView ? "100%" : "0%" }}
                                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                                    className="h-full bg-[#267E82]"
                                    onAnimationComplete={() => {
                                        if (isInView) paginate(1);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
