import Link from 'next/link';
import { PROJECTS } from '@/lib/config';
import { AnimatedBackground } from '@/components/ui/animated-background';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 flex flex-col gap-16">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Things I&apos;ve made trying to put my dent in the universe.
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                        I&apos;ve worked on tons of little projects over the years but these are the ones that I&apos;m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.
                    </p>
                </div>

                {/* Projects list */}
                <div className="flex flex-col gap-6">
                    {PROJECTS.map((app) => (
                        <Link
                            key={app.id}
                            href={`/projects/${app.id}`}
                            className="block group"
                        >
                            <article className="flex flex-col gap-6 glass p-8 rounded-2xl border border-border/50 transition-all hover:shadow-lg hover:bg-muted/5 cursor-pointer">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                                            {app.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {app.description}
                                        </p>
                                    </div>
                                    
                                    <div className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1 w-fit">
                                        View project
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Empty state */}
                {PROJECTS.length === 0 && (
                    <div className="py-12 flex flex-col gap-4 items-start">
                        <h3 className="text-xl font-bold text-foreground">No projects yet</h3>
                        <p className="text-muted-foreground">Check back soon for new applications!</p>
                    </div>
                )}
            </div>
        </div>
    );
}