import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { AnimatedBackground } from '@/components/ui/animated-background';

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 flex flex-col gap-16">
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
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Thoughts, tutorials, and insights on web development, design, and technology.
                    </p>
                </div>

                {/* Blog posts grid */}
                <div className="flex flex-col gap-6">
                    {posts.map((post, index) => (
                        <article
                            key={post.slug}
                            className="group glass p-8 rounded-2xl hover:border-primary/50 transition-all hover:shadow-xl hover:glow"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors flex-1 leading-tight">
                                            {post.title}
                                        </h2>
                                        <time className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs bg-muted text-primary px-3 py-1.5 rounded-full border border-primary/20 hover:border-primary/50 transition-colors"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                                            <span className="text-sm font-medium">Read more</span>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Empty state */}
                {posts.length === 0 && (
                    <div className="glass p-12 rounded-2xl flex flex-col gap-4 items-center">
                        <div className="text-6xl">📝</div>
                        <h3 className="text-2xl font-bold text-foreground">No posts yet</h3>
                        <p className="text-muted-foreground">Check back soon for new content!</p>
                    </div>
                )}
            </div>
        </div>
    );
}