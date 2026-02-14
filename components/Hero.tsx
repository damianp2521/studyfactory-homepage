"use client";

import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAccessibleModal from "@/lib/useAccessibleModal";

const MAP_URL =
    "https://map.naver.com/p/directions/-/14372155.3537346,4187711.2060766,%EC%9E%90%EA%B2%A9%EC%A6%9D%EA%B3%B5%EC%9E%A5%20%EA%B4%80%EB%A6%AC%ED%98%95%EB%8F%85%EC%84%9C%EC%8B%A4,1199907214,PLACE_POI/-/transit?c=15.00,0,0,0,dh";

export default function Hero() {
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const closeModal = useCallback(() => {
        setIsIntroModalOpen(false);
    }, []);

    useAccessibleModal(isIntroModalOpen, modalRef, closeModal);

    return (
        <section
            id="hero"
            className="relative h-full flex flex-col items-center justify-center bg-[var(--color-surface)] overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat opacity-100"
                    style={{ backgroundImage: "url(/hero_bg.jpg)" }}
                />
                <div className="absolute inset-0 bg-white/90" />
            </div>

            <div className="max-w-4xl text-center space-y-3 md:space-y-6 z-10 relative px-6 md:pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-2"
                >
                    <p className="text-[var(--color-primary)] font-medium tracking-wider text-sm md:text-base mb-4 font-mono">
                        전문자격 학습관리센터 | 성인관리형독서실
                    </p>

                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600">
                        행복한 수험생활이 합격이 되는
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-strong)] leading-tight py-2">
                        자격증공장의 마법
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600">
                        지금 시작합니다.
                    </p>

                    <div className="text-slate-500 text-xs md:text-sm mt-6 md:mt-10 md:max-w-3xl mx-auto break-keep leading-relaxed text-center px-6 md:px-0 space-y-4">
                        <p>
                            자격증공장은 <span className="font-bold text-[var(--color-primary)]">중앙 컨트롤 센터</span>를 통해
                            <br className="md:hidden" />
                            전국 모든 지점의 면학 분위기를
                            <br className="md:hidden" />
                            실시간으로 모니터링하고 즉각적으로 통제합니다.
                        </p>
                        <p>
                            소음, 온도, 습도, 그리고 학습법까지
                            <br className="md:hidden" />
                            전국 어디의 수험생이든 자격증공장에서
                            <br className="md:hidden" />
                            가장 완벽한 몰입을 경험하게 됩니다.
                        </p>
                    </div>

                    <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                        <button
                            onClick={() => setIsIntroModalOpen(true)}
                            className="w-44 md:w-auto px-5 md:px-8 py-2 md:py-3 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full text-sm md:text-xl font-bold shadow-md hover:bg-[var(--color-primary)] hover:text-white transition-all"
                        >
                            센터 소개
                        </button>
                        <a
                            href={MAP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-44 md:w-auto px-5 md:px-8 py-2 md:py-3 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full text-sm md:text-xl font-bold shadow-md hover:bg-[var(--color-primary)] hover:text-white transition-all inline-block"
                        >
                            길찾기
                        </a>
                    </div>
                </motion.div>
            </div>

            {typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isIntroModalOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[140] flex items-center justify-center bg-black/50 p-4"
                                onClick={closeModal}
                            >
                                <motion.div
                                    ref={modalRef}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="자격증공장 소개"
                                    tabIndex={-1}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                                        aria-label="소개 모달 닫기"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-6 text-center">
                                        자격증공장이란?
                                    </h3>

                                    <div className="space-y-6 text-slate-700 leading-relaxed text-lg text-center font-medium">
                                        <p>
                                            몸은 힘들어도 마음은 편하게
                                            <br />
                                            <span className="text-[var(--color-primary)] font-bold">
                                                &apos;단순생산공장에 출근하 듯
                                                <br />
                                                뚝딱 자격증을 만들자&apos;
                                            </span>
                                            는
                                        </p>
                                        <p>
                                            전문직자격 수험자만을 대상으로 관리하는,
                                            <br />
                                            <span className="font-bold underline underline-offset-4 decoration-[var(--color-primary)]">
                                                성인생활학습관리센터
                                            </span>
                                            입니다.
                                            <br />
                                            <span className="text-sm text-slate-400 font-normal">
                                                (미성년자x, 재수생x)
                                            </span>
                                        </p>
                                        <p>
                                            많은 양의 난이도 높은 시험을 흔들리지 않고
                                            <br />
                                            꾸준히 준비해 단기에 합격 할 수 있도록
                                        </p>
                                        <div className="bg-slate-50 p-4 rounded-xl inline-block mx-auto">
                                            <p className="space-x-2">
                                                <span>1. 규칙적인 생활</span>
                                                <span>2. 건강한 멘탈</span>
                                            </p>
                                            <p className="space-x-2 mt-1">
                                                <span>3. 수험생 영양</span>
                                                <span>4. 합격하는 공부법</span>
                                            </p>
                                        </div>
                                        <p>
                                            에 초점을 두어
                                            <br />
                                            <span className="font-bold text-[var(--color-primary)]">
                                                실패 할 수 없는 공부 환경
                                            </span>
                                            을
                                            <br />
                                            다방면에서 지원합니다.
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </section>
    );
}
