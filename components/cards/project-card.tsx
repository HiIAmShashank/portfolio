'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';
import type { Project } from '@/lib/config/index';

interface ProjectCardProps {
    project: Project;
    index?: number;
    delay?: number;
}

export function ProjectCard({ project, index = 0, delay = 0 }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Link
                href={`/projects/${project.id}`}
                className="group glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all h-full flex flex-col gap-4 hover:shadow-lg hover:shadow-primary/5"
            >
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                    <span
                        className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${project.status === 'live'
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                            : project.status === 'beta'
                                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                : 'bg-muted text-muted-foreground border border-border'
                            }`}
                    >
                        {project.status === 'live' ? 'Live' : project.status === 'beta' ? 'Beta' : 'Coming Soon'}
                    </span>
                </div>
                <p className="text-muted-foreground text-sm italic">{project.tagline}</p>
                <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-muted text-primary px-3 py-1.5 rounded-full border border-primary/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">{project.features.length} features</span>
                    <span className="flex items-center gap-1 text-primary text-xs font-medium transition-all">
                        View project
                        <ArrowRightIcon className="w-3 h-3" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
