'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';

interface SectionHeaderProps {
    title: string;
    viewAllHref: string;
    viewAllText?: string;
}

export function SectionHeader({ title, viewAllHref, viewAllText = 'View all' }: SectionHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-0 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
            <Link
                href={viewAllHref}
                className="group flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
            >
                <span>{viewAllText}</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
