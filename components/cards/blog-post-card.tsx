'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
}

interface BlogPostCardProps {
    post: BlogPost;
    index?: number;
    delay?: number;
}

export function BlogPostCard({ post, index = 0, delay = 0 }: BlogPostCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Link
                href={`/blog/${post.slug}`}
                className="group glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all h-full flex flex-col gap-4 hover:shadow-lg hover:shadow-primary/5"
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
                    <span className="flex items-center gap-1 text-primary text-xs font-medium transition-all">
                        Read more
                        <ArrowRightIcon className="w-3 h-3" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
