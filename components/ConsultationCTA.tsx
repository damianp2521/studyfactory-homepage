"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, User } from "lucide-react";

export default function ConsultationCTA() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-[#267E82] text-white px-8 py-4 rounded-full shadow-xl hover:bg-[#1A5F62] transition-colors font-bold text-lg tracking-wide hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                <span>상담예약</span>
            </motion.button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
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
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">상담 예약</h2>

                                <div className="space-y-4">
                                    <div className="text-lg md:text-xl font-medium text-slate-600">
                                        <p>자격증공장 중앙 컨트롤 본부</p>
                                        <p className="text-sm md:text-base text-slate-500 font-normal my-1">(J-control hub)</p>
                                        <div className="flex items-center justify-center gap-2 mt-2 text-[#267E82]">
                                            <Phone size={24} />
                                            <p className="text-2xl font-bold">051 - 757 - 5134</p>
                                        </div>
                                    </div>

                                    <p className="text-sm md:text-base text-slate-500 bg-slate-50 py-3 rounded-xl">
                                        현재 부산 거주 수험자만 등록 가능합니다.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
