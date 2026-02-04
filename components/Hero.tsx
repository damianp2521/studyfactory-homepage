"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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


                {/* Three-line tagline from intro */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-2"
                >
                    <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-600 relative inline-block">
                        <span className="relative inline-block mx-1">
                            <span className="font-bold text-slate-700">행복</span>
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] text-red-500 opacity-80 pointer-events-none" viewBox="0 0 100 60" preserveAspectRatio="none">
                                <path d="M10,30 C10,10 30,5 50,5 C70,5 95,15 90,35 C85,55 55,55 35,50 C15,45 5,25 10,15 C20,5 60,0 80,10 C95,20 95,40 70,50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        한 수험생활이
                        <span className="relative inline-block mx-1">
                            <span className="font-bold text-slate-700">합격</span>
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] text-red-500 opacity-80 pointer-events-none" viewBox="0 0 100 60" preserveAspectRatio="none">
                                <path d="M10,30 C10,10 30,5 50,5 C70,5 95,15 90,35 C85,55 55,55 35,50 C15,45 5,25 10,15 C20,5 60,0 80,10 C95,20 95,40 70,50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        이 되는
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#267E82] to-[#1A5F62] leading-relaxed">
                        자격증공장의 마법
                    </h1>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-600 mt-0">
                        지금 시작합니다.
                    </p>
                    <p className="text-[#267E82] font-bold tracking-wider text-base md:text-lg mt-8">
                        전문자격 학습관리센터 | 성인관리형독서실
                    </p>
                </motion.div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => setIsIntroModalOpen(true)}
                        className="w-full md:w-auto px-8 py-3 bg-white border-2 border-[#267E82] text-[#267E82] rounded-full text-lg md:text-xl font-bold shadow-md hover:bg-[#267E82] hover:text-white transition-all"
                    >
                        자격증공장 소개
                    </button>
                    <a
                        href="https://map.naver.com/p/directions/-/14372155.3537346,4187711.2060766,%EC%9E%90%EA%B2%A9%EC%A6%9D%EA%B3%B5%EC%9E%A5%20%EA%B4%80%EB%A6%AC%ED%98%95%EB%8F%85%EC%84%9C%EC%8B%A4,1199907214,PLACE_POI/-/transit?c=15.00,0,0,0,dh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto px-8 py-3 bg-white border-2 border-[#267E82] text-[#267E82] rounded-full text-lg md:text-xl font-bold shadow-md hover:bg-[#267E82] hover:text-white transition-all inline-block"
                    >
                        자격증공장 위치
                    </a>
                </div>
            </div>

            {/* Modal - Using Portal to break out of FullPageScroll stacking context */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isIntroModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
                            onClick={() => setIsIntroModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setIsIntroModalOpen(false)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <h3 className="text-2xl md:text-3xl font-bold text-[#267E82] mb-6 text-center">
                                    자격증공장이란?
                                </h3>

                                <div className="space-y-6 text-slate-700 leading-relaxed text-lg text-center font-medium">
                                    <p>
                                        몸은 힘들어도 마음은 편하게<br />
                                        <span className="text-[#267E82] font-bold">'단순생산공장에 출근하 듯<br />
                                            뚝딱 자격증을 만들자'</span> 는
                                    </p>
                                    <p>
                                        전문직자격 수험자만을 대상으로 관리하는,<br />
                                        <span className="font-bold underline underline-offset-4 decoration-[#267E82]">성인생활학습관리센터</span> 입니다.<br />
                                        <span className="text-sm text-slate-400 font-normal">(미성년자x, 재수생x)</span>
                                    </p>
                                    <p>
                                        많은 양의 난이도 높은 시험을 흔들리지 않고<br />
                                        꾸준히 준비해 단기에 합격 할 수 있도록
                                    </p>
                                    <div className="bg-slate-50 p-4 rounded-xl inline-block mx-auto">
                                        <p className="space-x-2">
                                            <span>¹.규칙적인 생활</span>
                                            <span>².건강한멘탈</span>
                                        </p>
                                        <p className="space-x-2 mt-1">
                                            <span>³.수험생영양</span>
                                            <span>⁴.합격하는 공부법</span>
                                        </p>
                                    </div>
                                    <p>
                                        에 초점을 두어<br />
                                        <span className="font-bold text-[#267E82]">실패 할 수 없는 공부 환경</span>을<br />
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
