'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/config/index';

export function HeroHeading() {
    return (
        <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
        >
            Hi, I&apos;m {PERSONAL_INFO.name.split(' ')[0]}
        </motion.h1>
    );
}
