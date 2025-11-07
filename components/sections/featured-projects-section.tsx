'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/cards';
import { SectionHeader } from './section-header';
import { PROJECTS } from '@/lib/config/index';

export function FeaturedProjectsSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-20"
        >
            <SectionHeader title="Featured Projects" viewAllHref="/projects" />

            <div className="grid md:grid-cols-2 gap-6 mb-20">
                {PROJECTS.slice(0, 2).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} delay={0.9} />
                ))}
            </div>
        </motion.div>
    );
}
