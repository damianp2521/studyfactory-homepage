"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";

type ModalType = "consultation" | "franchise" | null;

export default function ConsultationCTA() {
    const [modalType, setModalType] = useState<ModalType>(null);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (modalType) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [modalType]);

    return (
        <>
            {/* Floating Buttons Container */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-40 flex flex-col gap-2 md:gap-3"
            >
                {/* Consultation Button (Teal) - On Top */}
                <button
                    onClick={() => setModalType("consultation")}
                    className="bg-[#267E82] text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:bg-[#1A5F62] transition-colors font-bold text-sm md:text-base tracking-wide hover:scale-105 active:scale-95"
                >
                    상담예약
                </button>

                {/* Franchise Button (Light Gray) - Below */}
                <button
                    onClick={() => setModalType("franchise")}
                    className="bg-slate-200 text-slate-600 px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:bg-slate-300 transition-colors font-bold text-sm md:text-base tracking-wide hover:scale-105 active:scale-95"
                >
                    가맹문의
                </button>
            </motion.div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {modalType && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalType(null)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setModalType(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    {modalType === "consultation" ? "상담 예약" : "가맹 문의"}
                                </h2>

                                <div className="space-y-4">
                                    <div className="text-lg md:text-xl font-medium text-slate-600">
                                        <p>자격증공장 중앙 컨트롤 본부</p>
                                        <p className="text-sm md:text-base text-slate-500 font-normal my-1">(J-control hub)</p>
                                        <div className="flex items-center justify-center gap-2 mt-2 text-[#267E82]">
                                            <Phone size={24} />
                                            <p className="text-2xl font-bold">051 - 757 - 5134</p>
                                        </div>
                                    </div>

                                    {modalType === "consultation" && (
                                        <p className="text-sm md:text-base text-slate-500 bg-slate-50 py-3 rounded-xl">
                                            현재 부산 거주 수험자만 등록 가능합니다.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
