'use client';

import { BlogPostCard, type BlogPost } from '@/components/cards';
import { SectionHeader } from './section-header';

interface LatestPostsSectionProps {
    posts: BlogPost[];
}

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
    if (posts.length === 0) return null;

    return (
        <div>
            <SectionHeader title="Latest Posts" viewAllHref="/blog" />

            <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                    <BlogPostCard key={post.slug} post={post} index={index} delay={0.9} />
                ))}
            </div>
        </div>
    );
}
