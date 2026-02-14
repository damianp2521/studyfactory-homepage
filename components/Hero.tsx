"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative h-full w-full overflow-hidden bg-[var(--color-surface)] font-sans"
        >
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
                    style={{ backgroundImage: "url(/hero_bg.jpg)" }}
                />
                <div className="absolute inset-0 bg-white/88" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl items-center justify-center px-6 pb-20 pt-10 md:px-8 md:pb-16 md:pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-4 text-center md:space-y-5"
                >
                    <p className="text-[var(--color-primary)] font-semibold tracking-wide text-sm md:text-base">
                        전문자격 학습관리센터 | 성인관리형독서실
                    </p>

                    <p className="text-lg font-medium text-slate-600 md:text-2xl lg:text-3xl">
                        행복한 수험생활이 합격이 되는
                    </p>
                    <h1 className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-strong)] bg-clip-text py-2 text-4xl font-extrabold leading-tight text-transparent md:text-5xl lg:text-6xl">
                        자격증공장의 마법
                    </h1>
                    <p className="text-lg font-medium text-slate-600 md:text-2xl lg:text-3xl">
                        지금 시작합니다.
                    </p>

                    <div className="mx-auto mt-7 max-w-3xl space-y-3 px-1 text-center text-sm leading-relaxed text-slate-600 md:text-base">
                        <p>
                            자격증공장은
                            <span className="mx-1 font-bold text-[var(--color-primary)]">
                                중앙 컨트롤 센터
                            </span>
                            를 통해 전국 모든 지점의 면학 분위기를 실시간으로 모니터링하고
                            즉각적으로 통제합니다.
                        </p>
                        <p>
                            소음, 온도, 습도, 그리고 학습법까지 전국 어디의 수험생이든
                            자격증공장에서 가장 완벽한 몰입을 경험하게 됩니다.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
