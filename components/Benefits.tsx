"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
        title: "자격증공장\n특화 학습관리시스템",
        text: "자체 개발한 앱을 통해\n스스로 정한 계획과 결과를 중앙 본부와 공유하여\n진도 상담을 받을 수 있고,\n타 수험자의 계획과 결과도 참고함으로써\n본인의 공부 속도를 가늠해\n혼자 하는 공부가 아니라는 느낌을 줍니다.",
        image: "/benefits_ui.png",
        layout: "left" // Image on left for desktop
    },
    {
        id: 2,
        type: 'feature',
        title: "회사원 같은\n자율 휴무 시스템",
        text: "쉬는 날을 평일과 주말 구분 없이 스스로 정하여\n중앙 본부에 보고하고 사용하는 구조로,\n자신의 컨디션과 공부 계획에 따라\n자유롭게 이용할 수 있습니다.",
        image: "/benefits_ui_2.png", // Fallback
        images: ["/benefits_carousel_1.png", "/benefits_carousel_2.png", "/benefits_carousel_3.png"],
        layout: "right"
    },
    {
        id: 3,
        type: 'list',
        title: "최상의 몰입 환경 제공",
        items: [
            "개인 책상 청소",
            "아침마다 음료 서빙",
            "개인 도시락 식기 텀블러 세척",
            "인쇄 무료",
            "간식 음료 언제든 무제한"
        ],
        footer: "공부 외 할 일은 모두 자격증공장이 신속하게 처리해줌으로써,\n오직 공부만 하면 되는 편안한 환경을 제공합니다.",
        image: "/benefits_cleaning.jpg",
        layout: "center"
    },
    {
        id: 4,
        type: 'centered',
        title: "합격하는 올바른 공부법으로\n단기 합격",
        subtitle: "열심히만 한다고 합격하진 않습니다.\n핵심은 점수로 이어지는 올바른 공부법!\n\n합격자 공부법 그대로 꾸준히 실천할 수 있도록\n지속적 개인 모니터링과 1:1 원격상담을\n시험날까지 지원합니다.",
        items: [
            "실제 자격증공장 수험자의 합격 공부법을 그대로 전수",
            "자격증공장 자체 제작 학습 자료 제공"
        ]
    }
];

// Add props interface
interface BenefitsProps {
    isActive?: boolean;
}

