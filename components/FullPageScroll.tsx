"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

const PAGE_HASHES = ["hero", "benefits", "happiness", "reviews", "footer"];
const SCROLL_COOLDOWN = 800;

function clampPage(pageIndex: number, totalPages: number) {
    return Math.min(Math.max(pageIndex, 0), Math.max(totalPages - 1, 0));
}

function hashToPage(hash: string, totalPages: number) {
    const cleanHash = hash.replace("#", "");
    const mapped = PAGE_HASHES.findIndex((item) => item === cleanHash);
    if (mapped < 0) return 0;
    return clampPage(mapped, totalPages);
}

function updateHash(pageIndex: number) {
    const hash = PAGE_HASHES[pageIndex] ?? PAGE_HASHES[0];
    if (typeof window === "undefined") return;
    if (window.location.hash === `#${hash}`) return;
    window.history.replaceState(null, "", `#${hash}`);
}

function getInitialPage(totalPages: number) {
    if (typeof window === "undefined") return 0;
    return hashToPage(window.location.hash, totalPages);
}

export default function FullPageScroll({ children }: Props) {
    const prefersReducedMotion = useReducedMotion();
    const childArray = React.Children.toArray(children);
    const totalPages = childArray.length;

    const [currentPage, setCurrentPage] = useState(() =>
        getInitialPage(totalPages)
    );
    const touchStartY = useRef(0);
    const lastScrollTime = useRef(0);

    const navigateToPage = useCallback(
        (pageIndex: number) => {
            setCurrentPage(clampPage(pageIndex, totalPages));
        },
        [totalPages]
    );

    const handleScroll = useCallback(
        (direction: "up" | "down") => {
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
        },
        [currentPage, totalPages]
    );

    useEffect(() => {
        const onHashChange = () => {
            const targetPage = hashToPage(window.location.hash, totalPages);
            navigateToPage(targetPage);
        };

        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, [navigateToPage, totalPages]);

    useEffect(() => {
        const handleNavigate = (event: Event) => {
            const customEvent = event as CustomEvent<number>;
            navigateToPage(customEvent.detail);
        };

        window.addEventListener("navigateToPage", handleNavigate as EventListener);
        return () =>
            window.removeEventListener(
                "navigateToPage",
                handleNavigate as EventListener
            );
    }, [navigateToPage]);

    useEffect(() => {
        updateHash(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (document.body.style.overflow === "hidden") return;
            if (event.key === "ArrowDown") handleScroll("down");
            if (event.key === "ArrowUp") handleScroll("up");
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleScroll]);

    useEffect(() => {
        const onWheel = (event: WheelEvent) => {
            if (document.body.style.overflow === "hidden") return;
            if (Math.abs(event.deltaY) <= 20) return;
            handleScroll(event.deltaY > 0 ? "down" : "up");
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        return () => window.removeEventListener("wheel", onWheel);
    }, [handleScroll]);

    const onTouchStart = (event: React.TouchEvent) => {
        if (document.body.style.overflow === "hidden") return;
        touchStartY.current = event.touches[0].clientY;
    };

    const onTouchEnd = (event: React.TouchEvent) => {
        if (document.body.style.overflow === "hidden") return;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        if (Math.abs(deltaY) <= 100) return;
        handleScroll(deltaY > 0 ? "down" : "up");
    };

    const renderChild = (child: React.ReactNode, isActive: boolean) => {
        if (!React.isValidElement<{ isActive?: boolean }>(child)) {
            return child;
        }

        return React.cloneElement(child, { isActive });
    };

    return (
        <div
            className="relative w-full h-[calc(100svh-var(--nav-height))] overflow-hidden bg-[var(--color-surface)] touch-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {childArray.map((child, index) => {
                const isActive = index === currentPage;

                return (
                    <motion.div
                        key={index}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: index * 10 }}
                        initial={{ y: index === 0 ? "0%" : "100%" }}
                        animate={{ y: index <= currentPage ? "0%" : "100%" }}
                        transition={{
                            duration: prefersReducedMotion ? 0 : 0.58,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {renderChild(child, isActive)}
                    </motion.div>
                );
            })}

            {currentPage > 0 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-[100] flex flex-col gap-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            type="button"
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === currentPage
                                    ? "bg-[var(--color-primary)] scale-125"
                                    : "bg-slate-300 hover:bg-slate-400"
                            }`}
                            onClick={() => navigateToPage(i)}
                            aria-label={`Move to section ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            {!prefersReducedMotion && (
                <div className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-0 md:gap-1 pointer-events-none">
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
                            className="text-[var(--color-primary)]"
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
                            className="text-[var(--color-primary)]"
                            style={{ opacity: 0.5 }}
                            animate={{ y: [0, 3, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.2,
                            }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                    </div>
                </div>
            )}
        </div>
    );
}
