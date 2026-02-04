"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Image from "next/image";

const slides = [
    {
        id: 0,
        type: 'intro',
        title: "성인자기주도학습관리",
        sub: ""
    },
    {
        id: 1,
        type: 'feature',
        title: "체계적인\n학습 관리 시스템",
        text: "스스로 계획 설정과 결과를 기록하며\n성취감 향상,\n타 수험자의 계획과 비교하며\n혼자하는 공부가 아니게 느낌",
        image: "/benefits_ui.png",
        layout: "left" // Image on left for desktop
    },
    {
        id: 2,
        type: 'feature',
        title: "회사원 같은\n자율 휴무 시스템",
        text: "회사원 같이 스스로 쉬는 날을 정하여\n중앙 본부에 보고하고,\n쉬는 날은 자신의 컨디션과\n공부 계획에 따라 자유롭게 사용",
        image: "/benefits_ui_2.png",
        layout: "right"
    },
    {
        id: 3,
        type: 'list',
        title: "공부 외\n방해요소 제거",
        items: [
            "개인 책상 청소",
            "아침마다 음료 서빙",
            "개인 도시락 식기 텀블러 세척",
            "인쇄 무료",
            "간식 음료 언제든 무제한"
        ],
        footer: "공부 외 그 어느것도\n신경쓰지 않아도 되는 자격증공장만의 시스템",
        layout: "left"
    },
    {
        id: 4,
        type: 'centered',
        title: "합격자들의 공부법\n구경만 하셨나요?",
        subtitle: "1:1 원격 상담으로\n시험날까지 끊기지 않게\n합격자 공부법 그대로\n실천하게 만들어 드립니다",
        items: [
            "실제 자격증공장 수험자의 합격 공부법을 그대로 전수",
            "자격증공장 자체 제작 학습 자료 제공"
        ]
    }
];

export default function Benefits() {
    const [[page, direction], setPage] = useState([0, 0]);
    const DURATION = 5000;
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

    const currentIndex = (page % slides.length + slides.length) % slides.length;

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
            zIndex: 1
        }),
        center: {
            x: 0,
            opacity: 1,
            zIndex: 0
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            zIndex: 0
        })
    };

    const transitionSettings = {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
    };

    return (
        <section ref={containerRef} id="benefits" className="relative h-full w-full overflow-hidden bg-white text-slate-900 group">
            {/* Navigation Buttons - Hidden on Mobile, Visible on Desktop */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-300 hover:text-[#267E82] transition-colors cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button
                onClick={() => paginate(1)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-300 hover:text-[#267E82] transition-colors cursor-pointer"
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
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x;
                        const swipeConfidenceThreshold = 10000;
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
                >
                    {slides[currentIndex].type === 'intro' ? (
                        // INTRO SLIDE
                        <div className="text-center px-6">
                            <motion.h2
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#267E82] tracking-tight mb-8"
                            >
                                {slides[currentIndex].title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="text-lg md:text-xl text-slate-400 font-medium cursor-pointer flex items-center justify-center gap-2"
                                onClick={() => paginate(1)}
                            >
                                오른쪽으로 넘기기 →
                            </motion.p>
                        </div>
                    ) : slides[currentIndex].type === 'list' ? (
                        // LIST SLIDE
                        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-16 lg:p-24 gap-8 md:gap-16">
                            {/* Text/List Container - Centered or Split if we had an image. Since no image, let's Center it for impact, or keep split structure for consistency if desired. User asked for specific list style. Let's center it for now as it's text heavy. */}
                            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-8 z-10">
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 whitespace-pre-line leading-tight"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>

                                <div className="flex flex-col gap-4 w-full max-w-md mx-auto items-center">
                                    {(slides[currentIndex].items as string[])?.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 + (i * 0.1) }}
                                            className="flex items-center gap-3 text-lg md:text-2xl text-slate-700 font-medium text-left md:text-center w-fit"
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#267E82]/10 flex items-center justify-center text-[#267E82]">
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="text-base md:text-lg text-[#267E82] font-bold whitespace-pre-line mt-4"
                                >
                                    {slides[currentIndex].footer}
                                </motion.p>
                            </div>
                        </div>
                    ) : slides[currentIndex].type === 'centered' ? (
                        // CENTERED SLIDE (Clean text hierarchy)
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-16 lg:p-24 px-16 md:px-24">
                            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-6 md:space-y-8 z-10">
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 whitespace-pre-line leading-tight"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl md:text-2xl text-slate-600 leading-relaxed whitespace-pre-line"
                                >
                                    {slides[currentIndex].subtitle}
                                </motion.p>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4"
                                >
                                    {(slides[currentIndex].items as string[])?.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 px-4 py-2 bg-[#267E82]/10 rounded-full text-[#267E82] font-semibold text-sm md:text-base"
                                        >
                                            <Check size={16} strokeWidth={3} />
                                            {item}
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    ) : (
                        // FEATURE SLIDE
                        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-16 gap-8 md:gap-12 max-w-6xl mx-auto">

                            {/* Image Container */}
                            <div className={`relative w-full md:flex-1 h-[40vh] md:h-[60vh] flex items-center justify-center order-2 ${slides[currentIndex].layout === 'right' ? 'md:order-2' : 'md:order-1'}`}>
                                <div className="relative w-full h-full max-h-[500px] max-w-[500px] mx-auto">
                                    <Image
                                        src={slides[currentIndex].image!}
                                        alt="Feature UI"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Text Container */}
                            <div className={`w-full md:flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6 order-1 ${slides[currentIndex].layout === 'right' ? 'md:order-1 md:items-start md:text-left' : 'md:order-2 md:items-start md:text-left'} z-10 px-4 md:px-0`}>
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 whitespace-pre-line leading-tight"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg md:text-2xl text-slate-600 leading-relaxed whitespace-pre-line"
                                >
                                    {slides[currentIndex].text}
                                </motion.p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Background Decoration for Intro Slide */}
            {slides[currentIndex].type === 'intro' && (
                <div className="absolute inset-0 z-[-1] opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#267E82] to-transparent" />
                </div>
            )}
        </section>
    );
}
