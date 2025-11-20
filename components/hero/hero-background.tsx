'use client';

import { motion } from 'framer-motion';

export function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10">
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 opacity-20 dark:opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/40 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -60, 0],
                        x: [0, -50, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2
                    }}
                    className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/40 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 45, 0],
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 4
                    }}
                    className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-accent/40 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                />
            </div>

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]"
                style={{
                    backgroundImage:
                        'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                    backgroundSize: '64px 64px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                }}
            />
        </div>
    );
}
