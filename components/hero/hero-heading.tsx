'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/config/index';

export function HeroHeading() {
    const firstName = PERSONAL_INFO.name.split(' ')[0];
    const greeting = "Hi, I'm ";
    const greetingChars = greeting.split('');
    const nameChars = firstName.split('');

    return (
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground overflow-hidden">
            {greetingChars.map((char, index) => (
                <motion.span
                    key={`greeting-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.05 + 0.3,
                        type: "spring",
                        stiffness: 100
                    }}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
            <span className="inline-block whitespace-nowrap">
                {nameChars.map((char, index) => (
                    <motion.span
                        key={`name-${index}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: (greetingChars.length + index) * 0.05 + 0.3,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
            </span>
        </h1>
    );
}
