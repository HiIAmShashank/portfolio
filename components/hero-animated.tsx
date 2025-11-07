'use client';

import { motion } from 'framer-motion';
import { FeaturedProjectsSection, LatestPostsSection } from '@/components/sections';
import {
    HeroBackground,
    HeroGreetingBadge,
    HeroHeading,
    HeroTagline,
    HeroCTA,
    HeroTechStack,
} from '@/components/hero';
import type { BlogPost } from '@/components/cards';

export default function HeroAnimated({ latestPosts }: { latestPosts: BlogPost[] }) {
    return (
        <main className="min-h-screen relative overflow-hidden">
            <HeroBackground />

            {/* Main content */}
            <div className="relative z-10 min-h-screen flex items-center px-6">
                <div className="max-w-7xl mx-auto w-full py-20">
                    {/* Hero content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <HeroGreetingBadge />

                        {/* Main heading */}
                        <div className="space-y-4">
                            <HeroHeading />
                            <HeroTagline />
                        </div>

                        <HeroCTA />
                        <HeroTechStack />

                        {/* Latest posts */}
                        {latestPosts.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="pt-20"
                            >
                                <FeaturedProjectsSection />
                                <LatestPostsSection posts={latestPosts} />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}