import Link from 'next/link';
import { PROJECTS } from '@/lib/config';
import { AnimatedBackground } from '@/components/ui/animated-background';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">
                {/* Back button */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Home</span>
                </Link>
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl md:text-6xl font-bold">
                        Projects
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Explore my collection of web applications built to solve real-world problems with modern technologies.
                    </p>
                </div>

                {/* Apps grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {PROJECTS.map((app, index) => (
                        <Link
                            key={app.id}
                            href={`/projects/${app.id}`}
                            className="group glass p-8 rounded-2xl hover:border-primary/50 transition-all hover:shadow-xl hover:glow"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col gap-6 h-full">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {app.name}
                                            </h2>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${app.status === 'live'
                                                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                    : app.status === 'beta'
                                                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                        : 'bg-muted text-muted-foreground border border-border'
                                                }`}>
                                                {app.status === 'live' ? 'Live' : app.status === 'beta' ? 'Beta' : 'Coming Soon'}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm italic">
                                            {app.tagline}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground leading-relaxed">
                                    {app.description}
                                </p>

                                {/* Tags */}
                                <div className="flex gap-2 flex-wrap">
                                    {app.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs bg-muted text-primary px-3 py-1.5 rounded-full border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                    <span className="text-sm text-muted-foreground">
                                        {app.features.length} features
                                    </span>
                                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                                        <span className="text-sm font-medium">View details</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty state */}
                {PROJECTS.length === 0 && (
                    <div className="glass p-12 rounded-2xl flex flex-col gap-4 items-center">
                        <div className="text-6xl">🚀</div>
                        <h3 className="text-2xl font-bold text-foreground">No projects yet</h3>
                        <p className="text-muted-foreground">Check back soon for new applications!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
