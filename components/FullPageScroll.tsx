"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollMode = "snap" | "native";

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

function getInitialScrollMode(): ScrollMode {
    if (typeof window === "undefined") return "snap";

    const params = new URLSearchParams(window.location.search);
    const queryMode = params.get("scroll");
    const savedMode = window.localStorage.getItem("sf-scroll-mode");

    if (queryMode === "native" || queryMode === "standard") return "native";
    if (queryMode === "snap") return "snap";
    if (savedMode === "native" || savedMode === "snap") return savedMode;

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "native"
        : "snap";
}

export default function FullPageScroll({ children }: Props) {
    const childArray = useMemo(() => React.Children.toArray(children), [children]);
    const totalPages = childArray.length;

    const prefersReducedMotion = useReducedMotion();
    const [scrollMode, setScrollMode] = useState<ScrollMode>(() =>
        getInitialScrollMode()
    );
    const [currentPage, setCurrentPage] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
    const touchStartY = useRef(0);
    const lastScrollTime = useRef(0);

    const isNativeScroll = scrollMode === "native";

    const setSectionRef = useCallback(
        (index: number) => (node: HTMLDivElement | null) => {
            sectionRefs.current[index] = node;
        },
        []
    );

    const navigateToPage = useCallback(
        (pageIndex: number) => {
            const nextPage = clampPage(pageIndex, totalPages);

            if (isNativeScroll) {
                const target = sectionRefs.current[nextPage];
                if (target) {
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? "auto" : "smooth",
                        block: "start",
                    });
                }
            }

            setCurrentPage(nextPage);
        },
        [isNativeScroll, prefersReducedMotion, totalPages]
    );

    const handleScroll = useCallback(
        (direction: "up" | "down") => {
            if (isNativeScroll) return;
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
        [currentPage, isNativeScroll, totalPages]
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem("sf-scroll-mode", scrollMode);
    }, [scrollMode]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const initialPage = hashToPage(window.location.hash, totalPages);
        if (initialPage > 0) {
            requestAnimationFrame(() => navigateToPage(initialPage));
        }
    }, [navigateToPage, totalPages]);

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
        if (isNativeScroll) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (document.body.style.overflow === "hidden") return;
            if (event.key === "ArrowDown") handleScroll("down");
            if (event.key === "ArrowUp") handleScroll("up");
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleScroll, isNativeScroll]);

    useEffect(() => {
        if (isNativeScroll) return;

        const onWheel = (event: WheelEvent) => {
            if (document.body.style.overflow === "hidden") return;
            if (Math.abs(event.deltaY) <= 20) return;
            handleScroll(event.deltaY > 0 ? "down" : "up");
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        return () => window.removeEventListener("wheel", onWheel);
    }, [handleScroll, isNativeScroll]);

    useEffect(() => {
        if (!isNativeScroll) return;

        const root = containerRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;
                const nextPage = Number(
                    (visible.target as HTMLElement).dataset.pageIndex ?? 0
                );
                setCurrentPage(clampPage(nextPage, totalPages));
            },
            {
                root,
                threshold: [0.5, 0.7, 0.9],
            }
        );

        sectionRefs.current.forEach((node, index) => {
            if (!node) return;
            node.dataset.pageIndex = String(index);
            observer.observe(node);
        });

        return () => observer.disconnect();
    }, [isNativeScroll, totalPages]);

    const onTouchStart = (event: React.TouchEvent) => {
        if (isNativeScroll) return;
        if (document.body.style.overflow === "hidden") return;
        touchStartY.current = event.touches[0].clientY;
    };

    const onTouchEnd = (event: React.TouchEvent) => {
        if (isNativeScroll) return;
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
            ref={containerRef}
            className={`relative w-full h-[100dvh] bg-[var(--color-surface)] ${
                isNativeScroll
                    ? "overflow-y-auto overscroll-y-contain snap-y snap-mandatory"
                    : "overflow-hidden overscroll-none touch-none"
            }`}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <button
                type="button"
                onClick={() =>
                    setScrollMode((prev) => (prev === "snap" ? "native" : "snap"))
                }
                className="absolute top-16 left-4 z-[120] rounded-full border border-slate-200/80 bg-white/85 px-3 py-1 text-[11px] font-semibold text-slate-600 backdrop-blur"
            >
                {isNativeScroll ? "페이지 스냅" : "일반 스크롤"}
            </button>

            {isNativeScroll
                ? childArray.map((child, index) => (
                      <div
                          key={index}
                          ref={setSectionRef(index)}
                          className="relative h-[100dvh] w-full snap-start"
                      >
                          {renderChild(child, index === currentPage)}
                      </div>
                  ))
                : childArray.map((child, index) => {
                      const isActive = index === currentPage;

                      return (
                          <motion.div
                              key={index}
                              className="absolute inset-0 w-full h-full"
                              style={{ zIndex: index * 10 }}
                              initial={{ y: index === 0 ? "0%" : "100%" }}
                              animate={{ y: index <= currentPage ? "0%" : "100%" }}
                              transition={{
                                  duration: prefersReducedMotion ? 0 : 0.6,
                                  ease: [0.22, 1, 0.36, 1],
                              }}
                          >
                              <div ref={setSectionRef(index)} className="w-full h-full">
                                  {renderChild(child, isActive)}
                              </div>
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

            {!isNativeScroll && !prefersReducedMotion && (
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
