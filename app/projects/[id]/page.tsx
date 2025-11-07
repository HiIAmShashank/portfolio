import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/config';
import type { Metadata } from 'next';
import { AnimatedBackground } from '@/components/ui/animated-background';

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.name} - ${project.tagline}`,
        description: project.description,
        keywords: project.tags,
        openGraph: {
            title: project.name,
            description: project.tagline,
            type: 'website',
            url: project.url,
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 flex flex-col gap-12">
                {/* Back button */}
                <Link
                    href="/projects"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors w-fit group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Projects</span>
                </Link>

                {/* Header */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <h1 className="text-5xl md:text-6xl font-bold">
                            {project.name}
                        </h1>
                        <span className={`text-sm px-4 py-1.5 rounded-full font-medium ${project.status === 'live'
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                            : project.status === 'beta'
                                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                : 'bg-muted text-muted-foreground border border-border'
                            }`}>
                            {project.status === 'live' ? 'Live' : project.status === 'beta' ? 'Beta' : 'Coming Soon'}
                        </span>
                    </div>
                    <p className="text-2xl text-muted-foreground italic">
                        {project.tagline}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-sm bg-muted text-primary px-4 py-2 rounded-full border border-primary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-fit px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                        <span>Launch App</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                {/* Description */}
                <div className="glass p-8 rounded-2xl space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">About</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Features */}
                <div className="glass p-8 rounded-2xl space-y-6">
                    <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {project.features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                            >
                                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-muted-foreground leading-relaxed">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer CTA */}
                <div className="glass p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Ready to try it out?</h3>
                        <p className="text-muted-foreground">Experience {project.name} live in action</p>
                    </div>
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                        <span>Visit {project.name}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
