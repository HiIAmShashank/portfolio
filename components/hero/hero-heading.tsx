'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/config/index';

export function HeroHeading() {
    const text = `Hi, I'm ${PERSONAL_INFO.name.split(' ')[0]}`;
    const characters = text.split('');

    return (
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground overflow-hidden">
            {characters.map((char, index) => (
                <motion.span
                    key={index}
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
        </h1>
    );
}