export default function Benefits({ isActive }: BenefitsProps) {
    const [[page, direction], setPage] = useState([0, 0]);
    const [imageIndex, setImageIndex] = useState(0); // For Image Carousel
    const DURATION = 5000;
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

    // Reset to start when leaving the section
    useEffect(() => {
        if (!isActive) {
            const timer = setTimeout(() => {
                setPage([0, 0]);
                setImageIndex(0); // Reset carousel
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isActive]);

    const currentIndex = (page % slides.length + slides.length) % slides.length;

    // Carousel Effect
    useEffect(() => {
        if (slides[currentIndex].images && slides[currentIndex].images.length > 1) {
            const interval = setInterval(() => {
                setImageIndex((prev) => (prev + 1) % slides[currentIndex].images!.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [currentIndex]);

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
        setImageIndex(0); // Reset carousel when changing slides
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
        <section ref={containerRef} id="benefits" className="relative h-full w-full overflow-hidden bg-slate-50 text-slate-900 group">
            {/* Navigation Buttons - Visible on all devices, sized responsively */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-300 hover:text-[#267E82] transition-colors cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
            </button>

            <button
                onClick={() => paginate(1)}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-300 hover:text-[#267E82] transition-colors cursor-pointer"
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
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
                >
                    {slides[currentIndex].type === 'intro' ? (
                        // INTRO SLIDE
                        <div className="text-center px-12 md:px-6 md:pb-0">
                            <motion.h2
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#267E82] tracking-tight mb-8"
                            >
                                {slides[currentIndex].title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-slate-500 text-xs md:text-sm mb-12 md:mb-16 md:max-w-2xl mx-auto break-keep leading-relaxed text-center px-4 md:px-0"
                            >
                                전문직 자격증 준비하는 성인 수험생들이 <br className="md:hidden" />
                                스스로 계획하고 성취하게 함으로써 <br className="md:hidden" />
                                할 수 있다는 자신감을 심어줍니다.
                            </motion.p>
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
                        // LIST SLIDE (Updated Layout: List -> Title -> Text)
                        <div className="w-full h-full flex flex-col items-center justify-center px-12 py-6 md:p-12 lg:p-16 pb-20 md:pb-16 gap-6 md:gap-8">
                            {/* List Container with Background Image */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full max-w-[340px] md:max-w-[500px] h-auto rounded-3xl overflow-hidden shadow-xl bg-white flex items-center justify-center py-8 px-6 md:py-10 md:px-12"
                            >
                                {/* Background Image with Opacity */}
                                {slides[currentIndex].image && (
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={slides[currentIndex].image!}
                                            alt="Service Background"
                                            fill
                                            className="object-cover opacity-20"
                                        />
                                        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
                                    </div>
                                )}

                                {/* List Items (Foreground) */}
                                <div className="relative z-10 flex flex-col gap-3 md:gap-4 w-full">
                                    {(slides[currentIndex].items as string[])?.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className="flex items-center gap-3 text-xs md:text-sm text-slate-800 font-bold bg-white/80 p-3 rounded-xl shadow-sm backdrop-blur-sm"
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#267E82] flex items-center justify-center text-white">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Title & Text (Moved Below) */}
                            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-4 md:space-y-6 z-10 px-4 md:px-0">
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 whitespace-pre-line leading-tight"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium"
                                >
                                    {slides[currentIndex].footer}
                                </motion.p>
                            </div>
                        </div>
                    ) : slides[currentIndex].type === 'centered' ? (
                        // CENTERED SLIDE (Redesigned: Cards -> Title -> Text)
                        <div className="w-full h-full flex flex-col items-center justify-center px-12 py-6 md:p-16 lg:p-24 md:px-24 pb-20 md:pb-16 gap-8 md:gap-12">
                            {/* Features Cards */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-full max-w-4xl justify-center z-10"
                            >
                                {(slides[currentIndex].items as string[])?.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="flex-1 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-shadow"
                                    >
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#267E82]/10 flex items-center justify-center text-[#267E82]">
                                            <Check size={24} strokeWidth={3} />
                                        </div>
                                        <p className="text-sm md:text-lg font-bold text-slate-800 break-keep leading-snug">
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Title & Subtitle (Moved Below) */}
                            <div className="w-full max-w-2xl flex flex-col items-center text-center space-y-4 md:space-y-6 z-10 px-4 md:px-0">
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 whitespace-pre-line leading-tight"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium"
                                >
                                    {slides[currentIndex].subtitle}
                                </motion.p>
                            </div>
                        </div>
                    ) : (
                        // FEATURE SLIDE
                        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-12 py-6 md:p-16 md:pb-16 gap-4 md:gap-12 max-w-6xl mx-auto">

                            {/* Image Container */}
                            <div className={`relative w-full md:flex-1 h-[40vh] md:h-[60vh] flex items-center justify-center order-1 px-16 md:px-0 ${slides[currentIndex].layout === 'right' ? 'md:order-2' : 'md:order-1'}`}>
                                <div className="relative w-full h-full max-h-[400px] md:max-h-[500px] max-w-[300px] md:max-w-[500px] mx-auto">
                                    {/* Carousel or Static Image */}
                                    {slides[currentIndex].images ? (
                                        <div className="relative w-full h-full">
                                            <AnimatePresence initial={false}>
                                                <motion.div
                                                    key={imageIndex}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                                    className="absolute inset-0"
                                                >
                                                    <Image
                                                        src={slides[currentIndex].images[imageIndex]}
                                                        alt="Feature UI"
                                                        fill
                                                        className="object-contain drop-shadow-2xl"
                                                        priority
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Image
                                            src={slides[currentIndex].image!}
                                            alt="Feature UI"
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            priority
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Text Container */}
                            <div className={`w-full md:flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-6 order-2 ${slides[currentIndex].layout === 'right' ? 'md:order-1 md:items-start md:text-left' : 'md:order-2 md:items-start md:text-left'} z-10 px-16 md:px-0`}>
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 whitespace-pre-line leading-tight"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line md:whitespace-pre-line break-keep md:break-normal"
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
