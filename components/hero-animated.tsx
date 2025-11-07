'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PERSONAL_INFO, TECH_STACK, SOCIAL_LINKS, PROJECTS } from '@/lib/config';
import { TechBadge } from '@/components/ui/tech-badge';
import { SocialLink } from '@/components/ui/social-link';
import { ArrowRightIcon } from '@/components/icons';

interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
}

export default function HeroAnimated({ latestPosts }: { latestPosts: Post[] }) {
    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
                backgroundSize: '72px 72px',
                maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)'
            }} />

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
                        {/* Greeting badge */}
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

                        {/* Main heading */}
                        <div className="space-y-4">
                            <motion.h1
                                className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                Hi, I'm {PERSONAL_INFO.name.split(' ')[0]}
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                {PERSONAL_INFO.title.split(' ').map((word, i) => {
                                    const colorWords: Record<string, string> = {
                                        elegant: 'text-primary',
                                        performant: 'text-secondary',
                                        scalable: 'text-accent-foreground',
                                    };
                                    const colorClass = colorWords[word.toLowerCase().replace(/[,.]/, '')];
                                    return colorClass ? (
                                        <span key={i} className={`${colorClass} font-semibold`}>{word} </span>
                                    ) : (
                                        <span key={i}>{word} </span>
                                    );
                                })}
                            </motion.p>
                        </div>

                        {/* CTA buttons */}
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

                            {SOCIAL_LINKS.filter(link => ['GitHub', 'LinkedIn'].includes(link.name)).map((link) => (
                                <SocialLink key={link.name} {...link} />
                            ))}
                        </motion.div>

                        {/* Tech stack */}
                        <div className="pt-12 animate-in fade-in slide-in-from-bottom-5 duration-600" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Tech Stack</p>
                            <div className="flex flex-wrap gap-3">
                                {[...TECH_STACK].sort((a, b) => a.name.localeCompare(b.name)).map((tech, index) => (
                                    <TechBadge
                                        key={tech.name}
                                        name={tech.name}
                                        icon={tech.icon as any}
                                        color={tech.color}
                                        delay={0.7 + index * 0.05}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Latest posts */}
                        {latestPosts.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="pt-20"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
                                    <Link
                                        href="/projects"
                                        className="group flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
                                    >
                                        <span>View all</span>
                                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-20">
                                    {PROJECTS.slice(0, 2).map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            className="h-full"
                                        >
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="group glass p-6 rounded-2xl hover:border-primary/50 transition-all h-full flex flex-col gap-4 hover:shadow-xl hover:glow"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                        {project.name}
                                                    </h3>
                                                    <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${project.status === 'live'
                                                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                        : project.status === 'beta'
                                                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                            : 'bg-muted text-muted-foreground border border-border'
                                                        }`}>
                                                        {project.status === 'live' ? 'Live' : project.status === 'beta' ? 'Beta' : 'Coming Soon'}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground text-sm italic">{project.tagline}</p>
                                                <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">{project.description}</p>
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
                                                    <span className="text-xs text-muted-foreground">
                                                        {project.features.length} features
                                                    </span>
                                                    <span className="flex items-center gap-1 text-primary text-xs font-medium group-hover:gap-2 transition-all">
                                                        View project
                                                        <ArrowRightIcon className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Latest Posts</h2>
                                    <Link
                                        href="/blog"
                                        className="group flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
                                    >
                                        <span>View all</span>
                                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {latestPosts.map((post, index) => (
                                        <motion.div
                                            key={post.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 + index * 0.1 }}
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            className="h-full"
                                        >
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="group glass p-6 rounded-2xl hover:border-primary/50 transition-all h-full flex flex-col gap-4 hover:shadow-xl hover:glow"
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight flex-1">
                                                        {post.title}
                                                    </h3>

                                                </div>
                                                <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">{post.description}</p>
                                                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                                    <time className="text-xs text-muted-foreground">
                                                        {new Date(post.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </time>
                                                    <span className="flex items-center gap-1 text-primary text-xs font-medium group-hover:gap-2 transition-all">
                                                        Read more
                                                        <ArrowRightIcon className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </main>
    );
}