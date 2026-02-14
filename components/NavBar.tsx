"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { menuItems } from "@/lib/data";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex h-[var(--nav-height)] items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-2 backdrop-blur shadow-sm">
                <button
                    onClick={handleLogoClick}
                    className="relative h-8 w-40 max-w-[180px] cursor-pointer"
                    aria-label="자격증공장 홈으로 이동"
                >
                    <Image
                        src="/logo_horizontal.png"
                        alt="자격증공장"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </button>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="p-2 text-slate-800 transition-colors hover:text-[var(--color-primary)] focus:outline-none"
                    aria-label="Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 280, damping: 28 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg"
                    >
                        <ul className="space-y-8 text-center">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-3xl font-semibold text-slate-800 transition-colors hover:text-[var(--color-primary)]"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
