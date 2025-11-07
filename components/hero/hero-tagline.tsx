'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/config/index';

const COLOR_WORDS: Record<string, string> = {
    elegant: 'text-primary',
    performant: 'text-secondary',
    scalable: 'text-accent-foreground',
};

export function HeroTagline() {
    return (
        <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
        >
            {PERSONAL_INFO.title.split(' ').map((word, i) => {
                const cleanWord = word.toLowerCase().replace(/[,.]/, '');
                const colorClass = COLOR_WORDS[cleanWord];
                return colorClass ? (
                    <span key={i} className={`${colorClass} font-semibold`}>
                        {word}{' '}
                    </span>
                ) : (
                    <span key={i}>{word} </span>
                );
            })}
        </motion.p>
    );
}
