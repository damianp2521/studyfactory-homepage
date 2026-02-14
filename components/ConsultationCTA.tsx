"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MapPin } from "lucide-react";
import useAccessibleModal from "@/lib/useAccessibleModal";

const PHONE_NUMBER = "051-757-5134";
const MAP_URL =
    "https://map.naver.com/p/directions/-/14372155.3537346,4187711.2060766,%EC%9E%90%EA%B2%A9%EC%A6%9D%EA%B3%B5%EC%9E%A5%20%EA%B4%80%EB%A6%AC%ED%98%95%EB%8F%85%EC%84%9C%EC%8B%A4,1199907214,PLACE_POI/-/transit?c=15.00,0,0,0,dh";

export default function ConsultationCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    useAccessibleModal(isOpen, modalRef, closeModal);

    return (
        <>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[120] flex flex-col gap-2 md:gap-3"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[var(--color-primary)] text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:bg-[var(--color-primary-strong)] transition-colors font-bold text-sm md:text-base tracking-wide hover:scale-105 active:scale-95"
                >
                    상담예약
                </button>

                <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[var(--color-primary)] border border-[var(--color-primary)] px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors font-bold text-sm md:text-base tracking-wide text-center"
                >
                    위치보기
                </a>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        <motion.div
                            ref={modalRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="상담 예약"
                            tabIndex={-1}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label="상담 모달 닫기"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center space-y-5">
                                <h2 className="text-2xl font-bold text-slate-900">상담 예약</h2>

                                <div className="text-lg md:text-xl font-medium text-slate-600">
                                    <p>자격증공장 중앙 컨트롤 본부</p>
                                    <p className="text-sm md:text-base text-slate-500 font-normal my-1">
                                        (J-control hub)
                                    </p>
                                    <div className="flex items-center justify-center gap-2 mt-2 text-[var(--color-primary)]">
                                        <Phone size={24} />
                                        <p className="text-2xl font-bold">051-757-5134</p>
                                    </div>
                                </div>

                                <p className="text-sm md:text-base text-slate-500 bg-slate-50 py-3 rounded-xl">
                                    현재 부산 거주 수험자만 등록 가능합니다.
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                    <a
                                        href={`tel:${PHONE_NUMBER}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-strong)] transition-colors"
                                    >
                                        <Phone size={16} />
                                        전화걸기
                                    </a>
                                    <a
                                        href={MAP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-primary)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                                    >
                                        <MapPin size={16} />
                                        길찾기
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
