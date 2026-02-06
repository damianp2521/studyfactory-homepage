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
        // Respect scroll lock (e.g., when modals are open)
        if (document.body.style.overflow === "hidden") return;

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
            if (document.body.style.overflow === "hidden") return;
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
            if (document.body.style.overflow === "hidden") return;
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
        if (document.body.style.overflow === "hidden") return;
        touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (document.body.style.overflow === "hidden") return;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        // Threshold: 100px (Increased to prevent accidental scrolls)
        if (Math.abs(deltaY) > 100) {
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

                const isActive = index === currentPage;

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
                        {/* Pass isActive prop to child if it's a valid React element */}
                        {React.isValidElement(child)
                            ? React.cloneElement(child as React.ReactElement<any>, { isActive })
                            : child}
                    </motion.div>
                );
            })}

            {/* Page Indicators (Dots) - Center Left (Hidden on Home) */}
            {currentPage > 0 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-[100] flex flex-col gap-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentPage ? "bg-[#267E82] scale-125" : "bg-slate-300 hover:bg-slate-400"}`}
                            initial={false}
                            animate={{
                                scale: i === currentPage ? 1.5 : 1,
                                opacity: i === currentPage ? 1 : 0.4
                            }}
                            onClick={() => setCurrentPage(i)}
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                </div>
            )}

            {/* Global Scroll Indicator (Chevrons only) */}
            <div className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-0 md:gap-1 pointer-events-none">
                {/* Text Removed as per request */}
                {/* Animated Chevrons */}
                <div className="flex flex-col items-center -space-y-3">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#267E82]"
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#267E82]/50"
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                </div>
            </div>
        </div>
    );
}
