"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        title: "자격증공장 특화 학습관리시스템",
        text: "자체 개발한 앱을 통해 스스로 정한 계획과 결과를 중앙 본부와 공유하여 진도 상담을 받을 수 있고, 타 수험자의 계획과 결과도 참고함으로써 본인의 공부 속도를 가늠해 혼자 하는 공부가 아니라는 느낌을 줍니다.",
        image: "/benefits_ui.png",
        layout: "left" // Image on left for desktop
    },
    {
        id: 2,
        type: 'feature',
        title: "회사원 같은 자율 휴무 시스템",
        text: "쉬는 날을 평일과 주말 구분 없이 스스로 정하여 중앙 본부에 보고하고 사용하는 구조로, 자신의 컨디션과 공부 계획에 따라 자유롭게 이용할 수 있습니다.",
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
        footer: "공부 외 할 일은 모두 자격증공장이 신속하게 처리해줌으로써, 오직 공부만 하면 되는 편안한 환경을 제공합니다.",
        image: "/benefits_cleaning.jpg",
        layout: "center"
    },
    {
        id: 4,
        type: 'centered',
        title: "합격하는 올바른 공부법으로 단기 합격",
        subtitle: "열심히만 한다고 합격하진 않습니다.\n핵심은 점수로 이어지는 올바른 공부법!\n\n합격자 공부법 그대로 꾸준히 실천할 수 있도록 지속적 개인 모니터링과 1:1 원격상담을 시험날까지 지원합니다.",
        items: [
            "실제 자격증공장 수험자의 합격 공부법을 그대로 전수",
            "자격증공장 자체 제작 학습 자료 제공"
        ]
    }
];

