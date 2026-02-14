"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
    {
        id: 0,
        type: 'intro',
        title: "자격증공장에 오면 누리는 행복",
        sub: ""
    },
    {
        id: 1,
        type: 'feature',
        title: "매일 아침 건강 선식 제공",
        text: "선식은 익힌 곡물로 소화에 용이하며 아침 뇌기능 활성에 도움",
        image: "/benefits_food.jpg",
        layout: "right"
    },
    {
        id: 2,
        type: 'feature',
        title: "모모스커피와 함께하는 공부",
        text: "바리스타 대회 1등 모모스커피 에스쇼콜라 블렌드 스페셜티 원두와 함께하는 고급스러운 공부",
        image: "/benefits_coffee.jpg",
        layout: "left"
    },
    {
        id: 3,
        type: 'feature',
        title: "건강 간식 제공",
        text: "오븐에 구운 감자, 고구마, 단호박, 삶은 달걀로 운동 없이도 살찌지 않는 건강 수험 생활",
        image: "/benefits_healthy_food.jpg",
        layout: "right"
    },
    {
        id: 4,
        type: 'feature',
        title: "뷔페급 신선 과일 제공",
        text: "다양한 과일을 통한 비타민 섭취와 스트레스 완화로 활기찬 전문직 수험생활",
        image: "/benefits_fruits.jpg",
        layout: "left"
    },
    {
        id: 5,
        type: 'feature',
        title: "편의점 갈 일 없이 공부만",
        text: "오븐에 갓 구운 빵과 크림치즈, 다양한 잼으로 허기질 땐 언제든 에너지 보충\n\n편의점급 음료수와 각종 유제품으로 편의점 갈 일 없이 공부만!",
        image: "/benefits_bread.png",
        layout: "right"
    },
    {
        id: 6,
        type: 'feature',
        title: "스트레스 해소 매운라면",
        text: "먹고싶은 라면 계란 퐁당 넣어 언제든 무제한 제공, 공부하다 스트레스 받을 땐 매운 라면으로 한 끼 뚝딱!",
        image: "/benefits_ramen.jpg",
        layout: "left"
    }
];

// Add props interface
export default function Happiness() {
    const [[page, direction], setPage] = useState([0, 0]);
    const containerRef = useRef(null);

    const currentIndex = (page % slides.length + slides.length) % slides.length;

    const paginate = useCallback((newDirection: number) => {
        setPage(([prev]) => [prev + newDirection, newDirection]);
    }, []);

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
        <section
            ref={containerRef}
            id="happiness"
            className="relative h-full w-full overflow-hidden bg-white text-slate-900 font-sans group"
        >
            {/* Navigation Buttons */}
            <button
                onClick={() => paginate(-1)}
                className="hidden md:block absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-300 hover:text-[#267E82] transition-colors cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
            </button>

            <button
                onClick={() => paginate(1)}
                className="hidden md:block absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-300 hover:text-[#267E82] transition-colors cursor-pointer"
                aria-label="Next slide"
            >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
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
                    className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                    {slides[currentIndex].type === 'intro' ? (
                        <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-6 pb-20 pt-8 text-center md:px-10 md:pb-16 md:pt-10">
                            <motion.h2
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="mb-6 text-3xl font-bold tracking-tight text-[#267E82] whitespace-pre-line md:mb-8 md:text-5xl lg:text-6xl"
                            >
                                {slides[currentIndex].title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="flex cursor-pointer items-center justify-center gap-2 text-base font-medium text-slate-400 md:text-xl"
                                onClick={() => paginate(1)}
                            >
                                오른쪽으로 넘기기 →
                            </motion.p>
                        </div>
                    ) : (
                        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-4 px-5 pb-20 pt-8 md:flex-row md:items-center md:gap-12 md:px-12 md:pb-16 md:pt-10">
                            <div
                                className={`relative order-1 flex h-[clamp(260px,44vh,470px)] w-full flex-1 items-center justify-center md:h-[clamp(320px,56vh,600px)] ${slides[currentIndex].layout === "right" ? "md:order-2" : "md:order-1"
                                    }`}
                            >
                                <div className="relative mx-auto h-full w-full max-w-[620px]">
                                    <Image
                                        src={slides[currentIndex].image!}
                                        alt="Feature"
                                        fill
                                        className="object-contain px-2 drop-shadow-2xl md:px-4"
                                        priority
                                    />
                                </div>
                            </div>

                            <div
                                className={`order-2 z-10 flex w-full flex-1 flex-col justify-center space-y-3 px-2 text-center md:space-y-6 md:px-0 md:text-left ${slides[currentIndex].layout === "right"
                                        ? "md:order-1 md:items-start"
                                        : "md:order-2 md:items-start"
                                    }`}
                            >
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl font-bold leading-tight text-slate-800 whitespace-pre-line md:text-4xl lg:text-5xl"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-sm leading-relaxed text-slate-600 whitespace-pre-line"
                                >
                                    {slides[currentIndex].text}
                                </motion.p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Background Decoration for Intro Slide */}
            {
                slides[currentIndex].type === 'intro' && (
                    <div className="absolute inset-0 z-[-1] opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#267E82] to-transparent" />
                    </div>
                )
            }

            {/* Local Slide Counter & Navigation (Mobile) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-auto">
                <button
                    onClick={() => paginate(-1)}
                    className="p-2 text-slate-400 hover:text-[#267E82] transition-colors md:hidden"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <span className="text-[#267E82] text-xs md:text-sm font-semibold opacity-80 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentIndex + 1} / {slides.length}
                </span>

                <button
                    onClick={() => paginate(1)}
                    className="p-2 text-slate-400 hover:text-[#267E82] transition-colors md:hidden"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section >
    );
}
