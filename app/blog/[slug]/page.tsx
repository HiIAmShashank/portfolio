import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { mdxComponents } from '@/components/mdx-components';
import { AnimatedBackground } from '@/components/ui/animated-background';
import 'highlight.js/styles/tokyo-night-dark.css';

// Generate static params for all blog posts
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return {
        title: post.title,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <article className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                {/* Back button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-12 group transition-colors"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span className="font-medium">Back to Blog</span>
                </Link>

                {/* Post header */}
                <header className="mb-12">
                    {/* Tags */}
                    <div className="flex gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-muted text-primary px-3 py-1.5 rounded-full border border-primary/20"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <time className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                </header>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-12" />

                {/* MDX Content */}
                <div className="prose prose-lg max-w-none">
                    <MDXRemote
                        source={post.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [
                                    rehypeHighlight,
                                    rehypeSlug,
                                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                                ],
                            },
                        }}
                    />
                </div>

                {/* Post footer */}
                <footer className="mt-16 pt-8 border-t border-border">
                    <div className="glass p-6 rounded-2xl">
                        <p className="text-muted-foreground mb-4">
                            Thanks for reading! If you enjoyed this post, feel free to share it.
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors group"
                        >
                            <span>Read more posts</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}