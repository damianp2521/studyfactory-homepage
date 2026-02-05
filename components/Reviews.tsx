"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Review {
    id: number;
    text: string;
    sub: string;
    highlight?: boolean;
    author?: string;
    type?: "link";
    url?: string;
}

const reviews: Review[] = [
    {
        id: 0,
        text: "다녀본 사람들의 생생한 리뷰",
        sub: "",
        highlight: true
    },
    {
        id: 1,
        text: "자격증공장 다니면서 국가직 7급 교정직 합격했습니다.",
        sub: "사장님께서 매번 상주해 계시니 분위기가 흐트러질 일이 없고 매일 긴장감 있는 상태에서 공부할 수 있습니다. 공부하다 멘탈이 흔들릴 때마다 사장님께서 해주신 조언들이 수험생활을 버티는 데 정말 큰 힘이 되었습니다.",
        author: "b3*** 님"
    },
    {
        id: 2,
        text: "경찰청 주관 2025년 제1차 경찰공무원 최종 합격",
        sub: "블로그 추천글을 보고 등록했는데, 정해진 시간에 맞춰 공부량을 확보할 수 있었고 무엇보다 철저한 휴대폰 관리 덕분에 순공 시간이 비약적으로 늘었습니다. 허리가 아플 때 의자 추천부터 멘탈 케어까지, 단순 독서실 그 이상의 관리를 받았습니다.",
        author: "ssw*** 님"
    },
    {
        id: 3,
        text: "2025년 제62회 세무사 2차 합격",
        sub: "1차 시작부터 2차 합격까지 자격증공장과 함께했습니다. 중간에 다른 곳도 가봤지만 결국 다시 돌아오게 되더군요. 다 같이 치열하게 공부하는 분위기와 사장님의 열정적인 관리는 서울의 유명 학원 못지않습니다. 돈과 시간을 아끼는 지름길입니다.",
        author: "joj*** 님"
    },
    {
        id: 4,
        text: "부산광역시 2024년도 하반기 공공기관 통합채용 최종 합격",
        sub: "관리형 독서실은 처음이었는데 시설이 정말 좋습니다. 개인 좌석, 스탠딩석 등 공부하기 최적의 환경이고, 소음에 예민한 편인데 불편사항 발생 시 사장님께서 즉각 조치해주셔서 오직 공부에만 집중할 수 있었습니다.",
        author: "Lp9*** 님"
    },
    {
        id: 5,
        text: "식물보호기사, 한능검 1급, 토익스피킹 AL 달성",
        sub: "미루기 달인이었던 제가 등록 3일 만에 기사 필기에 합격했습니다. '한 달만 해보자'는 마음으로 시작했는데, 열심히 공부하는 주변 분위기에 압도되어 토스, 한능검, 컴활까지 줄줄이 합격했네요. 여기가 진짜 '자격증 공장'입니다.",
        author: "vyw*** 님"
    },
    {
        id: 6,
        text: "더 많은 리뷰 보기",
        sub: "합격생들이 증명하는 자격증공장의 가치, 직접 확인해보세요.",
        type: "link",
        url: "https://m.place.naver.com/place/1050862828/review/visitor"
    }
];

// Add props interface
interface ReviewsProps {
    isActive?: boolean;
}

export default function Reviews({ isActive }: ReviewsProps) {
    const [[page, direction], setPage] = useState([0, 0]);
    const DURATION = 5000;
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

    // Reset to start when leaving the section
    useEffect(() => {
        if (!isActive) {
            const timer = setTimeout(() => {
                setPage([0, 0]);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isActive]);

    const currentIndex = (page % reviews.length + reviews.length) % reviews.length;

    const paginate = useCallback((newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

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
        <section ref={containerRef} id="reviews" className="relative h-full w-full overflow-hidden bg-slate-50 text-slate-900 group">
            {/* Navigation Buttons */}
            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Previous review"
            >
                <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button
                onClick={() => paginate(1)}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Next review"
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
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing"
                >
                    <div className="relative z-10 text-center max-w-2xl px-16 md:px-8 flex flex-col items-center">
                        {/* Conditional Rendering for Link Slide */}
                        {reviews[currentIndex].type === 'link' ? (
                            <Link href={reviews[currentIndex].url!} target="_blank" className="group/link flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-6 p-4 rounded-full bg-[#267E82]/10 text-[#267E82] group-hover/link:bg-[#267E82] group-hover/link:text-white transition-colors duration-300"
                                >
                                    <ExternalLink size={48} />
                                </motion.div>
                                <motion.h2
                                    className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 group-hover/link:text-[#267E82] transition-colors"
                                >
                                    {reviews[currentIndex].text}
                                </motion.h2>
                                <p className="text-lg text-slate-500">{reviews[currentIndex].sub}</p>
                            </Link>
                        ) : (
                            <>
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className={`font-bold mb-6 ${reviews[currentIndex].highlight ? 'text-4xl md:text-5xl text-[#267E82]' : 'text-2xl md:text-4xl text-slate-900'}`}
                                >
                                    {reviews[currentIndex].text}
                                </motion.h2>

                                {reviews[currentIndex].highlight && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                        className="text-lg md:text-xl text-slate-400 font-medium cursor-pointer flex items-center justify-center gap-2"
                                        onClick={() => paginate(1)}
                                    >
                                        오른쪽으로 넘기기 →
                                    </motion.p>
                                )}

                                {reviews[currentIndex].sub && (
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-xs md:text-sm text-slate-600 mb-8 leading-relaxed break-keep"
                                    >
                                        "{reviews[currentIndex].sub}"
                                    </motion.p>
                                )}

                                {reviews[currentIndex].author && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-sm font-bold text-[#267E82] bg-[#267E82]/10 px-3 py-1 rounded-full"
                                    >
                                        {reviews[currentIndex].author}
                                    </motion.span>
                                )}
                            </>
                        )}

                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
