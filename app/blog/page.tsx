import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { AnimatedBackground } from '@/components/ui/animated-background';

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 flex flex-col gap-16">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Writing on software design, company building, and the aerospace industry.
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                        All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.
                    </p>
                </div>

                {/* Blog posts list */}
                <div className="flex flex-col gap-6">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block group"
                        >
                            <article className="md:grid md:grid-cols-4 md:items-baseline glass p-8 rounded-2xl border border-border/50 transition-all hover:shadow-lg hover:bg-muted/5 cursor-pointer">
                                {/* Date */}
                                <time className="md:col-span-1 text-sm text-muted-foreground/60 mb-4 md:mb-0 block">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>

                                {/* Content */}
                                <div className="md:col-span-3 flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {post.description}
                                        </p>
                                    </div>
                                    
                                    <div className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1 w-fit">
                                        Read article
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
                {posts.length === 0 && (
                    <div className="py-12 flex flex-col gap-4 items-start">
                        <h3 className="text-xl font-bold text-foreground">No posts yet</h3>
                        <p className="text-muted-foreground">Check back soon for new content!</p>
                    </div>
                )}
            </div>
        </div>
    );
}