"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode[];
}

export default function FullPageScroll({ children }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const touchStartY = useRef(0);
    const lastScrollTime = useRef(0);
    const totalPages = React.Children.count(children);

    // Shorter timeout for snappier feel, but enough to prevent double-skips
    const SCROLL_COOLDOWN = 800;

    const handleScroll = useCallback((direction: "up" | "down") => {
        const now = Date.now();
        if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

        if (direction === "down" && currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
            lastScrollTime.current = now;
        } else if (direction === "up" && currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
            lastScrollTime.current = now;
        }
    }, [currentPage, totalPages]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") handleScroll("down");
            if (e.key === "ArrowUp") handleScroll("up");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleScroll]);

    // Custom event for navigation from NavBar
    useEffect(() => {
        const handleNavigate = (e: CustomEvent<number>) => {
            setCurrentPage(e.detail);
        };
        window.addEventListener("navigateToPage", handleNavigate as EventListener);
        return () => window.removeEventListener("navigateToPage", handleNavigate as EventListener);
    }, []);

    // Wheel Event (Desktop)
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            // Small threshold to ignore tiny trackpad jitters
            if (Math.abs(e.deltaY) > 20) {
                handleScroll(e.deltaY > 0 ? "down" : "up");
            }
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        return () => window.removeEventListener("wheel", onWheel);
    }, [handleScroll]);

    // Touch Events (Mobile)
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        // Threshold: 30px (Slight drag as requested)
        if (Math.abs(deltaY) > 30) {
            handleScroll(deltaY > 0 ? "down" : "up");
        }
    };

    return (
        <div
            className="relative w-full h-[100dvh] overflow-hidden bg-white overscroll-none touch-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {React.Children.map(children, (child, index) => {
                // Determine animation state
                // If index <= currentPage, it should be visible (y: 0).
                // If index > currentPage, it waits below (y: 100%).

                // For the "stacking" effect (next card covers previous):
                // We render all pages. 
                // Z-index ensures correct layering.

                return (
                    <motion.div
                        key={index}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: index * 10 }}
                        initial={{ y: index === 0 ? "0%" : "100%" }}
                        animate={{ y: index <= currentPage ? "0%" : "100%" }}
                        transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1] // Custom "premium" ease (Ease Out Quint-ish)
                        }}
                    >
                        {child}
                    </motion.div>
                );
            })}

            {/* Global Scroll Indicator & Page Number */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
                <span className="text-[#267E82] text-sm tracking-widest font-semibold font-mono min-h-[40px] text-center whitespace-pre-line">
                    {currentPage === 0 ? "스크롤하여\n살펴보기" : `${currentPage + 1} / ${totalPages}`}
                </span>
                {/* Animated Chevrons */}
                <div className="flex flex-col items-center -space-y-2">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#267E82]"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#267E82]/50"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                </div>
            </div>
        </div>
    );
}
