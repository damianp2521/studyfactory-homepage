"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EntranceOverlay() {
    const [isVisible, setIsVisible] = useState(true);
    const [startAnimation, setStartAnimation] = useState(false);
    const [slats, setSlats] = useState<number[]>([]);

    // Config: Slat height (Denser 30px)
    const SLAT_HEIGHT = 30;
    const ANIMATION_DURATION = 2.0; // Slower animation (was 1.2s)

    useEffect(() => {
        // 1. Calculate slats safely
        const height = typeof window !== 'undefined' ? window.innerHeight : 1200;
        const count = Math.ceil(height / SLAT_HEIGHT) + 2;
        setSlats(Array.from({ length: count }, (_, i) => i));

        // 2. Lock Scroll
        if (isVisible) {
            document.body.style.overflow = "hidden";
        }

        // 3. Start Timer (0.8s delay - slower start)
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isVisible) {
            document.body.style.overflow = "";
        }
    }, [isVisible]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0, // Simultaneous
            }
        }
    };

    /* 
       V9 Specs:
       - 1.2s Duration
       - In-Place Fade for Rails (No movement)
       - Easing: cubic-bezier(0.8, 0, 0.2, 1)
    */
    const EASE_CURVE = [0.8, 0, 0.2, 1] as any;

    const slatVariants = {
        initial: {
            scaleY: 1,
            originY: 0
        },
        animate: {
            scaleY: 0,
            transition: {
                duration: ANIMATION_DURATION,
                ease: EASE_CURVE
            }
        }
    };

    // Rail variants: Opacity ONLY (No scale/transform)
    const railVariants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 0,
            transition: {
                duration: ANIMATION_DURATION,
                ease: EASE_CURVE
            }
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col pointer-events-none"
            initial="initial"
            animate={startAnimation ? "animate" : "initial"}
            variants={containerVariants}
            onAnimationComplete={(definition) => {
                if (definition === "animate") {
                    // Immediate unlock after animation finishes
                    setIsVisible(false);
                }
            }}
        >
            {/* Vertical Rails (Flat & Fixed) */}
            <motion.div
                className="absolute top-0 bottom-0 w-[15px] z-20 left-[20%]"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.8)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.05)"
                }}
                variants={railVariants}
            />
            <motion.div
                className="absolute top-0 bottom-0 w-[15px] z-20 left-[80%]"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.8)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.05)"
                }}
                variants={railVariants}
            />

            {/* Slats */}
            {slats.length > 0 ? (
                slats.map((i) => (
                    <motion.div
                        key={i}
                        variants={slatVariants}
                        style={{
                            height: SLAT_HEIGHT,
                            width: "100%",
                            /* Darker Matte Gray: #d0d0d0 -> #c0c0c0 */
                            background: "linear-gradient(to bottom, #d0d0d0 0%, #c0c0c0 100%)",
                            borderBottom: "1px solid #a0a0a0", /* Darker shadow line */
                            willChange: "transform",
                            zIndex: 10
                        }}
                    />
                ))
            ) : (
                <div className="absolute inset-0 bg-white" />
            )}
        </motion.div>
    );
}
