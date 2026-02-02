"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "blinds" | "no" | "lines" | "fadeOut" | "done";

export default function EntranceOverlay() {
    const [phase, setPhase] = useState<Phase>("blinds");
    const [startAnimation, setStartAnimation] = useState(false);
    const [slats, setSlats] = useState<number[]>([]);
    const [windowHeight, setWindowHeight] = useState(1200);
    const [currentLine, setCurrentLine] = useState(0);

    // Config
    const SLAT_HEIGHT = 30;
    const ANIMATION_DURATION = 2.0;

    useEffect(() => {
        const height = typeof window !== 'undefined' ? window.innerHeight : 1200;
        setWindowHeight(height);
        const count = Math.ceil(height / SLAT_HEIGHT) + 2;
        setSlats(Array.from({ length: count }, (_, i) => i));

        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Phase transitions
    useEffect(() => {
        if (phase === "no") {
            // Show "No!" for 1.5s, then transition to lines
            const timer = setTimeout(() => {
                setPhase("lines");
            }, 1500);
            return () => clearTimeout(timer);
        }
        if (phase === "lines") {
            // Show lines sequentially, then trigger fadeOut
            const timers: NodeJS.Timeout[] = [];
            timers.push(setTimeout(() => setCurrentLine(1), 300));
            timers.push(setTimeout(() => setCurrentLine(2), 1200));
            timers.push(setTimeout(() => setCurrentLine(3), 2100));
            timers.push(setTimeout(() => setPhase("fadeOut"), 3200));
            return () => timers.forEach(clearTimeout);
        }
        if (phase === "fadeOut") {
            const timer = setTimeout(() => {
                setPhase("done");
                document.body.style.overflow = "";
            }, 1800);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleBlindsComplete = () => {
        setPhase("no");
    };

    const EASE_CURVE = [0.8, 0, 0.2, 1] as any;

    const slatVariants = {
        initial: { scaleY: 1, originY: 0 },
        animate: {
            scaleY: 0,
            transition: { duration: ANIMATION_DURATION, ease: EASE_CURVE }
        }
    };

    const railVariants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 0,
            transition: { duration: ANIMATION_DURATION, ease: EASE_CURVE }
        }
    };

    const textCenterY = windowHeight / 2;

    if (phase === "done") return null;

    return (
        <>
            {/* Persistent white background - stays until fadeOut phase ends */}
            {(phase === "blinds" || phase === "no" || phase === "lines") && (
                <div className="fixed inset-0 z-[9998] bg-white" />
            )}

            {/* Blinds Phase */}
            <AnimatePresence>
                {phase === "blinds" && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex flex-col pointer-events-none"
                        initial="initial"
                        animate={startAnimation ? "animate" : "initial"}
                        onAnimationComplete={(definition) => {
                            if (definition === "animate") {
                                handleBlindsComplete();
                            }
                        }}
                    >
                        {/* Vertical Rails - Hidden on mobile */}
                        <motion.div
                            className="hidden md:block absolute top-0 bottom-0 w-[15px] z-20 left-[20%]"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                                borderLeft: "1px solid rgba(255, 255, 255, 0.8)",
                                borderRight: "1px solid rgba(0, 0, 0, 0.05)"
                            }}
                            variants={railVariants}
                        />
                        <motion.div
                            className="hidden md:block absolute top-0 bottom-0 w-[15px] z-20 left-[80%]"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                                borderLeft: "1px solid rgba(255, 255, 255, 0.8)",
                                borderRight: "1px solid rgba(0, 0, 0, 0.05)"
                            }}
                            variants={railVariants}
                        />

                        {/* Slats with Engraved Text */}
                        {slats.length > 0 ? (
                            slats.map((i) => {
                                const slatTop = i * SLAT_HEIGHT;
                                return (
                                    <motion.div
                                        key={i}
                                        variants={slatVariants}
                                        className="relative overflow-hidden"
                                        style={{
                                            height: SLAT_HEIGHT,
                                            width: "100%",
                                            background: "linear-gradient(to bottom, #d0d0d0 0%, #c0c0c0 100%)",
                                            borderBottom: "1px solid #a0a0a0",
                                            willChange: "transform",
                                            zIndex: 10
                                        }}
                                    >
                                        <div
                                            className="absolute left-0 right-0 flex justify-center"
                                            style={{
                                                top: textCenterY - slatTop - 150,
                                                height: 240,
                                            }}
                                        >
                                            <div
                                                className="text-center px-6"
                                                style={{
                                                    fontFamily: "var(--font-noto-sans), sans-serif",
                                                    color: "#3a3a3a",
                                                    textShadow: "1px 1px 0px rgba(255,255,255,0.6), -1px -1px 0px rgba(0,0,0,0.08)",
                                                }}
                                            >
                                                <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                                                    내가 <br />
                                                    열심히 하지 <br />
                                                    않은걸까?
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="absolute inset-0 bg-white" />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* "No!" Phase */}
            <AnimatePresence>
                {phase === "no" && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="text-center px-6"
                        >
                            <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#267E82]">
                                No!
                            </div>
                            <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-4">
                                당신의 잘못이 아니에요!
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lines Phase */}
            <AnimatePresence>
                {phase === "lines" && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-center px-6 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={currentLine >= 1 ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600"
                            >
                                행복한 수험생활이 합격이 되는
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={currentLine >= 2 ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#267E82] to-[#1A5F62]"
                            >
                                자격증공장의 마법
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={currentLine >= 3 ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600"
                            >
                                지금 시작합니다.
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FadeOut Phase - Text scales up and fades with blur */}
            <AnimatePresence>
                {phase === "fadeOut" && (
                    <motion.div
                        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* White background */}
                        <div className="absolute inset-0 bg-white" />

                        {/* Text that scales up and blurs */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 1, filter: "blur(0px)" }}
                            animate={{ scale: 1.1, filter: "blur(8px)" }}
                            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="text-center px-6 space-y-4">
                                <div className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600">
                                    행복한 수험생활이 합격이 되는
                                </div>
                                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#267E82] to-[#1A5F62]">
                                    자격증공장의 마법
                                </div>
                                <div className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600">
                                    지금 시작합니다.
                                </div>
                            </div>
                        </motion.div>

                        {/* Subtle shimmer particles */}
                        {[...Array(20)].map((_, i) => {
                            const size = 4 + Math.random() * 4;
                            const startX = Math.random() * 100;
                            const startY = Math.random() * 100;
                            const isTeal = i % 2 === 0;
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: size,
                                        height: size,
                                        left: `${startX}%`,
                                        top: `${startY}%`,
                                        background: isTeal
                                            ? "rgba(38, 126, 130, 0.6)"
                                            : "rgba(255, 215, 0, 0.6)",
                                        boxShadow: isTeal
                                            ? "0 0 10px 3px rgba(38, 126, 130, 0.4)"
                                            : "0 0 10px 3px rgba(255, 215, 0, 0.4)",
                                    }}
                                    initial={{ opacity: 0, scale: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1, 0.5],
                                        y: [0, -40],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        delay: 0.3 + Math.random() * 0.6,
                                        ease: "easeOut"
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