export default function Benefits() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [imageIndex, setImageIndex] = useState(0); // For Image Carousel
    const containerRef = useRef(null);

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
        setPage(([prev]) => [prev + newDirection, newDirection]);
        setImageIndex(0); // Reset carousel when changing slides
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
            id="benefits"
            className="relative h-full w-full overflow-hidden bg-slate-50 text-slate-900 font-sans group"
        >
            {/* Navigation Buttons - Visible only on desktop */}
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
                        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-6 px-6 pb-20 pt-8 md:flex-row md:items-center md:gap-14 md:px-14 md:pb-16 md:pt-10">
                            <div className="w-full text-center md:max-w-[460px] md:text-left">
                                <motion.h2
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-3xl font-bold leading-tight tracking-tight text-[#267E82] break-keep md:text-5xl lg:text-6xl"
                                >
                                    {slides[currentIndex].title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="mx-auto mt-3 text-sm leading-relaxed text-slate-500 break-keep md:mx-0 md:mt-4 md:text-lg"
                                >
                                    전문직 자격증 준비하는 성인 수험생들이 <br className="md:hidden" />
                                    스스로 계획하고 성취하게 함으로써 <br className="md:hidden" />
                                    할 수 있다는 자신감을 심어줍니다.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                    className="mt-4 flex cursor-pointer items-center justify-center gap-2 text-sm font-semibold text-slate-400 md:mt-5 md:justify-start md:text-base"
                                    onClick={() => paginate(1)}
                                >
                                    오른쪽으로 넘기기 →
                                </motion.p>
                            </div>

                            <div className="relative mx-auto h-[clamp(260px,42vh,440px)] w-full max-w-[640px] shrink-0 md:h-[clamp(320px,56vh,560px)]">
                                <motion.div
                                    initial={{ opacity: 0, x: -50, rotate: -16 }}
                                    animate={{ opacity: 1, x: 0, rotate: -7 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="absolute bottom-[1%] left-[4%] z-10 h-[82%] w-[34%] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                                >
                                    <Image
                                        src="/intro_fan_left_final.png"
                                        alt="Rest Plan UI"
                                        fill
                                        className="object-contain opacity-95"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50, rotate: 16 }}
                                    animate={{ opacity: 1, x: 0, rotate: 7 }}
                                    transition={{ delay: 1.0, duration: 0.6 }}
                                    className="absolute bottom-[1%] right-[4%] z-10 h-[82%] w-[34%] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                                >
                                    <Image
                                        src="/intro_fan_right_final.png"
                                        alt="Work Plan UI"
                                        fill
                                        className="object-contain opacity-95"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 0.6 }}
                                    className="absolute bottom-0 left-1/2 z-20 h-full w-[40%] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl"
                                >
                                    <Image
                                        src="/intro_fan_center_final.png"
                                        alt="Main Feature UI"
                                        fill
                                        className="object-contain opacity-100"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    ) : slides[currentIndex].type === 'list' ? (
                        <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center gap-6 px-5 pb-20 pt-8 md:gap-8 md:px-10 md:pb-16 md:pt-10">
                            {/* List Container with Background Image */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative h-auto w-full max-w-[360px] overflow-hidden rounded-3xl bg-white px-6 py-8 shadow-xl md:max-w-[560px] md:px-12 md:py-10"
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
                                            className="flex items-center gap-3 rounded-xl bg-white/80 p-3 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm md:text-sm"
                                        >
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#267E82] text-white">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

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
                                    className="text-sm md:text-base text-slate-600 leading-relaxed font-medium whitespace-normal md:whitespace-pre-line break-keep"
                                >
                                    {slides[currentIndex].footer}
                                </motion.p>
                            </div>
                        </div>
                    ) : slides[currentIndex].type === 'centered' ? (
                        <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 px-5 pb-20 pt-8 md:gap-8 md:px-12 md:pb-16 md:pt-10">
                            {/* Features Cards */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="z-10 flex w-full max-w-5xl flex-col justify-center gap-4 md:flex-row md:gap-6"
                            >
                                {(slides[currentIndex].items as string[])?.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="flex flex-1 flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl md:p-8"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#267E82]/10 text-[#267E82] md:h-14 md:w-14">
                                            <Check size={24} strokeWidth={3} />
                                        </div>
                                        <p className="text-sm font-bold leading-snug text-slate-800 break-keep md:text-lg">
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>

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
                                    className="text-sm md:text-base text-slate-600 leading-relaxed font-medium whitespace-normal md:whitespace-pre-line break-keep"
                                >
                                    {slides[currentIndex].subtitle}
                                </motion.p>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-4 px-5 pb-20 pt-8 md:flex-row md:items-center md:gap-12 md:px-12 md:pb-16 md:pt-10">

                            <div
                                className={`order-2 z-10 flex w-full flex-1 flex-col justify-center space-y-3 px-2 text-center md:space-y-5 md:px-0 md:text-left ${slides[currentIndex].layout === "right"
                                        ? "md:order-1 md:items-start"
                                        : "md:order-2 md:items-start"
                                    }`}
                            >
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl font-bold leading-tight text-slate-800 whitespace-pre-line md:text-3xl lg:text-4xl"
                                >
                                    {slides[currentIndex].title}
                                </motion.h3>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-sm leading-relaxed text-slate-600 break-keep md:text-base"
                                >
                                    {slides[currentIndex].text}
                                </motion.p>
                            </div>

                            <div
                                className={`relative order-1 flex h-[clamp(260px,44vh,460px)] w-full flex-1 items-center justify-center md:h-[clamp(320px,58vh,620px)] ${slides[currentIndex].layout === "right" ? "md:order-2" : "md:order-1"
                                    }`}
                            >
                                <div className="relative mx-auto h-full w-full max-w-[760px]">
                                    {slides[currentIndex].images ? (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <motion.div
                                                key={slides[currentIndex].images[imageIndex]}
                                                className="relative h-[92%] w-[88%] overflow-hidden rounded-xl bg-white shadow-lg md:h-[84%] md:w-[82%] md:rounded-2xl"
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3, duration: 0.6 }}
                                            >
                                                <Image
                                                    src={slides[currentIndex].images[imageIndex]}
                                                    alt={`Feature UI ${imageIndex + 1}`}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </motion.div>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                                                {slides[currentIndex].images.map((_, idx) => (
                                                    <button
                                                        type="button"
                                                        key={idx}
                                                        onClick={() => setImageIndex(idx)}
                                                        className={`h-1.5 w-5 rounded-full transition-colors ${idx === imageIndex ? "bg-[var(--color-primary)]" : "bg-slate-300"
                                                            }`}
                                                        aria-label={`Switch image ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <Image
                                                src={slides[currentIndex].image!}
                                                alt="Feature UI"
                                                fill
                                                className="object-contain px-2 drop-shadow-2xl md:px-4"
                                                priority
                                            />
                                        </div>
                                    )}
                                </div>
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
        </section>
    );
}
