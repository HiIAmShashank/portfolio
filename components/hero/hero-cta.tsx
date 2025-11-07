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
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:glow"
            >
                <span className="relative z-10 flex items-center gap-2">
                    View My Projects
                    <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            {SOCIAL_LINKS.filter((link) => ['GitHub', 'LinkedIn'].includes(link.name)).map((link) => (
                <SocialLink key={link.name} {...link} />
            ))}
        </motion.div>
    );
}
