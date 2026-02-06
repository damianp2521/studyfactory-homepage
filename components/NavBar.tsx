"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { menuItems } from "@/lib/data";

// Page index mapping for menu items
const pageIndexMap: { [key: string]: number } = {
    "#hero": 0,
    "#benefits": 1,
    "#happiness": 2,
    "#reviews": 3,
    "#footer": 4,
};

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    // Navigate to specific page using custom event
    const navigateToPage = (pageIndex: number) => {
        window.dispatchEvent(new CustomEvent("navigateToPage", { detail: pageIndex }));
        setIsOpen(false);
    };

    const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const pageIndex = pageIndexMap[href] ?? 0;
        navigateToPage(pageIndex);
    };

    const handleLogoClick = () => {
        navigateToPage(0);
    };

    return (
        <>
            {/* Premium Sticky Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-2 bg-white shadow-sm transition-all pointer-events-auto">
                {/* Logo - Clickable to go home */}
                <button
                    onClick={handleLogoClick}
                    className="relative h-8 w-40 max-w-[180px] cursor-pointer"
                >
                    <img
                        src="/logo_horizontal.png"
                        alt="자격증공장"
                        className="h-full w-full object-contain object-left"
                    />
                </button>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-slate-800 hover:text-[#267E82] transition-colors focus:outline-none"
                    aria-label="Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-30 bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center"
                    >
                        <ul className="space-y-8 text-center">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleMenuClick(e, item.href)}
                                        className="text-3xl font-light text-slate-800 hover:text-[#267E82] transition-colors"
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
