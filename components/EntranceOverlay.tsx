"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Phase = "blinds" | "no" | "lines" | "fadeOut" | "done";

function seededRandom(seed: number) {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
}

export default function EntranceOverlay() {
    const [phase, setPhase] = useState<Phase>("blinds");
    const [startAnimation, setStartAnimation] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Config
    const SLAT_HEIGHT = 32;
    const ANIMATION_DURATION = 2.2;
    const viewportHeight =
        typeof window !== "undefined" ? window.innerHeight : 1200;
    const slats = useMemo(
        () =>
            Array.from(
                { length: Math.ceil(viewportHeight / SLAT_HEIGHT) + 2 },
                (_, i) => i
            ),
        [viewportHeight]
    );
    const particles = useMemo(
        () =>
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                size: 4 + seededRandom(i + 1) * 4,
                startX: seededRandom(i + 31) * 100,
                startY: seededRandom(i + 71) * 100,
                delay: 0.3 + seededRandom(i + 101) * 0.6,
                isTeal: i % 2 === 0,
            })),
        []
    );

    useEffect(() => {
        if (prefersReducedMotion) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 600);

        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    // Phase transitions
    useEffect(() => {
        if (phase === "no") {
            const timer = setTimeout(() => {
                setPhase("lines");
            }, 1500);
            return () => clearTimeout(timer);
        }
        if (phase === "lines") {
            const timers: ReturnType<typeof setTimeout>[] = [];
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

    // 85% → 100% → 0% 애니메이션 (더 부드럽게)
    const slatVariants = {
        initial: {
            scaleY: 0.88,
            originY: 0
        },
        animate: {
            scaleY: [0.88, 1.0, 0],
            transition: {
                duration: ANIMATION_DURATION,
                times: [0, 0.28, 1],
                ease: "easeInOut" as const
            }
        }
    };

    // 줄(Cord) 애니메이션
    const cordVariants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 0,
            transition: {
                duration: ANIMATION_DURATION * 0.5,
                delay: ANIMATION_DURATION * 0.6,
                ease: "easeOut" as const
            }
        }
    };

    const textCenterY = viewportHeight / 2;

    if (prefersReducedMotion || phase === "done") return null;

    return (
        <>
            {/* Persistent background - Always White as requested */}
            {(phase === "blinds" || phase === "no" || phase === "lines") && (
                <div
                    className="fixed inset-0 z-[9998] bg-white"
                />
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
                        {/* ... Cords ... */}
                        {[20, 80].map((pos) => (
                            <motion.div
                                key={`cord-${pos}`}
                                className="absolute top-0 bottom-0 z-20"
                                style={{
                                    left: `${pos}%`,
                                    width: "2px",
                                    transform: "translateX(-50%)",
                                    background: "linear-gradient(to right, #cfcfcf 0%, #e0e0e0 50%, #cfcfcf 100%)",
                                    boxShadow: "0 0 2px rgba(0,0,0,0.2)",
                                }}
                                variants={cordVariants}
                            />
                        ))}

                        {/* Slats - 매트한 무광 베이지 */}
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
                                            willChange: "transform",
                                            zIndex: 10
                                        }}
                                    >
                                        {/* ... Slat Content ... */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(to bottom, 
                                                    #f5f2e9 0%, 
                                                    #efe9d9 15%,
                                                    #e6dfcc 50%,
                                                    #ded6c0 85%,
                                                    #d6cea9 100%
                                                )`,
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: `
                                                    radial-gradient(circle at 15% 25%, rgba(255,255,255,0.4) 0%, transparent 0.5%),
                                                    radial-gradient(circle at 45% 15%, rgba(0,0,0,0.05) 0%, transparent 0.4%),
                                                    radial-gradient(circle at 75% 35%, rgba(255,255,255,0.3) 0%, transparent 0.6%),
                                                    radial-gradient(circle at 25% 55%, rgba(0,0,0,0.04) 0%, transparent 0.5%),
                                                    radial-gradient(circle at 85% 65%, rgba(255,255,255,0.3) 0%, transparent 0.4%),
                                                    radial-gradient(circle at 55% 75%, rgba(0,0,0,0.06) 0%, transparent 0.5%),
                                                    radial-gradient(circle at 35% 85%, rgba(255,255,255,0.4) 0%, transparent 0.6%),
                                                    radial-gradient(circle at 65% 45%, rgba(0,0,0,0.05) 0%, transparent 0.4%),
                                                    radial-gradient(circle at 95% 25%, rgba(255,255,255,0.3) 0%, transparent 0.5%),
                                                    radial-gradient(circle at 5% 75%, rgba(0,0,0,0.06) 0%, transparent 0.5%),
                                                    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, transparent 0.3%),
                                                    radial-gradient(circle at 20% 40%, rgba(0,0,0,0.05) 0%, transparent 0.4%)
                                                `,
                                                backgroundSize: "6px 6px",
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: `
                                                    radial-gradient(circle at 10% 10%, rgba(0,0,0,0.08) 0%, transparent 0.3%),
                                                    radial-gradient(circle at 30% 70%, rgba(255,255,255,0.2) 0%, transparent 0.35%),
                                                    radial-gradient(circle at 60% 20%, rgba(0,0,0,0.06) 0%, transparent 0.25%),
                                                    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 0.4%),
                                                    radial-gradient(circle at 40% 40%, rgba(0,0,0,0.05) 0%, transparent 0.3%)
                                                `,
                                                backgroundSize: "4px 4px",
                                            }}
                                        />
                                        <div
                                            className="absolute top-0 left-0 right-0"
                                            style={{
                                                height: "1px",
                                                background: "rgba(255,255,255,0.5)",
                                            }}
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 right-0"
                                            style={{
                                                height: "4px",
                                                background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)",
                                            }}
                                        />
                                        <div
                                            className="absolute left-0 right-0"
                                            style={{
                                                bottom: "-2px",
                                                height: "3px",
                                                background: "rgba(0,0,0,0.08)",
                                            }}
                                        />
                                        <div
                                            className="absolute left-0 right-0 flex justify-center"
                                            style={{
                                                top: `calc(${textCenterY - slatTop}px - 20vh)`,
                                                height: 240,
                                            }}
                                        >
                                            <div
                                                className="text-center px-6"
                                                style={{
                                                    fontFamily: "var(--font-gowun), cursive",
                                                    color: "#4A453A",
                                                    textShadow: "1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.05)",
                                                }}
                                            >
                                                <div className="relative inline-block">
                                                    <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                                                        난 왜 <br />
                                                        열심히 하지 <br />
                                                        않을까?
                                                    </div>
                                                    <Image
                                                        src="/crying-face.png"
                                                        alt="crying face"
                                                        width={144}
                                                        height={144}
                                                        className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-24 md:w-36 opacity-90"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="absolute inset-0 bg-stone-900" />
                        )}
                    </motion.div>
                )}
            </AnimatePresence >

            {/* "No!" Phase - Transparent Background (uses persistent) */}
            <AnimatePresence>
                {
                    phase === "no" && (
                        <motion.div
                            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
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

                                <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mt-4">
                                    당신의 잘못이 아니에요!
                                </div>
                                <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#267E82] mt-2">
                                    몰입은 공부환경이 만듭니다.
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >

            {/* Lines Phase - Transparent Background */}
            <AnimatePresence>
                {
                    phase === "lines" && (
                        <motion.div
                            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
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
                    )
                }
            </AnimatePresence >

            {/* FadeOut Phase - From White to Transparent */}
            <AnimatePresence>
                {
                    phase === "fadeOut" && (
                        <motion.div
                            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <div className="absolute inset-0 bg-white" />
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
                            {particles.map((particle) => {
                                return (
                                    <motion.div
                                        key={particle.id}
                                        className="absolute rounded-full"
                                        style={{
                                            width: particle.size,
                                            height: particle.size,
                                            left: `${particle.startX}%`,
                                            top: `${particle.startY}%`,
                                            background: particle.isTeal
                                                ? "rgba(38, 126, 130, 0.6)"
                                                : "rgba(255, 215, 0, 0.6)",
                                            boxShadow: particle.isTeal
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
                                            delay: particle.delay,
                                            ease: "easeOut"
                                        }}
                                    />
                                );
                            })}
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}
