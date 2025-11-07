'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/config/index';

export function HeroGreetingBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
        >
            <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">
                    {PERSONAL_INFO.availableForWork ? 'Available for opportunities' : 'Currently unavailable'}
                </span>
            </div>
        </motion.div>
    );
}
