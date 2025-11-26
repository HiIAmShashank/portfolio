'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/config/index';
import { SocialLink } from '@/components/ui/social-link';
import { ArrowRightIcon } from '@/components/icons';

export function HeroCTA() {
    return (
        <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
        >
            <Link
                href="/projects"
                className="group relative px-6 py-3 bg-background border border-border/50 rounded-lg font-medium text-foreground hover:text-primary hover:border-primary/50 hover:shadow-sm transition-all duration-300 flex items-center gap-2"
            >
                <span>View My Projects</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {SOCIAL_LINKS.filter((link) => ['GitHub', 'LinkedIn'].includes(link.name)).map((link) => (
                <SocialLink key={link.name} {...link} />
            ))}
        </motion.div>
    );
}
