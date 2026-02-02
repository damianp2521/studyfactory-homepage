"use client";

import { motion } from "framer-motion";
import { Building2, CheckCircle, ArrowRight } from "lucide-react";

export default function Franchise() {
    return (
        <section id="franchise" className="h-full flex flex-col justify-center px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden items-center">
            <div className="max-w-4xl mx-auto text-center">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-5xl font-bold text-slate-900"
                >
                    가맹 문의
                </motion.h2>
            </div>
        </section>
    );
}
